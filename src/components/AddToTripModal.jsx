import { useState } from 'react'
import styles from './AddToTripModal.module.css'

export default function AddToTripModal({ destinationName, trips, onAddToTrip, onCreateTrip, onClose, onAdded }) {
  const [creatingNew, setCreatingNew] = useState(false)
  const [newTripName, setNewTripName] = useState('')

  const handleAdd = (trip) => {
    onAddToTrip(trip.id, destinationName)
    onAdded?.(destinationName, trip.name)
    onClose()
  }

  const handleCreateAndAdd = (e) => {
    e.preventDefault()
    if (!newTripName.trim()) return
    const trip = onCreateTrip({ name: newTripName.trim(), startDate: '', endDate: '' })
    onAddToTrip(trip.id, destinationName)
    onAdded?.(destinationName, trip.name)
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h3 className={styles.title}>Add to trip</h3>
          <p className={styles.subtitle}>Add “{destinationName}” to a trip. Pick one below or create a new trip.</p>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          {!creatingNew ? (
            <>
              <ul className={styles.tripList}>
                {trips.map((trip) => (
                  <li key={trip.id}>
                    <button
                      type="button"
                      className={styles.tripBtn}
                      onClick={() => handleAdd(trip)}
                    >
                      <span className={styles.tripName}>{trip.name}</span>
                      {trip.startDate || trip.endDate ? (
                        <span className={styles.tripDates}>
                          {[trip.startDate, trip.endDate].filter(Boolean).join(' – ')}
                        </span>
                      ) : null}
                    </button>
                  </li>
                ))}
              </ul>
              {trips.length === 0 && (
                <p className={styles.noTrips}>You don’t have any trips yet.</p>
              )}
              <button
                type="button"
                className={styles.newTripTrigger}
                onClick={() => setCreatingNew(true)}
              >
                + Create new trip and add here
              </button>
            </>
          ) : (
            <form onSubmit={handleCreateAndAdd} className={styles.createForm}>
              <label className={styles.label}>
                New trip name
                <input
                  type="text"
                  value={newTripName}
                  onChange={(e) => setNewTripName(e.target.value)}
                  placeholder="e.g. Japan 2025"
                  className={styles.input}
                  autoFocus
                />
              </label>
              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setCreatingNew(false)}>
                  Back
                </button>
                <button type="submit" className={styles.submitBtn} disabled={!newTripName.trim()}>
                  Create trip & add destination
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
