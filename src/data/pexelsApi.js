/**
 * Optional Pexels API: search for a city/country and cache the first photo ID.
 * Set VITE_PEXELS_API_KEY in .env to enable. Free at https://www.pexels.com/api
 */

const PEXELS_SEARCH = 'https://api.pexels.com/v1/search'
const CACHE_PREFIX = 'pexels-id-'

export function getPexelsApiKey() {
  return typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PEXELS_API_KEY
}

const PEXELS_BASE = 'https://images.pexels.com/photos'
const PEXELS_PARAMS = '?auto=compress&cs=tinysrgb&fit=crop'

export function pexelsUrlFromId(photoId, width = 400, height = 300) {
  return `${PEXELS_BASE}/${photoId}/pexels-photo-${photoId}.jpeg${PEXELS_PARAMS}&w=${width}&h=${height}`
}

/** Sync: get cached Pexels photo ID for a destination key. Returns id or null. */
export function getCachedPexelsId(destinationKey) {
  if (typeof window === 'undefined') return null
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + destinationKey)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && typeof data.id === 'number' ? data.id : null
  } catch {
    return null
  }
}

/** Fetch first Pexels photo for query, cache its ID, return URL. Returns null if no API key or no result. */
export async function fetchAndCachePexelsForDestination(destinationKey, options = {}) {
  const { width = 400, height = 300 } = options
  const key = (destinationKey || '').trim()
  if (!key) return null
  const apiKey = getPexelsApiKey()
  if (!apiKey) return null
  try {
    const res = await fetch(
      `${PEXELS_SEARCH}?query=${encodeURIComponent(key)}&per_page=1&orientation=landscape`,
      { headers: { Authorization: apiKey } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const photo = data.photos && data.photos[0]
    if (!photo || !photo.id) return null
    try {
      localStorage.setItem(CACHE_PREFIX + key, JSON.stringify({ id: photo.id }))
    } catch {}
    return pexelsUrlFromId(photo.id, width, height)
  } catch {
    return null
  }
}
