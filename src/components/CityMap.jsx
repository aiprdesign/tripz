import { useState, useMemo } from 'react'
import { ComposableMap, Marker } from 'react-simple-maps'
import { getCityDestinations } from '../data/cityDestinations'
import { categoryNames } from '../data/destinationsByCategory'
import { CategoryIcon } from './Icons'
import styles from './CityMap.module.css'

export default function CityMap({ cityName, countryName, onAddToTrip }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const allPois = useMemo(() => getCityDestinations(cityName, countryName), [cityName, countryName])

  const pois = useMemo(() => {
    if (!selectedCategories || selectedCategories.length === 0) return allPois
    return allPois.filter(
      (poi) => poi.categories && selectedCategories.some((c) => poi.categories.includes(c))
    )
  }, [allPois, selectedCategories])

  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }
  const hasFilter = selectedCategories.length > 0

  if (!allPois.length) return null

  const center = pois.length
    ? [
        pois.reduce((s, p) => s + p.lng, 0) / pois.length,
        pois.reduce((s, p) => s + p.lat, 0) / pois.length,
      ]
    : [allPois[0].lng, allPois[0].lat]
  const scale = 12000 + Math.max(0, 15 - pois.length) * 500

  return (
    <div className={styles.wrap}>
      <div className={styles.filterRow}>
        <span className={styles.filterLabel}>Filter by category (select one or more):</span>
        <div className={styles.categoryChips}>
          {categoryNames.map((cat) => (
            <button
              key={cat}
              type="button"
              className={selectedCategories.includes(cat) ? styles.categoryChipActive : styles.categoryChip}
              onClick={() => toggleCategory(cat)}
              aria-pressed={selectedCategories.includes(cat)}
            >
              <CategoryIcon categoryName={cat} className={styles.categoryChipIcon} />
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>
      <p className={styles.hint}>
        Top destinations in {cityName}. Click a marker to add to your trip.
        {hasFilter && ` Showing ${pois.length} in ${selectedCategories.join(' + ')}.`}
      </p>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: center,
          scale: scale,
        }}
        className={styles.map}
      >
        {pois.map((poi) => (
          <Marker key={poi.name} coordinates={[poi.lng, poi.lat]}>
            <g
              className={styles.marker}
              onClick={() => onAddToTrip(`${poi.name}, ${cityName}, ${countryName}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onAddToTrip(`${poi.name}, ${cityName}, ${countryName}`)}
            >
              <circle r={5} fill="var(--accent)" stroke="var(--bg)" strokeWidth={1.5} />
              <text y={12} textAnchor="middle" className={styles.markerLabel} fontSize={4} fill="var(--text)">
                {poi.name}
              </text>
              <title>{poi.name}</title>
            </g>
          </Marker>
        ))}
      </ComposableMap>
      <div className={styles.poiList}>
        {pois.map((poi) => (
          <button
            key={poi.name}
            type="button"
            className={styles.poiChip}
            onClick={() => onAddToTrip(`${poi.name}, ${cityName}, ${countryName}`)}
          >
            <span className={styles.poiName}>{poi.name}</span>
            {poi.categories && poi.categories.length > 0 && (
              <span className={styles.poiCats}>{poi.categories.slice(0, 2).join(' · ')}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
