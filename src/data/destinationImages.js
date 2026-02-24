// Royalty-free destination images from Pexels (https://www.pexels.com).
// License: Pexels License - free for personal and commercial use, no attribution required.
// Set VITE_PEXELS_API_KEY in .env to fetch Pexels photos for any city (optional).
// Fallback: Picsum for any unmapped destination.

import { getCachedPexelsId, pexelsUrlFromId } from './pexelsApi'

const PEXELS_BASE = 'https://images.pexels.com/photos'
const PEXELS_PARAMS = '?auto=compress&cs=tinysrgb&fit=crop'

function pexelsUrl(photoId, width = 400, height = 300) {
  return `${PEXELS_BASE}/${photoId}/pexels-photo-${photoId}.jpeg${PEXELS_PARAMS}&w=${width}&h=${height}`
}

// Pexels photo IDs for destinations (royalty-free, from pexels.com).
// Format: 'City, Country' or 'Country' -> numeric photo ID.
const pexelsPhotoIds = {
  // Cities
  'Paris, France': 2265845,
  'London, United Kingdom': 1519088,
  'Tokyo, Japan': 5363400,
  'New York, United States': 1486919,
  'Rome, Italy': 2674159,
  'Barcelona, Spain': 1388030,
  'Amsterdam, Netherlands': 1450353,
  'Singapore': 2719318,
  'Dubai, United Arab Emirates': 2044434,
  'Venice, Italy': 2578780,
  'Prague, Czech Republic': 1785493,
  'Istanbul, Turkey': 1770313,
  'Sydney, Australia': 1545526,
  'Madrid, Spain': 3250614,
  'Florence, Italy': 2225457,
  'Vienna, Austria': 2772125,
  'Berlin, Germany': 1107717,
  'Athens, Greece': 2413256,
  'Lisbon, Portugal': 1325735,
  'Hong Kong, China': 2506927,
  'Bangkok, Thailand': 1450354,
  'Seoul, South Korea': 2372110,
  'Cape Town, South Africa': 2087397,
  'Toronto, Canada': 1591447,
  'San Francisco, United States': 1510599,
  'Los Angeles, United States': 1199951,
  'Mumbai, India': 2595805,
  'Kyoto, Japan': 2088666,
  'Santorini, Greece': 1029592,
  'Marrakech, Morocco': 2595806,
  'Reykjavik, Iceland': 3582138,
  'Edinburgh, United Kingdom': 3552945,
  'Budapest, Hungary': 1785494,
  'Krakow, Poland': 1785495,
  'Munich, Germany': 1643363,
  'Nice, France': 1797192,
  'Rio de Janeiro, Brazil': 1823680,
  'Mexico City, Mexico': 2523958,
  'Cairo, Egypt': 3250638,
  'Machu Picchu, Peru': 3571091,
  'Hanoi, Vietnam': 2905236,
  'Bali, Indonesia': 2491273,
  'Phuket, Thailand': 1450355,
  'Bruges, Belgium': 3552946,
  'Copenhagen, Denmark': 2413063,
  'Stockholm, Sweden': 261102,
  'Oslo, Norway': 3582139,
  'Helsinki, Finland': 3250639,
  'Dublin, Ireland': 3552947,
  'Zurich, Switzerland': 2584474,
  'Interlaken, Switzerland': 2584475,
  'Granada, Spain': 3250614,
  'Mont Saint-Michel, France': 2674160,
  'Porto, Portugal': 1325736,
  'Queenstown, New Zealand': 3571092,
  'Melbourne, Australia': 1545527,
  'Cancún, Mexico': 2523959,
  'Tulum, Mexico': 2523960,
  'Cusco, Peru': 3571091,
  'Cartagena, Colombia': 2595807,
  // Countries (for hero / country cards)
  France: 2265845,
  Japan: 5363400,
  Italy: 2674159,
  Spain: 1388030,
  'United Kingdom': 1519088,
  Thailand: 1450354,
  Greece: 2413256,
  Portugal: 1325735,
  Iceland: 3582138,
  Australia: 1545526,
  Mexico: 2523958,
  Peru: 3571091,
  'New Zealand': 3571092,
  Vietnam: 2905236,
  Morocco: 2595806,
  India: 2595805,
  'United States': 1486919,
  Canada: 1591447,
  Turkey: 1770313,
  Egypt: 3250638,
  'South Africa': 2087397,
  Netherlands: 1450353,
  Germany: 1107717,
  Austria: 2772125,
  Switzerland: 2584474,
  Brazil: 1823680,
  Indonesia: 2491273,
  China: 2506927,
  'South Korea': 2372110,
  Ireland: 3552947,
  Norway: 3582139,
  Sweden: 261102,
  Poland: 1785495,
  'Czech Republic': 1785493,
  Hungary: 1785494,
  Belgium: 3552946,
  Denmark: 2413063,
  Finland: 3250639,
  Malaysia: 2491274,
  Philippines: 2491275,
  Jordan: 3250644,
  Kenya: 2087398,
  Colombia: 2595807,
  'United Arab Emirates': 2044434,
}

/**
 * Returns image URL for a destination (e.g. "Paris, France" or custom name).
 * Uses Pexels (static map or cached from API); Picsum as fallback.
 */
export function getDestinationImageUrl(name, options = {}) {
  const { width = 400, height = 300 } = options
  const key = (name || '').trim()
  const staticId = pexelsPhotoIds[key]
  if (staticId) return pexelsUrl(staticId, width, height)
  const cachedId = getCachedPexelsId(key)
  if (cachedId) return pexelsUrlFromId(cachedId, width, height)
  const seed = encodeURIComponent(key || 'travel')
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

export function getDestinationImageUrlForCity(city, country) {
  return getDestinationImageUrl(`${city}, ${country}`)
}

/** Hero/cover image for a country (e.g. Explore country card or guide header) */
export function getCountryImageUrl(countryName, options = {}) {
  const { width = 720, height = 320 } = options
  const key = (countryName || '').trim()
  const id = pexelsPhotoIds[key]
  if (id) {
    return pexelsUrl(id, width, height)
  }
  const seed = encodeURIComponent(key || 'world')
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}
