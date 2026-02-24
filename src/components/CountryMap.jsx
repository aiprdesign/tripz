import { useState, useEffect, useRef, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { feature } from 'topojson-client'
import { ourCountryToTopoName } from '../data/mapCountryToGuide'
import { getCountryDestinationsWithCoords } from '../data/destinationCoordinates'
import styles from './CountryMap.module.css'

const MAP_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'
const MIN_ZOOM = 0.5
const MAX_ZOOM = 3
const ZOOM_STEP = 0.25

export default function CountryMap({ countryName, onAddToTrip, filterCities, mustSeeCities }) {
  const [geographyData, setGeographyData] = useState(null)
  const [zoom, setZoom] = useState(1)
  const [pan, setPan] = useState([0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0, pan: [0, 0] })
  const wrapRef = useRef(null)

  const allDestinations = getCountryDestinationsWithCoords(countryName)
  const destinations = filterCities?.length
    ? allDestinations.filter((d) => filterCities.includes(d.city))
    : allDestinations
  const mustSet = new Set(mustSeeCities || [])

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

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const onWheel = (e) => {
      const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP
      setZoom((z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z + delta)))
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  const handleMouseDown = useCallback((e) => {
    if (e.button !== 0) return
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY, pan: [...pan] }
  }, [pan])

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return
      setPan([
        dragStart.current.pan[0] + e.clientX - dragStart.current.x,
        dragStart.current.pan[1] + e.clientY - dragStart.current.y,
      ])
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => setIsDragging(false), [])
  const handleMouseLeave = useCallback(() => setIsDragging(false), [])

  useEffect(() => {
    if (!isDragging) return
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const zoomIn = () => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))
  const zoomOut = () => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))
  const resetView = () => {
    setZoom(1)
    setPan([0, 0])
  }

  if (!geographyData || destinations.length === 0) return null

  const center = [
    destinations.reduce((s, d) => s + d.coordinates[0], 0) / destinations.length,
    destinations.reduce((s, d) => s + d.coordinates[1], 0) / destinations.length,
  ]
  const scale = 400 + Math.max(0, 15 - destinations.length) * 80

  return (
    <div className={styles.wrap}>
      <p className={styles.hint}>
        Scroll or use ± to zoom; drag to pan. Click a marker to add that destination to your trip. Must-see places are highlighted with a star.
      </p>
      <div className={styles.mapControls}>
        <button type="button" className={styles.mapControlBtn} onClick={zoomIn} aria-label="Zoom in">+</button>
        <button type="button" className={styles.mapControlBtn} onClick={zoomOut} aria-label="Zoom out">−</button>
        <button type="button" className={styles.mapControlBtn} onClick={resetView} aria-label="Reset map view">Reset</button>
      </div>
      <div
        ref={wrapRef}
        className={styles.mapZoomWrap}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className={styles.mapPanZoom}
          style={{
            transform: `translate(${pan[0]}px, ${pan[1]}px) scale(${zoom})`,
            transformOrigin: '50% 50%',
          }}
        >
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
            {destinations.map((d) => {
              const isMustSee = mustSet.has(d.city)
              return (
                <Marker key={d.label} coordinates={d.coordinates}>
                  <g
                    className={isMustSee ? `${styles.marker} ${styles.markerMustSee}` : styles.marker}
                    onClick={() => onAddToTrip(d.label)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && onAddToTrip(d.label)}
                  >
                    {isMustSee && (
                      <text y={-10} textAnchor="middle" className={styles.markerMustLabel} fontSize={6} fill="var(--accent)">★ Must see</text>
                    )}
                    <circle r={isMustSee ? 8 : 6} fill="var(--accent)" stroke="var(--bg)" strokeWidth={isMustSee ? 2 : 1.5} />
                    <text y={isMustSee ? 18 : 14} textAnchor="middle" className={styles.markerLabel} fontSize={5} fill="var(--text)">
                      {d.city}
                    </text>
                    <title>{d.label}{isMustSee ? ' (Must see)' : ''}</title>
                  </g>
                </Marker>
              )
            })}
          </ComposableMap>
        </div>
      </div>
    </div>
  )
}
