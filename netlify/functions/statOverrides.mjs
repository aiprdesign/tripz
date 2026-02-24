import { getStore } from '@netlify/blobs'

const STORE_NAME = 'atripza-site'
const OVERRIDES_KEY = 'stat-overrides'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json',
}

/** GET ?country=France → { safetyWomen: 'High', ... } overrides for that country only */
export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }
  try {
    const country = (event.queryStringParameters && event.queryStringParameters.country) || ''
    if (!country) {
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({}) }
    }
    const store = getStore({ name: STORE_NAME })
    const raw = await store.get(OVERRIDES_KEY, { type: 'json' })
    const overrides = raw && typeof raw === 'object' ? raw : {}
    const countryOverrides = overrides[country] && typeof overrides[country] === 'object' ? overrides[country] : {}
    return { statusCode: 200, headers: corsHeaders, body: JSON.stringify(countryOverrides) }
  } catch (err) {
    console.error('statOverrides error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({}) }
  }
}
