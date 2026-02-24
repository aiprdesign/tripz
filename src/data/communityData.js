/**
 * Collective reviews and votes: fetch from and submit to Netlify functions (when deployed).
 * No user accounts – optional fingerprint (one per device) for "one vote per destination".
 * Failed submissions are queued and automatically retried on next app load so data loads to the database.
 */

const VOTES_URL = typeof window !== 'undefined' ? `${window.location.origin}/.netlify/functions/votes` : ''
const FINGERPRINT_KEY = 'wander-vote-fingerprint'
const PENDING_SYNC_KEY = 'atripza-pending-sync'

function getReviewsUrl() {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/.netlify/functions/reviews`
}

function getPendingSync() {
  try {
    const raw = localStorage.getItem(PENDING_SYNC_KEY)
    const data = raw ? JSON.parse(raw) : { reviews: [], votes: [] }
    return { reviews: data.reviews || [], votes: data.votes || [] }
  } catch {
    return { reviews: [], votes: [] }
  }
}

function setPendingSync({ reviews, votes }) {
  try {
    localStorage.setItem(PENDING_SYNC_KEY, JSON.stringify({ reviews: reviews || [], votes: votes || [] }))
  } catch {}
}

/** Persistent device id (no account). One per browser, used so one like/dislike per destination per device. */
export function getFingerprint() {
  if (typeof window === 'undefined') return ''
  try {
    let id = localStorage.getItem(FINGERPRINT_KEY)
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : `fp-${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem(FINGERPRINT_KEY, id)
    }
    return id
  } catch {
    return ''
  }
}

/** Fetch collective reviews for a destination. Returns [] on error or when API is unavailable. */
export async function getCommunityReviews(destinationKey) {
  if (!destinationKey || typeof destinationKey !== 'string') return []
  try {
    const url = `${getReviewsUrl()}?destination=${encodeURIComponent(destinationKey.trim())}`
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data.reviews) ? data.reviews : []
  } catch {
    return []
  }
}

/** Submit a review to the collective store. Queues for retry on failure. Returns the saved review or null. */
export async function submitCommunityReview(destinationKey, { rating, text }) {
  if (!destinationKey || typeof destinationKey !== 'string') return null
  const payload = {
    destination: destinationKey.trim(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text: String(text || '').trim(),
  }
  const doPost = async () => {
    const url = getReviewsUrl()
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return null
    return await res.json()
  }
  try {
    let result = await doPost()
    if (result == null) result = await doPost() // one retry
    if (result == null) {
      const { reviews } = getPendingSync()
      reviews.push({ destinationKey: payload.destination, rating: payload.rating, text: payload.text })
      setPendingSync({ ...getPendingSync(), reviews })
    }
    return result
  } catch {
    const { reviews } = getPendingSync()
    reviews.push({ destinationKey: payload.destination, rating: payload.rating, text: payload.text })
    setPendingSync({ ...getPendingSync(), reviews })
    return null
  }
}

// --- Votes (likes/dislikes) ---

/** Fetch collective like/dislike counts and this device's vote. Returns { likes, dislikes, userVote } or default. */
export async function getCommunityVotes(destinationKey) {
  if (!destinationKey || typeof destinationKey !== 'string') return { likes: 0, dislikes: 0, userVote: null }
  try {
    const fp = getFingerprint()
    const url = `${VOTES_URL}?destination=${encodeURIComponent(destinationKey.trim())}${fp ? `&fingerprint=${encodeURIComponent(fp)}` : ''}`
    const res = await fetch(url, { method: 'GET' })
    if (!res.ok) return { likes: 0, dislikes: 0, userVote: null }
    const data = await res.json()
    return {
      likes: Number(data.likes) || 0,
      dislikes: Number(data.dislikes) || 0,
      userVote: data.userVote === 'like' || data.userVote === 'dislike' ? data.userVote : null,
    }
  } catch {
    return { likes: 0, dislikes: 0, userVote: null }
  }
}

/** Submit like or dislike (or clear). Queues for retry on failure. Returns { likes, dislikes } or null. */
export async function submitCommunityVote(destinationKey, value) {
  if (!destinationKey || typeof destinationKey !== 'string') return null
  const payload = {
    destination: destinationKey.trim(),
    vote: value === 'like' || value === 'dislike' ? value : null,
    fingerprint: getFingerprint(),
  }
  const doPost = async () => {
    const res = await fetch(VOTES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) return null
    return await res.json()
  }
  try {
    let result = await doPost()
    if (result == null) result = await doPost() // one retry
    if (result == null) {
      const { votes } = getPendingSync()
      votes.push(payload)
      setPendingSync({ ...getPendingSync(), votes })
    }
    return result
  } catch {
    const { votes } = getPendingSync()
    votes.push(payload)
    setPendingSync({ ...getPendingSync(), votes })
    return null
  }
}

/** Run pending sync: retry queued reviews and votes so they load to the database. Call on app load. */
export async function runPendingSync() {
  if (typeof window === 'undefined') return
  const { reviews, votes } = getPendingSync()
  const remainingReviews = []
  const remainingVotes = []

  for (const item of reviews) {
    try {
      const res = await fetch(getReviewsUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destination: item.destinationKey,
          rating: item.rating,
          text: item.text || '',
        }),
      })
      if (!res.ok) remainingReviews.push(item)
    } catch {
      remainingReviews.push(item)
    }
  }

  for (const item of votes) {
    try {
      const res = await fetch(VOTES_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      })
      if (!res.ok) remainingVotes.push(item)
    } catch {
      remainingVotes.push(item)
    }
  }

  setPendingSync({ reviews: remainingReviews, votes: remainingVotes })
}
