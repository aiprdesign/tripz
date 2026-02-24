/**
 * Local-only "database" for user reviews and like/dislike.
 * All data stays in localStorage on the user's device. No accounts, no server, no data collection.
 * Key format: "City, Country" for destinations.
 */

const REVIEWS_KEY = 'wander-local-reviews'
const VOTES_KEY = 'wander-local-votes'

function read(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaultVal
  } catch {
    return defaultVal
  }
}

function write(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch {}
}

/** Get the user's review for a destination (one per destination, stored on this device). */
export function getReview(destinationKey) {
  const all = read(REVIEWS_KEY, {})
  return all[destinationKey] || null
}

/** Add or update the user's review for a destination. */
export function setReview(destinationKey, { rating, text }) {
  const all = read(REVIEWS_KEY, {})
  all[destinationKey] = {
    id: all[destinationKey]?.id || crypto.randomUUID(),
    rating: Math.min(5, Math.max(1, Number(rating) || 5)),
    text: String(text || '').trim(),
    date: new Date().toISOString().slice(0, 10),
  }
  write(REVIEWS_KEY, all)
  return all[destinationKey]
}

/** Remove the user's review for a destination. */
export function removeReview(destinationKey) {
  const all = read(REVIEWS_KEY, {})
  delete all[destinationKey]
  write(REVIEWS_KEY, all)
}

/** Get like/dislike for a destination: 'like' | 'dislike' | null. */
export function getVote(destinationKey) {
  const all = read(VOTES_KEY, {})
  return all[destinationKey] || null
}

/** Set like, dislike, or clear. */
export function setVote(destinationKey, value) {
  const all = read(VOTES_KEY, {})
  if (value === null || value === undefined) {
    delete all[destinationKey]
  } else if (value === 'like' || value === 'dislike') {
    all[destinationKey] = value
  }
  write(VOTES_KEY, all)
  return all[destinationKey] || null
}

/** Get all destinations the user has reviewed (for "Your reviews" list). */
export function getAllReviewedDestinations() {
  const all = read(REVIEWS_KEY, {})
  return Object.entries(all).map(([key, review]) => ({ destinationKey: key, ...review }))
}

/** Get all votes (for optional display). */
export function getAllVotes() {
  return read(VOTES_KEY, {})
}
