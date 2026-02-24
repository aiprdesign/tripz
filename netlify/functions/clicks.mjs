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

    if (event.httpMethod === 'GET') {
      const raw = await store.get(KEY, { type: 'json' })
      const data = raw && typeof raw === 'object' ? raw : {}
      const totalClicks = Math.max(0, Number(data.totalClicks) || 0)
      const byCountry = data.byCountry && typeof data.byCountry === 'object' ? data.byCountry : {}
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

      const doWrite = async (existingData, etag) => {
        let totalClicks = Math.max(0, Number(existingData?.totalClicks) || 0)
        const byCountry = existingData?.byCountry && typeof existingData.byCountry === 'object' ? { ...existingData.byCountry } : {}
        totalClicks += add
        if (country) {
          byCountry[country] = (byCountry[country] || 0) + 1
        }
        const options = etag != null ? { onlyIfMatch: etag } : {}
        return store.setJSON(KEY, { totalClicks, byCountry }, options)
      }

      let result = await store.getWithMetadata(KEY, { type: 'json' })
      let data = result?.data && typeof result.data === 'object' ? result.data : {}
      let etag = result?.etag ?? undefined
      let writeResult = await doWrite(data, etag)
      if (writeResult.modified === false && etag != null) {
        result = await store.getWithMetadata(KEY, { type: 'json' })
        data = result?.data && typeof result.data === 'object' ? result.data : {}
        etag = result?.etag ?? undefined
        writeResult = await doWrite(data, etag)
      }
      return { statusCode: 200, headers: corsHeaders, body: JSON.stringify({ ok: true }) }
    }
  } catch (err) {
    console.error('clicks function error', err)
    return { statusCode: 500, headers: corsHeaders, body: JSON.stringify({ error: 'Server error' }) }
  }

  return { statusCode: 400, headers: corsHeaders, body: JSON.stringify({ error: 'Bad request' }) }
}
