import { getStore } from '@netlify/blobs'

const STORE_NAME = 'wander-reviews'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/** GET ?destination=City,%20Country  → { reviews: [] } */
/** POST body: { destination, rating, text } → append review, return it */
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
      if (!destination || typeof destination !== 'string') {
        return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ reviews: [] }) }
      }
      const key = destination.trim()
      const list = await store.get(key, { type: 'json' })
      const reviews = Array.isArray(list) ? list : []
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ reviews }) }
    }

    if (event.httpMethod === 'POST') {
      const body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : event.body || {}
      const destination = body.destination && String(body.destination).trim()
      const rating = Math.min(5, Math.max(1, Number(body.rating) || 5))
      const text = body.text != null ? String(body.text).trim() : ''
      if (!destination) {
        return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'destination required' }) }
      }
      const key = destination
      const existing = await store.get(key, { type: 'json' })
      const reviews = Array.isArray(existing) ? existing : []
      const id = crypto.randomUUID ? crypto.randomUUID() : `id-${Date.now()}-${Math.random().toString(36).slice(2)}`
      const date = new Date().toISOString().slice(0, 10)
      const review = { id, rating, text, date }
      reviews.push(review)
      await store.setJSON(key, reviews)
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(review) }
    }
  } catch (err) {
    console.error('reviews function error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error' }) }
  }

  return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Bad request' }) }
}
