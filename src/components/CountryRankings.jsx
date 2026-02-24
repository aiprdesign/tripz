import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getAllRankings, RANKING_LABELS, RANKING_DESCRIPTIONS, getScoreLabel } from '../data/countryRankings'
import styles from './CountryRankings.module.css'

const SORT_KEYS = ['easeOfTravel', 'fun', 'safety', 'affordability', 'touristWelcome', 'lawsEase']

export default function CountryRankings({ onBack }) {
  const [sortBy, setSortBy] = useState('safety')
  const [sortDesc, setSortDesc] = useState(true)

  const rankings = useMemo(() => {
    const list = getAllRankings()
    const key = sortBy
    const desc = sortDesc
    return [...list].sort((a, b) => {
      const va = a[key]
      const vb = b[key]
      if (va !== vb) return desc ? vb - va : va - vb
      return (a.country || '').localeCompare(b.country || '')
    })
  }, [sortBy, sortDesc])

  const handleSort = (key) => {
    if (sortBy === key) setSortDesc((d) => !d)
    else {
      setSortBy(key)
      setSortDesc(true)
    }
  }

  return (
    <section className={styles.wrap} aria-labelledby="rankings-heading">
      <div className={styles.header}>
        <h2 id="rankings-heading" className={styles.title}>Country rankings</h2>
        <p className={styles.intro}>
          Compare countries by ease of travel, fun, safety, affordability, how welcome tourists are, and how easy or strict laws are. Scores 1–5 (5 = best). Sort by clicking a column header.
        </p>
        <p className={styles.disclaimer}>
          Rankings are for general comparison only and are not professional travel or safety advice. Conditions change; always check official travel advisories and do your own research before travel.
        </p>
        {onBack && (
          <button type="button" className={styles.backBtn} onClick={onBack}>
            ← Back
          </button>
        )}
      </div>

      <div className={styles.legend}>
        {SORT_KEYS.map((key) => (
          <span key={key} className={styles.legendItem}>
            <strong>{RANKING_LABELS[key]}</strong>: {RANKING_DESCRIPTIONS[key]}
          </span>
        ))}
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thCountry}>Country</th>
              {SORT_KEYS.map((key) => (
                <th key={key} className={styles.thScore}>
                  <button
                    type="button"
                    className={styles.thBtn}
                    onClick={() => handleSort(key)}
                    aria-sort={sortBy === key ? (sortDesc ? 'descending' : 'ascending') : undefined}
                  >
                    {RANKING_LABELS[key]}
                    {sortBy === key && (sortDesc ? ' ↓' : ' ↑')}
                  </button>
                </th>
              ))}
              <th className={styles.thLabel}>Summary</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r) => (
              <tr key={r.country}>
                <td className={styles.tdCountry}>
                  <Link to={`/explore/${encodeURIComponent(r.country)}`} className={styles.countryLink}>
                    {r.country}
                  </Link>
                </td>
                <td className={styles.tdScore} data-score={r.easeOfTravel}>{r.easeOfTravel}</td>
                <td className={styles.tdScore} data-score={r.fun}>{r.fun}</td>
                <td className={styles.tdScore} data-score={r.safety}>{r.safety}</td>
                <td className={styles.tdScore} data-score={r.affordability}>{r.affordability}</td>
                <td className={styles.tdScore} data-score={r.touristWelcome}>{r.touristWelcome}</td>
                <td className={styles.tdScore} data-score={r.lawsEase}>{r.lawsEase}</td>
                <td className={styles.tdLabel}>{getScoreLabel((r.easeOfTravel + r.fun + r.safety + r.affordability + r.touristWelcome + r.lawsEase) / 6)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
