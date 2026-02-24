import { useState, useEffect } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { feature } from 'topojson-client'
import { topoNameToOurCountry } from '../data/mapCountryToGuide'
import { getAllDestinationsWithCoords } from '../data/destinationCoordinates'
import styles from './WorldMap.module.css'

const allDestinationsWithCoords = getAllDestinationsWithCoords()

const MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

export default function WorldMap({ onSelectCountry }) {
  const [status, setStatus] = useState('loading') // 'loading' | 'failed' | 'ready'
  const [geographyData, setGeographyData] = useState(null)

  useEffect(() => {
    setStatus('loading')
    fetch(MAP_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Fetch failed')
        return res.json()
      })
      .then((topology) => {
        if (!topology?.objects?.countries) throw new Error('Invalid data')
        const countries = feature(topology, topology.objects.countries)
        setGeographyData(countries)
        setStatus('ready')
      })
      .catch(() => {
        setGeographyData(null)
        setStatus('failed')
      })
  }, [])

  if (status === 'failed') {
    return (
      <div className={styles.wrap}>
        <p className={styles.hintError}>
          Map couldn’t load (connection or network issue). Use the country list below to explore.
        </p>
      </div>
    )
  }

  if (status === 'loading' || !geographyData) {
    return (
      <div className={styles.wrap}>
        <p className={styles.hint}>Loading world map…</p>
        <div className={styles.mapPlaceholder} />
      </div>
    )
  }

  return (
    <div className={styles.wrap}>
      <p className={styles.hint}>Each dot is a recommended destination. Click a country to open its guide and top places.</p>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [0, 20],
        }}
        className={styles.map}
      >
        <Geographies geography={geographyData}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const topoName = geo.properties?.name
              const ourCountry = topoNameToOurCountry(topoName)
              const isClickable = !!ourCountry
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isClickable ? 'var(--surface)' : 'var(--bg)'}
                  stroke="var(--border)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: 'none' },
                    hover: {
                      fill: isClickable ? 'var(--accent)' : 'var(--surface-hover)',
                      outline: 'none',
                      cursor: isClickable ? 'pointer' : 'default',
                    },
                    pressed: { outline: 'none' },
                  }}
                  onClick={() => {
                    if (ourCountry) onSelectCountry(ourCountry)
                  }}
                />
              )
            })
          }
        </Geographies>
        {allDestinationsWithCoords.map((d) => (
          <Marker key={d.label} coordinates={d.coordinates}>
            <g className={styles.markerGroup}>
              <circle
                r={2.5}
                fill="var(--accent)"
                stroke="var(--bg)"
                strokeWidth={0.5}
                className={styles.destMarker}
              />
              <text y={6} textAnchor="middle" className={styles.markerLabel} fontSize={2.2} fill="var(--text)">
                {d.city}
              </text>
            </g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}
