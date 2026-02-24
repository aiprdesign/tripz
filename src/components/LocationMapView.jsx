import { useState, useMemo, useEffect } from 'react'
import { countryNames } from '../data/destinationsByCountry'
import { destinationsByCountry } from '../data/destinationsByCountry'
import { getStatesForCountry, getCitiesInState } from '../data/stateRegions'
import { getCitiesWithDestinations } from '../data/cityDestinations'
import CountryMap from './CountryMap'
import CityMap from './CityMap'
import styles from './LocationMapView.module.css'

const VIEW_COUNTRY = 'country'
const VIEW_STATE = 'state'
const VIEW_CITY = 'city'

export default function LocationMapView({ onAddToTrip }) {
  const [country, setCountry] = useState(countryNames[0] || '')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const states = useMemo(() => getStatesForCountry(country), [country])
  const citiesInState = state ? getCitiesInState(country, state) : []
  const allCitiesInCountry = destinationsByCountry[country] || []
  const citiesWithPois = useMemo(
    () => getCitiesWithDestinations().filter((c) => c.country === country && (!state || getCitiesInState(country, state).includes(c.city))),
    [country, state]
  )

  useEffect(() => {
    setState('')
  }, [country])

  useEffect(() => {
    if (state && states.length > 0 && !states.includes(state)) setState('')
  }, [states, state])

  useEffect(() => {
    setCity('')
  }, [country, state])

  const showStateFilter = states.length > 0
  const showCityFilter = citiesWithPois.length > 0
  const showCityMap = city && citiesWithPois.some((c) => c.city === city)
  const countryMapFilterCities = state && citiesInState.length > 0 ? citiesInState : undefined

  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>See places on a map</h2>
      <p className={styles.intro}>Pick a country, then optionally a state or city. You’ll see pins for each place; click a pin to add it to a trip.</p>
      <div className={styles.controls}>
        <label className={styles.field}>
          <span className={styles.label}>Country</span>
          <select value={country} onChange={(e) => setCountry(e.target.value)} className={styles.select}>
            {countryNames.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>
        {showStateFilter && (
          <label className={styles.field}>
            <span className={styles.label}>State / Region</span>
            <select value={state} onChange={(e) => setState(e.target.value)} className={styles.select}>
              <option value="">All {country}</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
        )}
        {showCityFilter && (
          <label className={styles.field}>
            <span className={styles.label}>City (top spots)</span>
            <select value={city} onChange={(e) => setCity(e.target.value)} className={styles.select}>
              <option value="">— Country / state map —</option>
              {citiesWithPois.map((c) => (
                <option key={c.label} value={c.city}>{c.city}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className={styles.mapWrap}>
        {showCityMap ? (
          <CityMap cityName={city} countryName={country} onAddToTrip={onAddToTrip} />
        ) : (
          <CountryMap
            countryName={country}
            onAddToTrip={onAddToTrip}
            filterCities={countryMapFilterCities}
          />
        )}
      </div>
    </section>
  )
}
