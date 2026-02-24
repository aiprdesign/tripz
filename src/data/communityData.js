/**
 * Collective reviews and votes: fetch from and submit to Netlify functions (when deployed).
 * No user accounts – optional fingerprint (one per device) for "one vote per destination".
 */

const VOTES_URL = typeof window !== 'undefined' ? `${window.location.origin}/.netlify/functions/votes` : ''
const FINGERPRINT_KEY = 'wander-vote-fingerprint'

function getReviewsUrl() {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/.netlify/functions/reviews`
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

/** Submit a review to the collective store. No-op if API unavailable. Returns the saved review or null. */
export async function submitCommunityReview(destinationKey, { rating, text }) {
  if (!destinationKey || typeof destinationKey !== 'string') return null
  try {
    const url = getReviewsUrl()
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: destinationKey.trim(),
        rating: Math.min(5, Math.max(1, Number(rating) || 5)),
        text: String(text || '').trim(),
      }),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
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

/** Submit like or dislike (or clear). value: 'like' | 'dislike' | null. Returns { likes, dislikes } or null. */
export async function submitCommunityVote(destinationKey, value) {
  if (!destinationKey || typeof destinationKey !== 'string') return null
  try {
    const res = await fetch(VOTES_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destination: destinationKey.trim(),
        vote: value === 'like' || value === 'dislike' ? value : null,
        fingerprint: getFingerprint(),
      }),
    })
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}
