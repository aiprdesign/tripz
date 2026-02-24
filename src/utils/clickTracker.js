/**
 * Sends click events to the backend so we can count total clicks and per-country views.
 */

const CLICKS_URL = typeof window !== 'undefined' ? `${window.location.origin}/.netlify/functions/clicks` : ''
const DEBOUNCE_MS = 800
let pendingClicks = 0
let debounceTimer = null

function send(body) {
  if (!CLICKS_URL || typeof fetch === 'undefined') return
  fetch(CLICKS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).catch(() => {})
}

/** Call when user views a country page (e.g. navigated to /explore/France). */
export function recordCountryView(country) {
  if (country && typeof country === 'string') send({ country: country.trim() })
}

/** Call once to start counting every click on the site (debounced). */
export function initGlobalClickTracker() {
  if (typeof document === 'undefined') return
  const flush = () => {
    if (pendingClicks > 0) {
      send({ totalClicks: pendingClicks })
      pendingClicks = 0
    }
    debounceTimer = null
  }
  document.addEventListener('click', () => {
    pendingClicks += 1
    if (debounceTimer == null) debounceTimer = setTimeout(flush, DEBOUNCE_MS)
  })
  window.addEventListener('beforeunload', flush)
}
