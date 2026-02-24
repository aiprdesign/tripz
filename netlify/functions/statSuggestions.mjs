import { getStore } from '@netlify/blobs'

const STORE_NAME = 'atripza-site'
const SUGGESTIONS_KEY = 'stat-suggestions'
const OVERRIDES_KEY = 'stat-overrides'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
  'Content-Type': 'application/json',
}

const ALLOWED_FIELDS = new Set([
  'safetyWomen', 'safetyForeigners', 'friendlinessForeigners', 'laws', 'mentalHealthPct', 'mentalHealthNote',
  'lawsEstimate', 'cancerRisk', 'accidentRisk', 'mentalHealthRisk',
])

function isAdmin(event) {
  const secret = process.env.ADMIN_SECRET || ''
  const fromQuery = (event.queryStringParameters && event.queryStringParameters.key) || ''
  const fromHeader = (event.headers && (event.headers['x-admin-key'] || event.headers['X-Admin-Key'])) || ''
  const fromBody = (() => {
    try {
      const b = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {}
      return b.adminKey || b.key || ''
    } catch {
      return ''
    }
  })()
  const key = fromQuery || fromHeader || fromBody
  return !!secret && key === secret
}

export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const store = getStore({ name: STORE_NAME })

  try {
    if (event.httpMethod === 'GET') {
      if (!isAdmin(event)) {
        return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) }
      }
      const raw = await store.get(SUGGESTIONS_KEY, { type: 'json' })
      const suggestions = Array.isArray(raw) ? raw : []
      const status = (event.queryStringParameters && event.queryStringParameters.status) || 'pending'
      const filtered = status === 'all' ? suggestions : suggestions.filter((s) => s.status === status)
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ suggestions: filtered, all: suggestions }),
      }
    }

    if (event.httpMethod === 'POST') {
      const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {}

      if (body.action === 'approve' || body.action === 'reject') {
        if (!isAdmin(event)) {
          return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) }
        }
        const id = body.suggestionId || body.id
        if (!id) {
          return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'suggestionId required' }) }
        }
        const raw = await store.get(SUGGESTIONS_KEY, { type: 'json' })
        const suggestions = Array.isArray(raw) ? raw : []
        const idx = suggestions.findIndex((s) => s.id === id)
        if (idx === -1) {
          return { statusCode: 404, headers: corsHeaders, body: JSON.stringify({ error: 'Suggestion not found' }) }
        }
        const suggestion = suggestions[idx]
        suggestion.status = body.action === 'approve' ? 'approved' : 'rejected'
        suggestion.reviewedAt = new Date().toISOString()

        if (body.action === 'approve') {
          const overridesRaw = await store.get(OVERRIDES_KEY, { type: 'json' })
          const overrides = overridesRaw && typeof overridesRaw === 'object' ? { ...overridesRaw } : {}
          const country = suggestion.country
          if (!overrides[country]) overrides[country] = {}
          let val = suggestion.suggestedValue
          if (suggestion.field === 'lawsEstimate') val = Math.max(0, parseInt(val, 10) || 0)
          overrides[country][suggestion.field] = val
          await store.setJSON(OVERRIDES_KEY, overrides)
        }

        await store.setJSON(SUGGESTIONS_KEY, suggestions)
        return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true, status: suggestion.status }) }
      }

      const country = body.country != null ? String(body.country).trim() : ''
      const field = body.field != null ? String(body.field).trim() : ''
      const suggestedValue = body.suggestedValue != null ? String(body.suggestedValue).trim() : ''
      const comment = body.comment != null ? String(body.comment).trim() : ''

      if (!country || !field || !suggestedValue) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'country, field, and suggestedValue required' }) }
      }
      if (!ALLOWED_FIELDS.has(field)) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Invalid field' }) }
      }

      const raw = await store.get(SUGGESTIONS_KEY, { type: 'json' })
      const suggestions = Array.isArray(raw) ? raw : []
      const newSuggestion = {
        id: crypto.randomUUID ? crypto.randomUUID() : `s-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        country,
        field,
        suggestedValue,
        comment,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      suggestions.push(newSuggestion)
      await store.setJSON(SUGGESTIONS_KEY, suggestions)
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true, id: newSuggestion.id }) }
    }
  } catch (err) {
    console.error('statSuggestions error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error' }) }
  }

  return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Bad request' }) }
}
