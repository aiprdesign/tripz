import { useState, useEffect } from 'react'
import styles from './DestinationImageSlideshow.module.css'

const DEFAULT_INTERVAL_MS = 4500

/**
 * Rotating slideshow for destination images. Cycles through urls so images stay fresh.
 * Uses two layers for crossfade when multiple URLs are provided.
 */
export default function DestinationImageSlideshow({
  urls,
  intervalMs = DEFAULT_INTERVAL_MS,
  className = '',
  style = {},
  ariaLabel,
}) {
  const [index, setIndex] = useState(0)
  const list = Array.isArray(urls) && urls.length > 0 ? urls : ['']
  const n = list.length

  useEffect(() => {
    if (n <= 1) return
    const id = setInterval(() => setIndex((i) => i + 1), intervalMs)
    return () => clearInterval(id)
  }, [n, intervalMs])

  const currentUrl = list[index % n]
  const showFirst = index % 2 === 0
  const url0 = showFirst ? list[index % n] : list[(index + 1) % n]
  const url1 = showFirst ? list[(index + 1) % n] : list[index % n]

  return (
    <div
      className={`${styles.slideshow} ${className}`.trim()}
      style={style}
      role="img"
      aria-label={ariaLabel || 'Destination image slideshow'}
    >
      {n === 1 ? (
        <span
          className={styles.slide}
          style={{ backgroundImage: currentUrl ? `url(${currentUrl})` : undefined, opacity: 1 }}
          aria-hidden="true"
        />
      ) : (
        <>
          <span
            className={`${styles.slide} ${showFirst ? styles.slideVisible : ''}`}
            style={{ backgroundImage: url0 ? `url(${url0})` : undefined }}
            aria-hidden="true"
          />
          <span
            className={`${styles.slide} ${!showFirst ? styles.slideVisible : ''}`}
            style={{ backgroundImage: url1 ? `url(${url1})` : undefined }}
            aria-hidden="true"
          />
        </>
      )}
    </div>
  )
}
