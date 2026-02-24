import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { feature } from 'topojson-client'
import { ourCountryToTopoName } from '../data/mapCountryToGuide'
import { getCountryDestinationsWithCoords } from '../data/destinationCoordinates'
import styles from './CountryMap.module.css'

const MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function CountryMap({ countryName, onAddToTrip, filterCities }) {
  const [geographyData, setGeographyData] = useState(null)
  const allDestinations = getCountryDestinationsWithCoords(countryName)
  const destinations = filterCities?.length
    ? allDestinations.filter((d) => filterCities.includes(d.city))
    : allDestinations

  useEffect(() => {
    fetch(MAP_URL)
      .then((res) => res.json())
      .then((topology) => {
        const countries = feature(topology, topology.objects.countries)
        const topoName = ourCountryToTopoName(countryName)
        const match = countries.features.find(
          (f) => f.properties?.name === topoName || f.properties?.name === countryName
        )
        if (match) {
          setGeographyData({ type: 'FeatureCollection', features: [match] })
        } else {
          setGeographyData(null)
        }
      })
      .catch(() => setGeographyData(null))
  }, [countryName])

  if (!geographyData || destinations.length === 0) return null

  const center = [
    destinations.reduce((s, d) => s + d.coordinates[0], 0) / destinations.length,
    destinations.reduce((s, d) => s + d.coordinates[1], 0) / destinations.length,
  ]
  const scale = 400 + Math.max(0, 15 - destinations.length) * 80

  return (
    <div className={styles.wrap}>
      <p className={styles.hint}>Click a marker to add that destination to your trip</p>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: center,
          scale: scale,
        }}
        className={styles.map}
      >
        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="var(--surface)"
                stroke="var(--border)"
                strokeWidth={1}
                style={{ default: { outline: 'none' }, hover: { outline: 'none' }, pressed: { outline: 'none' } }}
              />
            ))
          }
        </Geographies>
        {destinations.map((d) => (
          <Marker key={d.label} coordinates={d.coordinates}>
            <g
              className={styles.marker}
              onClick={() => onAddToTrip(d.label)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onAddToTrip(d.label)}
            >
              <circle r={6} fill="var(--accent)" stroke="var(--bg)" strokeWidth={1.5} />
              <text y={14} textAnchor="middle" className={styles.markerLabel} fontSize={5} fill="var(--text)">
                {d.city}
              </text>
              <title>{d.label}</title>
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
