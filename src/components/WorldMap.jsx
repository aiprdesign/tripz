import { useState, useEffect, useRef, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { feature } from 'topojson-client'
import { topoNameToOurCountry } from '../data/mapCountryToGuide'
import { getAllDestinationsWithCoords } from '../data/destinationCoordinates'
import styles from './WorldMap.module.css'

const allDestinationsWithCoords = getAllDestinationsWithCoords()

const MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const WORLD_VIEW = { scale: 140, center: [0, 20] }
const MIN_SCALE = 80
const MAX_SCALE = 600
const ZOOM_STEP = 40
const COUNTRY_ZOOM_SCALE = 380

/** Get centroid [lng, lat] from a GeoJSON geometry */
function getGeoCenter(geometry) {
  let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity
  function add(coord) {
    const [lng, lat] = coord
    minLng = Math.min(minLng, lng); maxLng = Math.max(maxLng, lng)
    minLat = Math.min(minLat, lat); maxLat = Math.max(maxLat, lat)
  }
  function walk(coords) {
    if (typeof coords[0] === 'number') add(coords)
    else coords.forEach(walk)
  }
  if (geometry?.type === 'Polygon') walk(geometry.coordinates[0])
  else if (geometry?.type === 'MultiPolygon') geometry.coordinates.forEach((p) => walk(p[0]))
  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2]
}

export default function WorldMap({ onSelectCountry }) {
  const [status, setStatus] = useState('loading')
  const [geographyData, setGeographyData] = useState(null)
  const [scale, setScale] = useState(WORLD_VIEW.scale)
  const [center, setCenter] = useState(WORLD_VIEW.center)
  const wrapRef = useRef(null)

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

  const zoomToCountry = useCallback((geo) => {
    const geometry = geo?.geometry
    if (!geometry) return
    const newCenter = getGeoCenter(geometry)
    setCenter(newCenter)
    setScale(COUNTRY_ZOOM_SCALE)
  }, [])

  const handleCountryClick = useCallback(
    (geo, ourCountry) => {
      if (ourCountry) {
        zoomToCountry(geo)
        onSelectCountry(ourCountry)
      }
    },
    [onSelectCountry, zoomToCountry]
  )

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      setScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s + delta)))
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const zoomIn = () => setScale((s) => Math.min(MAX_SCALE, s + ZOOM_STEP))
  const zoomOut = () => setScale((s) => Math.max(MIN_SCALE, s - ZOOM_STEP))
  const resetView = () => {
    setScale(WORLD_VIEW.scale)
    setCenter(WORLD_VIEW.center)
  }

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
      <p className={styles.hint}>
        Click a country to open its guide and zoom the map to it. Use + / − to zoom, or scroll on the map.
      </p>
      <div className={styles.mapControls}>
        <button type="button" className={styles.mapControlBtn} onClick={zoomIn} aria-label="Zoom in">+</button>
        <button type="button" className={styles.mapControlBtn} onClick={zoomOut} aria-label="Zoom out">−</button>
        <button type="button" className={styles.mapControlBtn} onClick={resetView} aria-label="Reset world view">Reset</button>
      </div>
      <div ref={wrapRef} className={styles.mapZoomWrap}>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale,
            center,
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
                    onClick={() => handleCountryClick(geo, ourCountry)}
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
    </div>
  )
}
