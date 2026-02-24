import { useState } from 'react'
import { destinationsByCountry, countryNames } from '../data/destinationsByCountry'
import { getDestinationsForCategories, categoryNames } from '../data/destinationsByCategory'
import { getDestinationImageSlideshowUrls, getDestinationImageSlideshowUrlsForCity } from '../data/destinationImages'
import DestinationImageSlideshow from './DestinationImageSlideshow'
import { IconGlobe, IconCategory, CategoryIcon } from './Icons'
import styles from './DestinationList.module.css'

const BROWSE_BY_COUNTRY = 'country'
const BROWSE_BY_CATEGORY = 'category'

export default function DestinationList({ destinations, onUpdate }) {
  const [newName, setNewName] = useState('')
  const [showBrowse, setShowBrowse] = useState(false)
  const [browseMode, setBrowseMode] = useState(BROWSE_BY_COUNTRY)
  const [selectedCountry, setSelectedCountry] = useState(countryNames[0] || '')
  const [selectedCategories, setSelectedCategories] = useState([])

  const add = (name) => {
    const toAdd = typeof name === 'string' ? name.trim() : newName.trim()
    if (!toAdd) return
    onUpdate([
      ...destinations,
      {
        id: crypto.randomUUID(),
        name: toAdd,
        arrival: '',
        departure: '',
        notes: '',
      },
    ])
    setNewName('')
  }

  const addFromBrowse = (city, country) => {
    add(`${city}, ${country}`)
  }

  const update = (id, updates) => {
    onUpdate(
      destinations.map((d) => (d.id === id ? { ...d, ...updates } : d))
    )
  }

  const remove = (id) => {
    onUpdate(destinations.filter((d) => d.id !== id))
  }

  const cities = selectedCountry ? (destinationsByCountry[selectedCountry] || []) : []
  const categoryDestinations = selectedCategories.length > 0
    ? getDestinationsForCategories(selectedCategories)
    : getDestinationsForCategories(categoryNames)
  const toggleCategory = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Destinations</h3>
      <div className={styles.addRow}>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Add a city or place..."
          className={styles.input}
        />
        <button type="button" className={styles.addBtn} onClick={() => add()}>
          Add
        </button>
      </div>
      <div className={styles.browseRow}>
        <button
          type="button"
          className={styles.browseToggle}
          onClick={() => setShowBrowse((v) => !v)}
        >
          <span className={styles.browseToggleIcon}>{showBrowse ? '▼' : '▶'}</span>
          <span>Browse destinations by country or category</span>
        </button>
      </div>
      {showBrowse && (
        <div className={styles.browsePanel}>
          <div className={styles.browseModeTabs}>
            <button
              type="button"
              className={browseMode === BROWSE_BY_COUNTRY ? styles.modeTabActive : styles.modeTab}
              onClick={() => setBrowseMode(BROWSE_BY_COUNTRY)}
            >
              <IconGlobe className={styles.modeTabIcon} />
              <span>By country</span>
            </button>
            <button
              type="button"
              className={browseMode === BROWSE_BY_CATEGORY ? styles.modeTabActive : styles.modeTab}
              onClick={() => setBrowseMode(BROWSE_BY_CATEGORY)}
            >
              <IconCategory className={styles.modeTabIcon} />
              <span>By category</span>
            </button>
          </div>

          {browseMode === BROWSE_BY_COUNTRY && (
            <>
              <label className={styles.browseLabel}>
                Country
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className={styles.countrySelect}
                >
                  {countryNames.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>
              <div className={styles.cityGrid}>
                {cities.map((city) => (
                  <button
                    key={`${city}-${selectedCountry}`}
                    type="button"
                    className={styles.cityChip}
                    onClick={() => addFromBrowse(city, selectedCountry)}
                  >
                    <DestinationImageSlideshow
                      urls={getDestinationImageSlideshowUrlsForCity(city, selectedCountry)}
                      intervalMs={5000}
                      className={styles.cityChipImg}
                      ariaLabel={`${city}, ${selectedCountry}`}
                    />
                    <span className={styles.cityChipLabel}>{city}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          {browseMode === BROWSE_BY_CATEGORY && (
            <>
              <div className={styles.categoryChipsRow}>
                <span className={styles.browseLabel}>Category (select one or more)</span>
                <div className={styles.categoryChips}>
                  {categoryNames.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={selectedCategories.includes(cat) ? styles.categoryChipActive : styles.categoryChip}
                      onClick={() => toggleCategory(cat)}
                      title={cat}
                      aria-pressed={selectedCategories.includes(cat)}
                    >
                      <CategoryIcon categoryName={cat} className={styles.categoryChipIcon} />
                      <span>{cat}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.cityGrid}>
                {categoryDestinations.map(({ city, country }) => (
                  <button
                    key={`${city}-${country}`}
                    type="button"
                    className={styles.cityChip}
                    onClick={() => addFromBrowse(city, country)}
                  >
                    <DestinationImageSlideshow
                      urls={getDestinationImageSlideshowUrlsForCity(city, country)}
                      intervalMs={5000}
                      className={styles.cityChipImg}
                      ariaLabel={`${city}, ${country}`}
                    />
                    <span className={styles.cityChipLabel}>{city}</span>
                    <span className={styles.cityChipCountry}>{country}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <ul className={styles.list}>
        {destinations.map((d) => (
          <li key={d.id} className={styles.item}>
            <DestinationImageSlideshow
              urls={getDestinationImageSlideshowUrls(d.name)}
              intervalMs={5000}
              className={styles.itemImage}
              ariaLabel={d.name}
            />
            <div className={styles.itemMain}>
              <span className={styles.destName}>{d.name}</span>
              <div className={styles.dates}>
                {d.arrival && <span>Arrive: {d.arrival}</span>}
                {d.departure && <span>Leave: {d.departure}</span>}
              </div>
              {d.notes && (
                <p className={styles.notes}>{d.notes}</p>
              )}
            </div>
            <div className={styles.itemActions}>
              <input
                type="date"
                value={d.arrival || ''}
                onChange={(e) => update(d.id, { arrival: e.target.value })}
                className={styles.dateInput}
                title="Arrival"
              />
              <input
                type="date"
                value={d.departure || ''}
                onChange={(e) => update(d.id, { departure: e.target.value })}
                className={styles.dateInput}
                title="Departure"
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => remove(d.id)}
                title="Remove"
              >
                ×
              </button>
            </div>
          </li>
        ))}
      </ul>
      {destinations.length === 0 && (
        <p className={styles.empty}>No destinations yet.</p>
      )}
    </div>
  )
}
