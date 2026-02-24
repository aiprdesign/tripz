import { getStore } from '@netlify/blobs'

const STORE_NAME = 'wander-votes'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/**
 * GET ?destination=City,%20Country&fingerprint=xxx  → { likes, dislikes, userVote }
 * POST body: { destination, vote: 'like'|'dislike', fingerprint } → one vote per fingerprint per destination
 */
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
      const destination = (event.queryStringParameters && event.queryStringParameters.destination) || ''
      const fingerprint = (event.queryStringParameters && event.queryStringParameters.fingerprint) || ''
      if (!destination || typeof destination !== 'string') {
        return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ likes: 0, dislikes: 0, userVote: null }) }
      }
      const key = destination.trim()
      const list = await store.get(key, { type: 'json' })
      const entries = Array.isArray(list) ? list : []
      let likes = 0
      let dislikes = 0
      let userVote = null
      for (const e of entries) {
        if (e.vote === 'like') likes++
        else if (e.vote === 'dislike') dislikes++
        if (e.fingerprint === fingerprint) userVote = e.vote
      }
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ likes, dislikes, userVote }) }
    }

    if (event.httpMethod === 'POST') {
      const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {}
      const destination = body.destination && String(body.destination).trim()
      const vote = body.vote === 'like' || body.vote === 'dislike' ? body.vote : null
      const fingerprint = body.fingerprint && String(body.fingerprint).trim()
      if (!destination) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'destination required' }) }
      }
      const key = destination
      const existing = await store.get(key, { type: 'json' })
      let entries = Array.isArray(existing) ? existing : []

      if (fingerprint) {
        entries = entries.filter((e) => e.fingerprint !== fingerprint)
        if (vote) entries.push({ fingerprint, vote })
      } else if (vote) {
        entries.push({ fingerprint: `anon-${Date.now()}-${Math.random().toString(36).slice(2)}`, vote })
      }

      await store.setJSON(key, entries)
      let likes = 0
      let dislikes = 0
      for (const e of entries) {
        if (e.vote === 'like') likes++
        else if (e.vote === 'dislike') dislikes++
      }
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ likes, dislikes, userVote: vote }) }
    }
  } catch (err) {
    console.error('votes function error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error' }) }
  }

  return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Bad request' }) }
}
