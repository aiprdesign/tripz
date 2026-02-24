/**
 * Add n days to a date string (YYYY-MM-DD). Uses local date.
 * @param {string} ymd - Date string YYYY-MM-DD
 * @param {number} days - Number of days to add
 * @returns {string} YYYY-MM-DD
 */
export function addDays(ymd, days) {
  if (!ymd) return ''
  const [y, m, d] = ymd.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + days)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

/**
 * Number of calendar days from start to end (inclusive).
 * @param {string} startYmd - YYYY-MM-DD
 * @param {string} endYmd - YYYY-MM-DD
 * @returns {number}
 */
export function daysBetween(startYmd, endYmd) {
  if (!startYmd || !endYmd) return 0
  const [y1, m1, d1] = startYmd.split('-').map(Number)
  const [y2, m2, d2] = endYmd.split('-').map(Number)
  const start = new Date(y1, m1 - 1, d1)
  const end = new Date(y2, m2 - 1, d2)
  const diff = Math.round((end - start) / (24 * 60 * 60 * 1000))
  return Math.max(0, diff + 1)
}
