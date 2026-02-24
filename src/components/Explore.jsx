import { useState, useEffect } from 'react'
import { countryNames } from '../data/destinationsByCountry'
import { getDestinationsForCategories, categoryNames } from '../data/destinationsByCategory'
import { getCountryImageUrl, getDestinationImageUrlForCity } from '../data/destinationImages'
import { CategoryIcon } from './Icons'
import WorldMap from './WorldMap'
import CountryGuide from './CountryGuide'
import AddToTripModal from './AddToTripModal'
import CityDetailModal from './CityDetailModal'
import LocationMapView from './LocationMapView'
import styles from './Explore.module.css'

export default function Explore({ trips, onAddDestinationToTrip, onCreateTrip, initialCountry, onClearInitialCountry }) {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedCityDetail, setSelectedCityDetail] = useState(null)
  const [addToTripFor, setAddToTripFor] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [toast, setToast] = useState(null)
  const filteredCountries = countryNames.filter((c) =>
    c.toLowerCase().includes((searchQuery || '').toLowerCase().trim())
  )
  const allWorldDestinations = getDestinationsForCategories(categoryNames)
  const categoryDestinations = selectedCategories.length > 0 ? getDestinationsForCategories(selectedCategories) : allWorldDestinations
  const categoryDestinationsFiltered = searchQuery.trim()
    ? categoryDestinations.filter(
        (d) =>
          d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryDestinations

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }
  const clearCategories = () => setSelectedCategories([])
  const hasCategoryFilter = selectedCategories.length > 0

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2800)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    if (initialCountry) {
      setSelectedCountry(initialCountry)
      onClearInitialCountry?.()
    }
  }, [initialCountry, onClearInitialCountry])

  const handleAddToTrip = (destinationName) => {
    setAddToTripFor(destinationName)
  }

  const handleAddToTripConfirm = (tripId, destinationName) => {
    onAddDestinationToTrip(tripId, destinationName)
    setAddToTripFor(null)
  }

  const handleAdded = (destinationName, tripName) => {
    setToast({ message: `Added to ${tripName}`, destination: destinationName })
  }

  const handleCreateTrip = (tripData) => {
    const newTrip = onCreateTrip(tripData)
    return newTrip
  }

  const openCityDetail = (city, country) => setSelectedCityDetail({ city, country })
  const closeCityDetail = () => setSelectedCityDetail(null)
  const handleCityDetailAddToTrip = (label) => {
    setSelectedCityDetail(null)
    setAddToTripFor(label)
  }
  const handleCityDetailExploreCountry = (country) => {
    setSelectedCityDetail(null)
    setSelectedCountry(country)
  }

  if (selectedCountry) {
    return (
      <>
        <CountryGuide
          countryName={selectedCountry}
          onBack={() => setSelectedCountry(null)}
          onAddToTrip={handleAddToTrip}
          onShowCityDetail={openCityDetail}
        />
        {selectedCityDetail && (
          <CityDetailModal
            city={selectedCityDetail.city}
            country={selectedCityDetail.country}
            onClose={closeCityDetail}
            onAddToTrip={handleCityDetailAddToTrip}
            onExploreCountry={handleCityDetailExploreCountry}
          />
        )}
        {addToTripFor && (
          <AddToTripModal
            destinationName={addToTripFor}
            trips={trips}
            onAddToTrip={handleAddToTripConfirm}
            onCreateTrip={handleCreateTrip}
            onClose={() => setAddToTripFor(null)}
            onAdded={handleAdded}
          />
        )}
        {toast && (
          <div className={styles.toast} role="status">
            ✓ {toast.message}
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Explore destinations</h2>
        <p className={styles.heroSubtitle}>
          Use the map to click a country, or search and filter below. Click any destination card to see costs, tips, and add it to a trip.
        </p>
      </div>
      <WorldMap onSelectCountry={setSelectedCountry} />
      <LocationMapView onAddToTrip={handleAddToTrip} />
      <div className={styles.searchRow}>
        <label className={styles.searchLabel} htmlFor="explore-search">
          Search by country or city name
        </label>
        <input
          id="explore-search"
          type="text"
          placeholder="e.g. Japan, Paris, Bali..."
          className={styles.searchInput}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-describedby="explore-search-hint"
        />
        <span id="explore-search-hint" className={styles.searchHint}>Results update as you type.</span>
      </div>
      <div className={styles.sortSection}>
        <span className={styles.sortLabel} id="explore-category-label">Filter by type of place (select one or more)</span>
        <div className={styles.sortChips}>
          <button
            type="button"
            className={!hasCategoryFilter ? styles.sortChipActive : styles.sortChip}
            onClick={clearCategories}
          >
            <span className={styles.sortChipIcon} aria-hidden>◆</span>
            <span>All</span>
          </button>
          {categoryNames.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategories.includes(cat) ? styles.sortChipActive : styles.sortChip}
              onClick={() => toggleCategory(cat)}
              aria-pressed={selectedCategories.includes(cat)}
              aria-labelledby="explore-category-label"
            >
              <CategoryIcon categoryName={cat} className={styles.sortChipIcon} />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={styles.gridLabel}>Pick a country</p>
      <p className={styles.gridLabelHint}>Click a card to open that country’s guide and top places.</p>
      <div className={styles.countryGrid}>
        {filteredCountries.map((country) => (
          <button
            key={country}
            type="button"
            className={styles.countryCard}
            onClick={() => setSelectedCountry(country)}
          >
            <div
              className={styles.countryCardImg}
              style={{ backgroundImage: `url(${getCountryImageUrl(country, { width: 400, height: 220 })})` }}
            />
            <span className={styles.countryCardName}>{country}</span>
          </button>
        ))}
      </div>
      <p className={styles.gridLabel}>
        {hasCategoryFilter
          ? `${categoryDestinationsFiltered.length} place${categoryDestinationsFiltered.length !== 1 ? 's' : ''} (${selectedCategories.join(' + ')})`
          : `All destinations (${categoryDestinationsFiltered.length})`}
      </p>
      <p className={styles.gridLabelHint}>Click a card to see costs, currency, things to avoid, and add to your trip.</p>
      <div className={styles.destGrid}>
        {categoryDestinationsFiltered.map(({ city, country, label }) => (
          <button
            key={label}
            type="button"
            className={styles.destChip}
            onClick={() => openCityDetail(city, country)}
          >
            <span
              className={styles.destChipImg}
              style={{ backgroundImage: `url(${getDestinationImageUrlForCity(city, country)})` }}
            />
            <span className={styles.destChipLabel}>{city}</span>
            <span className={styles.destChipCountry}>{country}</span>
          </button>
        ))}
      </div>
      {selectedCityDetail && (
        <CityDetailModal
          city={selectedCityDetail.city}
          country={selectedCityDetail.country}
          onClose={closeCityDetail}
          onAddToTrip={handleCityDetailAddToTrip}
          onExploreCountry={handleCityDetailExploreCountry}
        />
      )}
      {addToTripFor && (
        <AddToTripModal
          destinationName={addToTripFor}
          trips={trips}
          onAddToTrip={handleAddToTripConfirm}
          onCreateTrip={handleCreateTrip}
          onClose={() => setAddToTripFor(null)}
          onAdded={handleAdded}
        />
      )}
      {toast && (
        <div className={styles.toast} role="status">
          ✓ {toast.message}
        </div>
      )}
    </>
  )
}
