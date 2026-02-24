import { useState, useEffect } from 'react'
import TripForm from './components/TripForm'
import TripCard from './components/TripCard'
import Explore from './components/Explore'
import HomePage from './components/HomePage'
import AdminPanel from './components/AdminPanel'
import { IconHome, IconExplore, IconTrips } from './components/Icons'
import { countryNames } from './data/destinationsByCountry'
import { runPendingSync } from './data/communityData'
import { addDays } from './utils/date'
import styles from './App.module.css'

const STORAGE_KEY = 'travel-planner-trips'
const USER_COUNTRY_KEY = 'travel-planner-user-country'
const DEFAULT_USER_COUNTRY = 'United States'

function loadTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveTrips(trips) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips))
}

function loadUserCountry() {
  try {
    const raw = localStorage.getItem(USER_COUNTRY_KEY)
    if (raw && countryNames.includes(raw)) return raw
  } catch {}
  return DEFAULT_USER_COUNTRY
}

function App() {
  const [trips, setTrips] = useState(() => loadTrips())
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState('home')
  const [userCountry, setUserCountry] = useState(() => loadUserCountry())
  const [initialExploreCountry, setInitialExploreCountry] = useState(null)

  useEffect(() => {
    saveTrips(trips)
  }, [trips])

  useEffect(() => {
    try {
      localStorage.setItem(USER_COUNTRY_KEY, userCountry)
    } catch {}
  }, [userCountry])

  useEffect(() => {
    const syncAdminView = () => {
      if (window.location.hash === '#admin') setView('admin')
    }
    syncAdminView()
    window.addEventListener('hashchange', syncAdminView)
    return () => window.removeEventListener('hashchange', syncAdminView)
  }, [])

  // Automatically sync any queued reviews/votes to the database on load (e.g. after offline or API failure)
  useEffect(() => {
    runPendingSync()
  }, [])

  const createTrip = (tripData, options = {}) => {
    const initialDestinations = options.initialDestinations || []
    const destinations = initialDestinations.map((name) => ({
      id: crypto.randomUUID(),
      name,
      arrival: '',
      departure: '',
      notes: '',
    }))
    const newTrip = {
      id: crypto.randomUUID(),
      name: tripData.name,
      startDate: tripData.startDate || '',
      endDate: tripData.endDate || '',
      destinations,
      packingList: [],
      preferences: tripData.preferences ?? {
        budget: '',
        travelStyle: '',
        pace: '',
        interests: [],
        accessibilityNeeds: '',
      },
      schedule: options.initialSchedule ?? tripData.schedule ?? [],
    }
    setTrips((prev) => [...prev, newTrip])
    return newTrip
  }

  const addDestinationToTrip = (tripId, destinationName) => {
    const trip = trips.find((t) => t.id === tripId)
    if (!trip) return
    const newDest = {
      id: crypto.randomUUID(),
      name: destinationName,
      arrival: '',
      departure: '',
      notes: '',
    }
    setTrips((prev) =>
      prev.map((t) =>
        t.id === tripId
          ? { ...t, destinations: [...(t.destinations || []), newDest] }
          : t
      )
    )
  }

  const updateTrip = (id, updates) => {
    setTrips((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    )
  }

  const deleteTrip = (id) => {
    setTrips((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className={styles.app}>
      <a href="#main" className={styles.skipLink}>Skip to main content</a>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.titleWrap}>
                <button
                  type="button"
                  className={styles.titleBtn}
                  onClick={() => setView('home')}
                  aria-label="Go to homepage"
                >
                  Atripza
                </button>
              </h1>
              <p className={styles.subtitle}>
                Your guide to every country. Discover the best destinations, experiences, and when to go—then plan your trip.
              </p>
            </div>
            <label className={styles.countryLabel}>
              <span className={styles.countryLabelText}>My country</span>
              <select
                className={styles.countrySelect}
                value={userCountry}
                onChange={(e) => setUserCountry(e.target.value)}
                aria-label="Select your country"
              >
                {countryNames.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Main">
          <button
            type="button"
            className={view === 'home' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setView('home')}
            aria-current={view === 'home' ? 'page' : undefined}
          >
            <IconHome className={styles.navIcon} />
            <span>Home</span>
          </button>
          <button
            type="button"
            className={view === 'explore' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setView('explore')}
            aria-current={view === 'explore' ? 'page' : undefined}
          >
            <IconExplore className={styles.navIcon} />
            <span>Explore</span>
          </button>
          <button
            type="button"
            className={view === 'trips' ? styles.navBtnActive : styles.navBtn}
            onClick={() => setView('trips')}
            aria-current={view === 'trips' ? 'page' : undefined}
          >
            <IconTrips className={styles.navIcon} />
            <span>My trips</span>
          </button>
        </nav>
      </header>

      <main id="main">
      {view === 'home' && (
        <HomePage
          userCountry={userCountry}
          tripCount={trips.length}
          onNavigate={(viewName, payload) => {
            setView(viewName)
            if (viewName === 'explore' && payload?.initialCountry)
              setInitialExploreCountry(payload.initialCountry)
          }}
          onCreateItineraryTrip={(days, country, tripName, destinationNames) => {
            const start = new Date()
            const end = new Date(start)
            end.setDate(end.getDate() + Math.max(0, Number(days) - 1))
            const toYMD = (d) => d.toISOString().slice(0, 10)
            const startYMD = toYMD(start)
            const endYMD = toYMD(end)
            const dayCount = Math.max(1, Number(days) || 1)
            const initialSchedule = Array.from({ length: dayCount }, (_, i) => ({
              id: crypto.randomUUID(),
              dayNumber: i + 1,
              label: `Day ${i + 1}`,
              date: addDays(startYMD, i),
              hotelLink: '',
              ticketLink: '',
              restaurantLink: '',
              notes: '',
            }))
            createTrip(
              { name: tripName, startDate: startYMD, endDate: endYMD },
              { initialDestinations: destinationNames, initialSchedule }
            )
            setView('trips')
          }}
        />
      )}

      {view === 'explore' && (
        <Explore
          trips={trips}
          onAddDestinationToTrip={addDestinationToTrip}
          onCreateTrip={createTrip}
          initialCountry={initialExploreCountry}
          onClearInitialCountry={() => setInitialExploreCountry(null)}
        />
      )}

      {view === 'admin' && (
        <AdminPanel onExit={() => { setView('home'); window.location.hash = '' }} />
      )}

      {view === 'trips' && (
        <section className={styles.tripsSection}>
          <div className={styles.tripsHeader}>
            <p className={styles.tripsIntro}>
              Trips you’re planning. Add places from Explore, then set dates, booking links by day, and budget or pace.
            </p>
            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => setShowForm(true)}
            >
              + New trip
            </button>
          </div>
          {showForm && (
            <TripForm
              onSubmit={(trip) => {
                createTrip(trip)
                setShowForm(false)
              }}
              onCancel={() => setShowForm(false)}
            />
          )}
          <div className={styles.trips}>
            {trips.length === 0 && !showForm && (
              <div className={styles.empty}>
                <p><strong>No trips yet.</strong> Click “+ New trip” to create one, or go to Explore and add a destination—you’ll be prompted to create a trip.</p>
              </div>
            )}
            {trips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onUpdate={(updates) => updateTrip(trip.id, updates)}
                onDelete={() => deleteTrip(trip.id)}
              />
            ))}
          </div>
        </section>
      )}
      </main>

      <footer className={styles.footer}>
        <a href="#admin" className={styles.adminLink}>Admin</a>
      </footer>
    </div>
  )
}

export default App
