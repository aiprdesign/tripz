import { useState, useEffect } from 'react'
import styles from './AdminPanel.module.css'

const ADMIN_STORAGE_KEY = 'wander-admin-key'

function getAdminUrl() {
  if (typeof window === 'undefined') return ''
  return `${window.location.origin}/.netlify/functions/admin`
}

export default function AdminPanel({ onExit }) {
  const [key, setKey] = useState('')
  const [inputKey, setInputKey] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [expandedDest, setExpandedDest] = useState(null)

  useEffect(() => {
    const stored = sessionStorage.getItem(ADMIN_STORAGE_KEY)
    if (stored) setKey(stored)
  }, [])

  useEffect(() => {
    if (!key) return
    let cancelled = false
    setLoading(true)
    setError('')
    fetch(`${getAdminUrl()}?key=${encodeURIComponent(key)}`)
      .then((res) => {
        if (res.status === 401) {
          sessionStorage.removeItem(ADMIN_STORAGE_KEY)
          setKey('')
          setError('Invalid admin key')
          return null
        }
        return res.json()
      })
      .then((json) => {
        if (!cancelled && json) {
          setData(json)
          setError('')
        }
      })
      .catch(() => { if (!cancelled) setError('Network error') })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [key])

  const handleLogin = (e) => {
    e.preventDefault()
    const k = inputKey.trim()
    if (!k) return
    sessionStorage.setItem(ADMIN_STORAGE_KEY, k)
    setKey(k)
    setInputKey('')
  }

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY)
    setKey('')
    setData(null)
    setError('')
  }

  if (!key) {
    return (
      <section className={styles.admin} aria-labelledby="admin-heading">
        <h2 id="admin-heading" className={styles.adminTitle}>Admin</h2>
        <p className={styles.adminHint}>Enter your admin key to view reviews, ratings, and top visits.</p>
        <form onSubmit={handleLogin} className={styles.adminForm}>
          <input
            type="password"
            value={inputKey}
            onChange={(e) => setInputKey(e.target.value)}
            placeholder="Admin key"
            className={styles.adminInput}
            autoComplete="off"
          />
          <button type="submit" className={styles.adminSubmit}>View dashboard</button>
        </form>
        {error && <p className={styles.adminError}>{error}</p>}
        {onExit && (
          <button type="button" className={styles.exitBtn} onClick={onExit}>← Back to app</button>
        )}
      </section>
    )
  }

  if (loading) {
    return (
      <section className={styles.admin}>
        <p className={styles.loading}>Loading dashboard…</p>
        {onExit && <button type="button" className={styles.exitBtn} onClick={onExit}>← Back</button>}
      </section>
    )
  }

  if (error && !data) {
    return (
      <section className={styles.admin}>
        <p className={styles.adminError}>{error}</p>
        <button type="button" className={styles.exitBtn} onClick={onExit}>← Back</button>
      </section>
    )
  }

  const { stats = {}, topDestinations = [], reviewsByDestination = {}, votesByDestination = {} } = data || {}

  return (
    <section className={styles.admin} aria-labelledby="admin-dash-heading">
      <div className={styles.adminHeader}>
        <h2 id="admin-dash-heading" className={styles.adminTitle}>Admin dashboard</h2>
        <div className={styles.adminActions}>
          <button type="button" className={styles.refreshBtn} onClick={() => setKey((k) => k)}>Refresh</button>
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>Log out</button>
          {onExit && <button type="button" className={styles.exitBtn} onClick={onExit}>← Back</button>}
        </div>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Security & health</h3>
        <ul className={styles.statsList}>
          <li><strong>Store status</strong> {stats.storeStatus === 'ok' ? '✓ OK' : '✗ Error'}</li>
          <li><strong>Total destinations (reviews)</strong> {stats.totalDestinations ?? 0}</li>
          <li><strong>Total reviews</strong> {stats.totalReviews ?? 0}</li>
          <li><strong>Average rating (overall)</strong> {stats.avgRatingOverall ?? 0}</li>
          <li><strong>Total likes</strong> {stats.totalLikes ?? 0}</li>
          <li><strong>Total dislikes</strong> {stats.totalDislikes ?? 0}</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Top visits (by review count)</h3>
        {topDestinations.length === 0 ? (
          <p className={styles.empty}>No destinations with reviews yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Reviews</th>
                  <th>Avg rating</th>
                  <th>Last review</th>
                </tr>
              </thead>
              <tbody>
                {topDestinations.map((d) => (
                  <tr key={d.key}>
                    <td>{d.key}</td>
                    <td>{d.reviewCount}</td>
                    <td>{d.avgRating != null ? d.avgRating.toFixed(1) : '—'}</td>
                    <td>{d.lastDate || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {Object.keys(votesByDestination).length > 0 && (
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Likes / dislikes by destination</h3>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Destination</th>
                  <th>Likes</th>
                  <th>Dislikes</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(votesByDestination)
                  .sort((a, b) => (b[1].likes + b[1].dislikes) - (a[1].likes + a[1].dislikes))
                  .map(([dest, v]) => (
                    <tr key={dest}>
                      <td>{dest}</td>
                      <td>{v.likes}</td>
                      <td>{v.dislikes}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>All reviews by destination</h3>
        {Object.keys(reviewsByDestination).length === 0 ? (
          <p className={styles.empty}>No reviews yet.</p>
        ) : (
          <div className={styles.destList}>
            {Object.entries(reviewsByDestination).map(([dest, reviews]) => (
              <div key={dest} className={styles.destBlock}>
                <button
                  type="button"
                  className={styles.destHeader}
                  onClick={() => setExpandedDest((x) => (x === dest ? null : dest))}
                  aria-expanded={expandedDest === dest}
                >
                  <span>{dest}</span>
                  <span className={styles.destCount}>{reviews.length} review{reviews.length !== 1 ? 's' : ''}</span>
                  <span className={styles.chevron}>{expandedDest === dest ? '▼' : '▶'}</span>
                </button>
                {expandedDest === dest && (
                  <ul className={styles.reviewList}>
                    {reviews.map((r) => (
                      <li key={r.id} className={styles.reviewItem}>
                        <span className={styles.reviewStars}>{'★'.repeat(r.rating || 0)}{'☆'.repeat(5 - (r.rating || 0))}</span>
                        {r.text && <span className={styles.reviewText}>{r.text}</span>}
                        <span className={styles.reviewDate}>{r.date}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
