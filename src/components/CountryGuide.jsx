import { useState, useMemo, useEffect } from 'react'
import { getCountryGuide } from '../data/countryGuides'
import { getCountryImageUrl, getDestinationImageSlideshowUrlsForCity } from '../data/destinationImages'
import DestinationImageSlideshow from './DestinationImageSlideshow'
import { getCategoriesForDestination, categoryNames, matchesAnyCategory } from '../data/destinationsByCategory'
import { getCitiesWithDestinations } from '../data/cityDestinations'
import { CategoryIcon } from './Icons'
import { getStatesForCountry, getCitiesInState } from '../data/stateRegions'
import CountryMap from './CountryMap'
import CityMap from './CityMap'
import styles from './CountryGuide.module.css'

const PRIORITY_ALL = 'all'
const PRIORITY_MUST = 'must'
const PRIORITY_RECOMMENDED = 'recommended'
const PRIORITY_IF_TIME = 'ifTime'

function DestCard({ city, country, onAddToTrip, onShowCityDetail, tier }) {
  const label = `${city}, ${country}`
  return (
    <div
      className={styles.highlightCard}
      onClick={() => onShowCityDetail?.(city, country)}
      onKeyDown={(e) => e.key === 'Enter' && onShowCityDetail?.(city, country)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${city}`}
    >
      {tier && <span className={styles.tierBadge} data-tier={tier}>{tier === 'must' ? 'Must visit' : tier === 'recommended' ? 'Recommended' : 'If time'}</span>}
      <DestinationImageSlideshow
        urls={getDestinationImageSlideshowUrlsForCity(city, country)}
        intervalMs={5000}
        className={styles.highlightImg}
        ariaLabel={`${city}, ${country}`}
      />
      <div className={styles.highlightInfo}>
        <span className={styles.highlightCity}>{city}</span>
        <button
          type="button"
          className={styles.addBtn}
          onClick={(e) => {
            e.stopPropagation()
            onAddToTrip(label)
          }}
        >
          Add to trip
        </button>
      </div>
    </div>
  )
}

function getTier(city, guide) {
  if (guide.mustVisit.includes(city)) return 'must'
  if (guide.recommended.includes(city)) return 'recommended'
  if (guide.ifTime.includes(city)) return 'ifTime'
  return null
}

function matchesCategory(city, country, selectedCategories) {
  if (!selectedCategories || selectedCategories.length === 0) return true
  return matchesAnyCategory(city, country, selectedCategories)
}

export default function CountryGuide({ countryName, onBack, onAddToTrip, onShowCityDetail }) {
  const [priorityFilter, setPriorityFilter] = useState(PRIORITY_ALL)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [stateFilter, setStateFilter] = useState('')
  const [selectedCityForMap, setSelectedCityForMap] = useState('')
  const guide = getCountryGuide(countryName)
  const heroUrl = getCountryImageUrl(countryName, { width: 800, height: 360 })
  const statesForCountry = useMemo(() => getStatesForCountry(guide.country), [guide.country])
  const citiesInSelectedState = stateFilter ? getCitiesInState(guide.country, stateFilter) : []
  const citiesWithPois = useMemo(
    () => getCitiesWithDestinations().filter((c) => c.country === guide.country),
    [guide.country]
  )
  const selectedCity = citiesWithPois.find((c) => c.city === selectedCityForMap) || citiesWithPois[0]
  useEffect(() => {
    if (citiesWithPois.length > 0)
      setSelectedCityForMap((prev) => (citiesWithPois.some((c) => c.city === prev) ? prev : citiesWithPois[0].city))
  }, [guide.country, citiesWithPois])

  const filteredMustVisit = useMemo(
    () => guide.mustVisit.filter((city) => matchesCategory(city, guide.country, selectedCategories)),
    [guide.mustVisit, guide.country, selectedCategories]
  )
  const filteredRecommended = useMemo(
    () => guide.recommended.filter((city) => matchesCategory(city, guide.country, selectedCategories)),
    [guide.recommended, guide.country, selectedCategories]
  )
  const filteredIfTime = useMemo(
    () => guide.ifTime.filter((city) => matchesCategory(city, guide.country, selectedCategories)),
    [guide.ifTime, guide.country, selectedCategories]
  )
  const filteredAllDestinations = useMemo(() => {
    let list = guide.allDestinations
    if (priorityFilter === PRIORITY_MUST) list = guide.mustVisit
    else if (priorityFilter === PRIORITY_RECOMMENDED) list = guide.recommended
    else if (priorityFilter === PRIORITY_IF_TIME) list = guide.ifTime
    list = list.filter((city) => matchesCategory(city, guide.country, selectedCategories))
    if (stateFilter && citiesInSelectedState.length > 0)
      list = list.filter((city) => citiesInSelectedState.includes(city))
    return list
  }, [guide, priorityFilter, selectedCategories, stateFilter, citiesInSelectedState])

  const toggleTypeCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }
  const hasTypeFilter = selectedCategories.length > 0

  const showMust = priorityFilter === PRIORITY_ALL || priorityFilter === PRIORITY_MUST
  const showRecommended = priorityFilter === PRIORITY_ALL || priorityFilter === PRIORITY_RECOMMENDED
  const showIfTime = priorityFilter === PRIORITY_ALL || priorityFilter === PRIORITY_IF_TIME

  return (
    <div className={styles.wrap}>
      <button type="button" className={styles.backBtn} onClick={onBack}>
        ← Back to explore
      </button>
      <div className={styles.hero} style={{ backgroundImage: `url(${heroUrl})` }}>
        <div className={styles.heroOverlay} />
        <h1 className={styles.countryName}>{guide.country}</h1>
        <p className={styles.heroBlurb}>{guide.blurb}</p>
      </div>

      <div className={styles.content}>
        <div className={styles.tipBanner}>
          <strong>Tip:</strong> Click any place card to see costs, things to avoid, and add it to a trip. Use the filters above to narrow by priority or type (e.g. temples, beaches).
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Priority:</span>
            <div className={styles.filterChips}>
              {[
                [PRIORITY_ALL, 'All'],
                [PRIORITY_MUST, 'Must visit'],
                [PRIORITY_RECOMMENDED, 'Highly recommended'],
                [PRIORITY_IF_TIME, 'If you have time'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={priorityFilter === value ? styles.filterChipActive : styles.filterChip}
                  onClick={() => setPriorityFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>Type of place (select one or more):</span>
            <div className={styles.filterTypeChips}>
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={selectedCategories.includes(cat) ? styles.filterTypeChipActive : styles.filterTypeChip}
                  onClick={() => toggleTypeCategory(cat)}
                  aria-pressed={selectedCategories.includes(cat)}
                >
                  <CategoryIcon categoryName={cat} className={styles.filterTypeChipIcon} />
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>
          {statesForCountry.length > 0 && (
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>State / Region:</span>
              <select
                value={stateFilter}
                onChange={(e) => setStateFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">All {guide.country}</option>
                {statesForCountry.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>When to go</h2>
          <p className={styles.sectionBody}>{guide.bestTime}</p>
        </section>

        {showMust && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Must visit — don’t skip these</h2>
            <p className={styles.sectionIntro}>If you’re limited on time, prioritise these. They define {guide.country}.</p>
            <div className={styles.highlightGrid}>
              {filteredMustVisit.map((city) => (
                <DestCard
                  key={city}
                  city={city}
                  country={guide.country}
                  onAddToTrip={onAddToTrip}
                  onShowCityDetail={onShowCityDetail}
                  tier="must"
                />
              ))}
            </div>
          </section>
        )}

        {showRecommended && filteredRecommended.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Highly recommended</h2>
            <p className={styles.sectionIntro}>Worth it if you have a few more days.</p>
            <div className={styles.highlightGrid}>
              {filteredRecommended.map((city) => (
                <DestCard
                  key={city}
                  city={city}
                  country={guide.country}
                  onAddToTrip={onAddToTrip}
                  onShowCityDetail={onShowCityDetail}
                  tier="recommended"
                />
              ))}
            </div>
          </section>
        )}

        {showIfTime && filteredIfTime.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>If you have more time</h2>
            <p className={styles.sectionIntro}>Can skip if limited time. Great additions for longer trips.</p>
            <div className={styles.destGrid}>
              {filteredIfTime.map((city) => (
                <button
                  key={city}
                  type="button"
                  className={styles.destChip}
                  onClick={() => onShowCityDetail?.(city, guide.country)}
                >
                  <DestinationImageSlideshow
                    urls={getDestinationImageSlideshowUrlsForCity(city, guide.country)}
                    intervalMs={5000}
                    className={styles.destChipImg}
                    ariaLabel={`${city}, ${guide.country}`}
                  />
                  <span className={styles.destChipLabel}>{city}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>All destinations on the map</h2>
          <p className={styles.sectionIntro}>
            Real map of {guide.country}. Click a marker to add that place to your trip.
            {(priorityFilter !== PRIORITY_ALL || hasTypeFilter) && ' (filtered)'}
          </p>
          <CountryMap
            countryName={guide.country}
            onAddToTrip={onAddToTrip}
            filterCities={filteredAllDestinations.length !== guide.allDestinations.length ? filteredAllDestinations : undefined}
          />
          <div className={styles.pinList}>
            {filteredAllDestinations.map((city) => (
              <button
                key={city}
                type="button"
                className={styles.mapPin}
                onClick={() => onShowCityDetail?.(city, guide.country)}
                title={`View details: ${city}, ${guide.country}`}
              >
                <span className={styles.mapPinDot} />
                <span className={styles.mapPinLabel}>{city}</span>
                {getTier(city, guide) && (
                  <span className={styles.mapPinTier} data-tier={getTier(city, guide)}>
                    {getTier(city, guide) === 'must' ? 'Must' : getTier(city, guide) === 'recommended' ? '★' : 'Optional'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {citiesWithPois.length > 0 && selectedCity && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Top destinations in a city (on map)</h2>
            <p className={styles.sectionIntro}>
              Pick a city to see its top spots on the map. Sort by category to filter.
            </p>
            <label className={styles.cityMapLabel}>
              City
              <select
                value={selectedCity.city}
                onChange={(e) => setSelectedCityForMap(e.target.value)}
                className={styles.cityMapSelect}
              >
                {citiesWithPois.map((c) => (
                  <option key={c.label} value={c.city}>{c.city}</option>
                ))}
              </select>
            </label>
            <CityMap
              cityName={selectedCity.city}
              countryName={selectedCity.country}
              onAddToTrip={onAddToTrip}
            />
          </section>
        )}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experiences to have</h2>
          <p className={styles.sectionIntro}>What to see, do, and feel in {guide.country}</p>
          <ul className={styles.experienceList}>
            {guide.experiences.map((exp, i) => (
              <li key={i} className={styles.experienceItem}>
                <span className={styles.experienceBullet}>◦</span>
                {exp}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
