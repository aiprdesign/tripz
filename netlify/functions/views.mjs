import { getStore } from '@netlify/blobs'

const STORE_NAME = 'atripza-site'
const KEY = 'views'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/** GET: increment site view count and return { count } (for footer display) */
export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  try {
    const store = getStore({ name: STORE_NAME })
    const raw = await store.get(KEY, { type: 'text' })
    const count = Math.max(0, parseInt(raw || '0', 10) || 0) + 1
    await store.set(KEY, String(count))
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ count }) }
  } catch (err) {
    console.error('views function error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error', count: 0 }) }
  }
}
