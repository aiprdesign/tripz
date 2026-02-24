import { useState, useEffect } from 'react'
import DestinationList from './DestinationList'
import PackingList from './PackingList'
import { getDestinationImageSlideshowUrls } from '../data/destinationImages'
import DestinationImageSlideshow from './DestinationImageSlideshow'
import { addDays, daysBetween } from '../utils/date'
import styles from './TripCard.module.css'

function formatDateRange(start, end) {
  if (!start && !end) return null
  if (!end) return start
  if (!start) return end
  return `${start} → ${end}`
}

const prefs = (trip) => trip.preferences || {}
const schedule = (trip) => Array.isArray(trip.schedule) ? trip.schedule : []

export default function TripCard({ trip, onUpdate, onDelete }) {
  const [expanded, setExpanded] = useState(true)
  const [editing, setEditing] = useState(false)
  const [editName, setEditName] = useState(trip.name)
  const [editingPrefs, setEditingPrefs] = useState(false)
  const [editingDates, setEditingDates] = useState(false)
  const [editStartDate, setEditStartDate] = useState(trip.startDate || '')
  const [editEndDate, setEditEndDate] = useState(trip.endDate || '')

  const dateRange = formatDateRange(trip.startDate, trip.endDate)

  useEffect(() => {
    setEditStartDate(trip.startDate || '')
    setEditEndDate(trip.endDate || '')
  }, [trip.startDate, trip.endDate])

  const heroUrls = trip.destinations?.length > 0
    ? getDestinationImageSlideshowUrls(trip.destinations[0].name, { width: 720, height: 200 })
    : [`https://picsum.photos/seed/${encodeURIComponent(trip.name)}/720/200`]
  const prefsData = prefs(trip)
  const scheduleData = schedule(trip)

  const saveEdit = () => {
    if (editName.trim()) {
      onUpdate({ name: editName.trim() })
      setEditing(false)
    }
  }

  const updatePrefs = (next) => {
    onUpdate({ preferences: { ...prefsData, ...next } })
    setEditingPrefs(false)
  }

  const addScheduleDay = () => {
    const dayDate = trip.startDate ? addDays(trip.startDate, scheduleData.length) : ''
    const next = [...scheduleData, { id: crypto.randomUUID(), dayNumber: scheduleData.length + 1, label: `Day ${scheduleData.length + 1}`, date: dayDate, hotelLink: '', ticketLink: '', restaurantLink: '', notes: '' }]
    onUpdate({ schedule: next })
  }

  const updateScheduleDay = (id, updates) => {
    const next = scheduleData.map((d) => (d.id === id ? { ...d, ...updates } : d))
    onUpdate({ schedule: next })
  }

  const removeScheduleDay = (id) => {
    const next = scheduleData.filter((d) => d.id !== id).map((d, i) => ({ ...d, dayNumber: i + 1, label: `Day ${i + 1}` }))
    onUpdate({ schedule: next })
  }

  const hasPrefs = prefsData.budget || prefsData.pace || (prefsData.interests && prefsData.interests.length) || prefsData.travelStyle || prefsData.accessibilityNeeds

  return (
    <article className={styles.card}>
      <div className={styles.cardHero}>
        <DestinationImageSlideshow
          urls={heroUrls}
          intervalMs={5000}
          className={styles.cardHeroSlideshow}
          ariaLabel={trip.name}
        />
      </div>
      <header className={styles.cardHeader}>
        <button
          type="button"
          className={styles.expandBtn}
          onClick={() => setExpanded((e) => !e)}
          aria-expanded={expanded}
        >
          <span className={styles.chevron}>{expanded ? '▼' : '▶'}</span>
        </button>
        {editing ? (
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
            className={styles.editInput}
            autoFocus
          />
        ) : (
          <h2 className={styles.tripName} onClick={() => setEditing(true)}>
            {trip.name}
          </h2>
        )}
        {editingDates ? (
          <div className={styles.dateEditRow} onClick={(e) => e.stopPropagation()}>
            <input
              type="date"
              className={styles.dateInput}
              value={editStartDate}
              onChange={(e) => setEditStartDate(e.target.value)}
              aria-label="Start date"
            />
            <span className={styles.dateEditSep}>→</span>
            <input
              type="date"
              className={styles.dateInput}
              value={editEndDate}
              onChange={(e) => setEditEndDate(e.target.value)}
              aria-label="End date"
            />
            <button
              type="button"
              className={styles.dateDoneBtn}
              onClick={() => {
                const start = editStartDate || ''
                const end = editEndDate || ''
                let newSchedule = scheduleData
                if (start) {
                  const dayCount = scheduleData.length || (start && end ? daysBetween(start, end) : 0)
                  if (scheduleData.length > 0) {
                    newSchedule = scheduleData.map((day, i) => ({ ...day, date: addDays(start, i) }))
                  } else if (dayCount > 0) {
                    newSchedule = Array.from({ length: dayCount }, (_, i) => ({
                      id: crypto.randomUUID(),
                      dayNumber: i + 1,
                      label: `Day ${i + 1}`,
                      date: addDays(start, i),
                      hotelLink: '',
                      ticketLink: '',
                      restaurantLink: '',
                      notes: '',
                    }))
                  }
                }
                onUpdate({ startDate: start, endDate: end, schedule: newSchedule })
                setEditingDates(false)
              }}
            >
              Done
            </button>
          </div>
        ) : (
          <span
            className={styles.dateRange}
            onClick={() => setEditingDates(true)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingDates(true)}
            role="button"
            tabIndex={0}
            title="Change dates"
          >
            {dateRange || 'Set dates'}
          </span>
        )}
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.iconBtn}
            onClick={() => setEditing(true)}
            title="Rename"
          >
            ✎
          </button>
          <button
            type="button"
            className={styles.iconBtnDanger}
            onClick={() => window.confirm('Delete this trip?') && onDelete()}
            title="Delete trip"
          >
            ×
          </button>
        </div>
      </header>

      {expanded && (
        <div className={styles.cardBody}>
          <section className={styles.preferencesSection}>
            <h3 className={styles.subsectionTitle}>Trip preferences</h3>
            <p className={styles.subsectionHint}>Budget, pace, and interests help you (and the app) match destinations to your style.</p>
            {!editingPrefs && (
              <>
                {hasPrefs ? (
                  <div className={styles.prefsChips}>
                    {prefsData.budget && <span className={styles.prefChip}>Budget: {prefsData.budget}</span>}
                    {prefsData.pace && <span className={styles.prefChip}>Pace: {prefsData.pace}</span>}
                    {prefsData.travelStyle && <span className={styles.prefChip}>{prefsData.travelStyle}</span>}
                    {prefsData.interests?.length > 0 && prefsData.interests.map((i) => <span key={i} className={styles.prefChip}>{i}</span>)}
                    {prefsData.accessibilityNeeds && <span className={styles.prefChip}>Access: {prefsData.accessibilityNeeds}</span>}
                  </div>
                ) : (
                  <p className={styles.prefsHint}>Budget, pace, interests, accessibility—personalize your trip.</p>
                )}
                <button type="button" className={styles.editPrefsBtn} onClick={() => setEditingPrefs(true)}>
                  {hasPrefs ? 'Edit preferences' : 'Add preferences'}
                </button>
              </>
            )}
            {editingPrefs && (
              <div className={styles.prefsForm}>
                <label className={styles.prefLabel}>Budget <select value={prefsData.budget || ''} onChange={(e) => updatePrefs({ budget: e.target.value })} className={styles.prefInput}><option value="">—</option><option value="Budget">Budget</option><option value="Moderate">Moderate</option><option value="Luxury">Luxury</option></select></label>
                <label className={styles.prefLabel}>Pace <select value={prefsData.pace || ''} onChange={(e) => updatePrefs({ pace: e.target.value })} className={styles.prefInput}><option value="">—</option><option value="Relaxed">Relaxed</option><option value="Moderate">Moderate</option><option value="Packed">Packed</option></select></label>
                <label className={styles.prefLabel}>Travel style <input className={styles.prefInput} value={prefsData.travelStyle || ''} onChange={(e) => updatePrefs({ travelStyle: e.target.value })} placeholder="e.g. Family, Backpacking" /></label>
                <label className={styles.prefLabel}>Accessibility <input className={styles.prefInput} value={prefsData.accessibilityNeeds || ''} onChange={(e) => updatePrefs({ accessibilityNeeds: e.target.value })} placeholder="e.g. Wheelchair access" /></label>
                <button type="button" className={styles.donePrefsBtn} onClick={() => setEditingPrefs(false)}>Done</button>
              </div>
            )}
          </section>
          <section className={styles.scheduleSection}>
            <h3 className={styles.subsectionTitle}>Day-by-day & links</h3>
            <p className={styles.scheduleHint}>Add a day for each stop. For each day you can paste hotel, ticket, or restaurant booking links and add notes (e.g. route or travel time).</p>
            {scheduleData.map((day) => (
              <div key={day.id} className={styles.scheduleDay}>
                <div className={styles.scheduleDayHead}>
                  <span className={styles.scheduleDayLabel}>{day.label || `Day ${day.dayNumber}`}{day.date ? ` — ${day.date}` : ''}</span>
                  <button type="button" className={styles.removeDayBtn} onClick={() => removeScheduleDay(day.id)} title="Remove day">×</button>
                </div>
                <div className={styles.scheduleDayLinks}>
                  <input type="url" placeholder="Hotel link" className={styles.linkInput} value={day.hotelLink || ''} onChange={(e) => updateScheduleDay(day.id, { hotelLink: e.target.value })} />
                  <input type="url" placeholder="Ticket link" className={styles.linkInput} value={day.ticketLink || ''} onChange={(e) => updateScheduleDay(day.id, { ticketLink: e.target.value })} />
                  <input type="url" placeholder="Restaurant link" className={styles.linkInput} value={day.restaurantLink || ''} onChange={(e) => updateScheduleDay(day.id, { restaurantLink: e.target.value })} />
                </div>
                <input type="text" placeholder="Notes (e.g. map route, travel time)" className={styles.notesInput} value={day.notes || ''} onChange={(e) => updateScheduleDay(day.id, { notes: e.target.value })} />
              </div>
            ))}
            <button type="button" className={styles.addDayBtn} onClick={addScheduleDay}>+ Add day</button>
          </section>
          <DestinationList
            destinations={trip.destinations}
            onUpdate={(destinations) => onUpdate({ destinations })}
          />
          <PackingList
            items={trip.packingList}
            onUpdate={(packingList) => onUpdate({ packingList })}
          />
        </div>
      )}
    </article>
  )
}
