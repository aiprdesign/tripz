import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import TripForm from './components/TripForm'
import TripCard from './components/TripCard'
import { IconHome, IconExplore, IconTrips } from './components/Icons'

const Explore = lazy(() => import('./components/Explore'))
const HomePage = lazy(() => import('./components/HomePage'))
const AdminPanel = lazy(() => import('./components/AdminPanel'))
import { countryNames } from './data/destinationsByCountry'
import { runPendingSync } from './data/communityData'
import { addDays } from './utils/date'
import { getCountryFlagImageUrl, getCountryIso } from './utils/countryFlags'
import styles from './App.module.css'

const STORAGE_KEY = 'travel-planner-trips'
const USER_COUNTRY_KEY = 'travel-planner-user-country'
const DEFAULT_USER_COUNTRY = 'United States'
const VIEWS_URL = typeof window !== 'undefined' ? `${window.location.origin}/.netlify/functions/views` : ''

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
  const [userCountry, setUserCountry] = useState(() => loadUserCountry())
  const [siteViews, setSiteViews] = useState(null)
  const [headerFlagError, setHeaderFlagError] = useState(false)
  const [selectFlagError, setSelectFlagError] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    saveTrips(trips)
  }, [trips])

  useEffect(() => {
    try {
      localStorage.setItem(USER_COUNTRY_KEY, userCountry)
    } catch {}
  }, [userCountry])

  useEffect(() => {
    setHeaderFlagError(false)
    setSelectFlagError(false)
  }, [userCountry])

  // Auto-sync queued reviews/votes to database on load
  useEffect(() => {
    runPendingSync()
  }, [])

  // Fetch site view count (increments on server, shown in footer)
  useEffect(() => {
    if (!VIEWS_URL) return
    fetch(VIEWS_URL, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setSiteViews(data.count != null ? data.count : null))
      .catch(() => {})
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

  const path = location.pathname
  const isHome = path === '/'
  const isExplore = path === '/explore' || path.startsWith('/explore/')
  const isTrips = path === '/trips'
  const isAdmin = path === '/admin'

  // Update document title for SEO and browser tab
  useEffect(() => {
    const country = path.startsWith('/explore/') ? decodeURIComponent(path.replace('/explore/', '')) : null
    if (isHome) document.title = 'Atripza – Your guide to every country'
    else if (country) document.title = `${country} – Atripza`
    else if (isExplore) document.title = 'Explore destinations – Atripza'
    else if (isTrips) document.title = 'My trips – Atripza'
    else if (isAdmin) document.title = 'Admin – Atripza'
  }, [path, isHome, isExplore, isTrips, isAdmin])

  return (
    <div className={styles.app}>
      <a href="#main" className={styles.skipLink}>Skip to main content</a>
      <header className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.headerRow}>
            <div>
              <h1 className={styles.titleWrap}>
                {userCountry && (getCountryFlagImageUrl(userCountry) || getCountryIso(userCountry)) && (
                  <>
                    {getCountryFlagImageUrl(userCountry) && !headerFlagError && (
                      <img
                        src={getCountryFlagImageUrl(userCountry)}
                        alt=""
                        className={styles.headerFlag}
                        width={28}
                        height={21}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        aria-hidden="true"
                        onError={() => setHeaderFlagError(true)}
                      />
                    )}
                    {(headerFlagError || !getCountryFlagImageUrl(userCountry)) && getCountryIso(userCountry) && (
                      <span className={styles.headerFlagFallback} aria-hidden="true">{getCountryIso(userCountry)}</span>
                    )}
                  </>
                )}
                <Link to="/" className={styles.titleBtn} aria-label="Atripza – Go to homepage">
                  Atripza
                </Link>
              </h1>
              <p className={styles.subtitle}>
                Your guide to every country. Discover the best destinations, experiences, and when to go—then plan your trip.
              </p>
            </div>
            <label className={styles.countryLabel}>
              <span className={styles.countryLabelText}>My country</span>
              <span className={styles.countrySelectWrap}>
                {userCountry && (getCountryFlagImageUrl(userCountry) || getCountryIso(userCountry)) && (
                  <>
                    {getCountryFlagImageUrl(userCountry) && !selectFlagError && (
                      <img
                        src={getCountryFlagImageUrl(userCountry, '24x18')}
                        alt=""
                        className={styles.countrySelectFlag}
                        width={24}
                        height={18}
                        loading="eager"
                        referrerPolicy="no-referrer"
                        aria-hidden="true"
                        onError={() => setSelectFlagError(true)}
                      />
                    )}
                    {(selectFlagError || !getCountryFlagImageUrl(userCountry)) && getCountryIso(userCountry) && (
                      <span className={styles.countrySelectFlagFallback} aria-hidden="true">{getCountryIso(userCountry)}</span>
                    )}
                  </>
                )}
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
              </span>
            </label>
          </div>
        </div>
        <nav className={styles.nav} aria-label="Main">
          <Link
            to="/"
            className={isHome ? styles.navBtnActive : styles.navBtn}
            aria-current={isHome ? 'page' : undefined}
          >
            <IconHome className={styles.navIcon} />
            <span>Home</span>
          </Link>
          <Link
            to="/explore"
            className={isExplore ? styles.navBtnActive : styles.navBtn}
            aria-current={isExplore ? 'page' : undefined}
          >
            <IconExplore className={styles.navIcon} />
            <span>Explore</span>
          </Link>
          <Link
            to="/trips"
            className={isTrips ? styles.navBtnActive : styles.navBtn}
            aria-current={isTrips ? 'page' : undefined}
          >
            <IconTrips className={styles.navIcon} />
            <span>My trips</span>
          </Link>
        </nav>
      </header>

      <main id="main">
        <Suspense fallback={<div className={styles.pageLoading} aria-live="polite">Loading…</div>}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                userCountry={userCountry}
                tripCount={trips.length}
                onNavigate={(viewName, payload) => {
                  if (viewName === 'explore') {
                    const country = payload?.initialCountry
                    navigate(country ? `/explore/${encodeURIComponent(country)}` : '/explore')
                  } else if (viewName === 'trips') {
                    navigate('/trips')
                  }
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
                  navigate('/trips')
                }}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <Explore
                trips={trips}
                onAddDestinationToTrip={addDestinationToTrip}
                onCreateTrip={createTrip}
                initialCountry={null}
                onClearInitialCountry={() => {}}
              />
            }
          />
          <Route
            path="/explore/:country"
            element={
              <Explore
                trips={trips}
                onAddDestinationToTrip={addDestinationToTrip}
                onCreateTrip={createTrip}
                initialCountryFromUrl
                onClearInitialCountry={() => {}}
              />
            }
          />
          <Route
            path="/trips"
            element={
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
                      <p><strong>No trips yet.</strong> Create a trip with the button above, or explore destinations and add places—you’ll be prompted to create a trip.</p>
                      <Link to="/explore" className={styles.primaryBtn}>Explore destinations</Link>
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
            }
          />
          <Route
            path="/admin"
            element={<AdminPanel onExit={() => navigate('/')} />}
          />
        </Routes>
        </Suspense>
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerTagline}>No account needed to use this site. Made for the traveling community.</p>
        {siteViews != null && (
          <p className={styles.footerViews}>Total visits: <span className={styles.footerViewsCount}>{siteViews.toLocaleString()}</span></p>
        )}
        <Link to="/admin" className={styles.adminLink}>Admin</Link>
      </footer>
    </div>
  )
}

export default App
