import { getStore } from '@netlify/blobs'

const REVIEWS_STORE = 'wander-reviews'
const VOTES_STORE = 'wander-votes'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Key',
  'Content-Type': 'application/json',
}

/**
 * GET ?key=ADMIN_SECRET  (or header X-Admin-Key)
 * Returns: stats, top destinations by review count, all reviews by destination.
 * 401 if key does not match env ADMIN_SECRET.
 */
export async function handler(event, context) {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' }
  }

  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, headers: corsHeaders, body: JSON.stringify({ error: 'Method not allowed' }) }
  }

  const adminSecret = process.env.ADMIN_SECRET || ''
  const keyFromQuery = (event.queryStringParameters && event.queryStringParameters.key) || ''
  const keyFromHeader = (event.headers && (event.headers['x-admin-key'] || event.headers['X-Admin-Key'])) || ''
  const providedKey = keyFromQuery || keyFromHeader

  if (!adminSecret || providedKey !== adminSecret) {
    return { statusCode: 401, headers: corsHeaders, body: JSON.stringify({ error: 'Unauthorized' }) }
  }

  const reviewsStore = getStore({ name: REVIEWS_STORE })
  const votesStore = getStore({ name: VOTES_STORE })

  try {
    const { blobs: reviewBlobs } = await reviewsStore.list()
    const keys = (reviewBlobs || []).map((b) => b.key).filter(Boolean)

    let totalReviews = 0
    let sumRating = 0
    const byDestination = {}
    const topDestinations = []

    for (const key of keys) {
      const list = await reviewsStore.get(key, { type: 'json' })
      const reviews = Array.isArray(list) ? list : []
      byDestination[key] = reviews
      const count = reviews.length
      totalReviews += count
      const avgRating = count ? reviews.reduce((s, r) => s + (r.rating || 0), 0) / count : 0
      const lastDate = count ? (reviews.map((r) => r.date).filter(Boolean).sort().pop() || null) : null
      sumRating += reviews.reduce((s, r) => s + (r.rating || 0), 0)
      topDestinations.push({ key, reviewCount: count, avgRating, lastDate })
    }

    topDestinations.sort((a, b) => b.reviewCount - a.reviewCount)

    let totalLikes = 0
    let totalDislikes = 0
    const votesByDestination = {}
    try {
      const { blobs: voteBlobs } = await votesStore.list()
      for (const b of voteBlobs || []) {
        const key = b.key
        const entries = await votesStore.get(key, { type: 'json' })
        const list = Array.isArray(entries) ? entries : []
        let likes = 0
        let dislikes = 0
        for (const e of list) {
          if (e.vote === 'like') likes++
          else if (e.vote === 'dislike') dislikes++
        }
        totalLikes += likes
        totalDislikes += dislikes
        votesByDestination[key] = { likes, dislikes }
      }
    } catch (e) {
      console.warn('votes store read failed', e)
    }

    const stats = {
      totalDestinations: keys.length,
      totalReviews,
      avgRatingOverall: totalReviews ? Math.round((sumRating / totalReviews) * 10) / 10 : 0,
      totalLikes,
      totalDislikes,
      storeStatus: 'ok',
    }

    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        ok: true,
        stats,
        topDestinations,
        reviewsByDestination: byDestination,
        votesByDestination,
      }),
    }
  } catch (err) {
    console.error('admin function error', err)
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({
        ok: false,
        error: 'Server error',
        stats: { storeStatus: 'error' },
        topDestinations: [],
        reviewsByDestination: {},
        votesByDestination: {},
      }),
    }
  }
}
