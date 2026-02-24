import { getStore } from '@netlify/blobs'

const STORE_NAME = 'atripza-site'
const KEY = 'click-stats'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/** GET: return { totalClicks, byCountry } for graphs */
/** POST body: { country?: string } — record one click; if country set, count toward that country */
export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'GET' && event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  try {
    const store = getStore({ name: STORE_NAME })
    const raw = await store.get(KEY, { type: 'json' })
    const data = raw && typeof raw === 'object' ? raw : {}
    let totalClicks = Math.max(0, Number(data.totalClicks) || 0)
    const byCountry = data.byCountry && typeof data.byCountry === 'object' ? { ...data.byCountry } : {}

    if (event.httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ totalClicks, byCountry }),
      }
    }

    if (event.httpMethod === 'POST') {
      const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {}
      const country = body.country != null ? String(body.country).trim() : null
      const batch = Math.max(0, Math.min(1000, Number(body.totalClicks) || 0))
      const add = batch > 0 ? batch : 1
      totalClicks += add
      if (country) {
        byCountry[country] = (byCountry[country] || 0) + 1
      }
      await store.setJSON(KEY, { totalClicks, byCountry })
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) }
    }
  } catch (err) {
    console.error('clicks function error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error' }) }
  }

  return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Bad request' }) }
}
