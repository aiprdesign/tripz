import { useState } from 'react'
import styles from './TripForm.module.css'

const BUDGET_OPTIONS = ['', 'Budget', 'Moderate', 'Luxury']
const PACE_OPTIONS = ['', 'Relaxed', 'Moderate', 'Packed']
const INTEREST_OPTIONS = ['Food', 'Museums', 'Hiking', 'Nightlife', 'Beach', 'Culture', 'Nature', 'History']

export default function TripForm({ onSubmit, onCancel }) {
  const [name, setName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [budget, setBudget] = useState('')
  const [travelStyle, setTravelStyle] = useState('')
  const [pace, setPace] = useState('')
  const [interests, setInterests] = useState([])
  const [accessibilityNeeds, setAccessibilityNeeds] = useState('')

  const toggleInterest = (item) => {
    setInterests((prev) => (prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    onSubmit({
      name: name.trim(),
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      preferences: {
        budget: budget || undefined,
        travelStyle: travelStyle.trim() || undefined,
        pace: pace || undefined,
        interests: interests.length ? interests : undefined,
        accessibilityNeeds: accessibilityNeeds.trim() || undefined,
      },
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.heading}>New trip</h2>
      <p className={styles.formIntro}>Give it a name and optional dates. You can add destinations from Explore and set budget or pace in the trip card.</p>
      <label className={styles.label}>
        Trip name
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Japan 2025"
          className={styles.input}
          autoFocus
        />
      </label>
      <div className={styles.row}>
        <label className={styles.label}>
          Start date
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          End date
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={styles.input}
          />
        </label>
      </div>
      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Personalize (optional)</legend>
        <label className={styles.label}>
          Budget
          <select className={styles.input} value={budget} onChange={(e) => setBudget(e.target.value)}>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o || 'x'} value={o}>{o || '—'}</option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Travel style
          <input
            type="text"
            value={travelStyle}
            onChange={(e) => setTravelStyle(e.target.value)}
            placeholder="e.g. Backpacking, Family, Honeymoon"
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Pace
          <select className={styles.input} value={pace} onChange={(e) => setPace(e.target.value)}>
            {PACE_OPTIONS.map((o) => (
              <option key={o || 'x'} value={o}>{o || '—'}</option>
            ))}
          </select>
        </label>
        <div className={styles.label}>Interests</div>
        <div className={styles.chipRow}>
          {INTEREST_OPTIONS.map((item) => (
            <button
              key={item}
              type="button"
              className={interests.includes(item) ? styles.chipActive : styles.chip}
              onClick={() => toggleInterest(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <label className={styles.label}>
          Accessibility needs
          <input
            type="text"
            value={accessibilityNeeds}
            onChange={(e) => setAccessibilityNeeds(e.target.value)}
            placeholder="e.g. Wheelchair access, low mobility"
            className={styles.input}
          />
        </label>
      </fieldset>
      <div className={styles.actions}>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitBtn} disabled={!name.trim()}>
          Create trip
        </button>
      </div>
    </form>
  )
}
