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
  // Popular & cities
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
  // Temples & religious
  'Bagan, Myanmar': 2404942,
  'Angkor Wat, Cambodia': 2687150,
  'Varanasi, India': 2595805,
  'Borobudur, Indonesia': 2491273,
  'Jerusalem, Israel': 3261822,
  'Nara, Japan': 2088666,
  'Golden Temple (Amritsar), India': 2595805,
  'Meteora, Greece': 2413256,
  'Ephesus, Turkey': 1770313,
  'Petra, Jordan': 3250644,
  'Santiago de Compostela, Spain': 3250614,
  'Ayutthaya, Thailand': 1450354,
  'Siem Reap, Cambodia': 2687150,
  // Castles & palaces
  'Neuschwanstein, Germany': 1643363,
  'Versailles (Paris), France': 2265845,
  'Alhambra (Granada), Spain': 3250614,
  'Windsor, United Kingdom': 1519088,
  'Bavarian Alps, Germany': 1643363,
  'Segovia, Spain': 1388030,
  'Buda Castle (Budapest), Hungary': 1785494,
  'Sintra, Portugal': 1325735,
  'Heidelberg, Germany': 1107717,
  'Dresden, Germany': 1107717,
  'Moscow Kremlin, Russia': 2018312,
  'Jaipur, India': 2595805,
  'Udaipur, India': 2595805,
  'Himeji, Japan': 2088666,
  'Seoul (Gyeongbokgung), South Korea': 2372110,
  // Beaches & islands
  'Maldives, Maldives': 1450355,
  'Palawan, Philippines': 2491275,
  'Ibiza, Spain': 1388030,
  'Mallorca, Spain': 1388030,
  'Mykonos, Greece': 1029592,
  'Crete, Greece': 1029592,
  'Hawaii, United States': 1486919,
  'Koh Samui, Thailand': 1450355,
  'Gold Coast, Australia': 1545526,
  'Algarve, Portugal': 1325735,
  'Seychelles, Seychelles': 1450355,
  'Fiji, Fiji': 2491273,
  'Croatia (Hvar), Croatia': 2687152,
  'Sardinia, Italy': 2674159,
  'Capri, Italy': 2674159,
  'Okinawa, Japan': 5363400,
  'Jeju Island, South Korea': 2372110,
  'Boracay, Philippines': 2491275,
  // Mountains & nature
  'Swiss Alps (Interlaken), Switzerland': 2584475,
  'Patagonia, Chile': 3571093,
  'Banff, Canada': 2662116,
  'Milford Sound, New Zealand': 3571092,
  'Norwegian Fjords, Norway': 3582139,
  'Lofoten, Norway': 3582139,
  'Iceland, Iceland': 3582138,
  'Grand Canyon, United States': 2214712,
  'Alaska, United States': 2662116,
  'Mount Fuji, Japan': 2088666,
  'Chamonix, France': 2674160,
  'Zermatt, Switzerland': 2584474,
  'Lake District, United Kingdom': 3552945,
  'Scottish Highlands, United Kingdom': 3552945,
  'Plitvice Lakes, Croatia': 2687152,
  'Guilin, China': 2506927,
  'Halong Bay, Vietnam': 2905236,
  'Masai Mara, Kenya': 2087398,
  'Kruger National Park, South Africa': 2087397,
  'Rishikesh, India': 2595805,
  'Himalayas (Ladakh), India': 2595805,
  'Taroko Gorge, Taiwan': 2506927,
  // Historical & ancient
  'Luxor, Egypt': 3250638,
  'Stonehenge, United Kingdom': 1519088,
  'Beijing, China': 2506927,
  "Xi'an, China": 2506927,
  'Pompeii, Italy': 2674159,
  'Bath, United Kingdom': 1519088,
  'York, United Kingdom': 1519088,
  'Oxford, United Kingdom': 1519088,
  'Cambridge, United Kingdom': 1519088,
  'Český Krumlov, Czech Republic': 1785493,
  'Guanajuato, Mexico': 2523958,
  'San Miguel de Allende, Mexico': 2523958,
  'Medellín, Colombia': 2595807,
  'Malacca, Malaysia': 2491274,
  'Hội An, Vietnam': 2905236,
  'Siena, Italy': 2225457,
  'Verona, Italy': 2674159,
  'Évora, Portugal': 1325735,
  'Toledo, Spain': 3250614,
  'Taj Mahal (Agra), India': 2595805,
  'Agra, India': 2595805,
  // Museums & culture
  'Saint Petersburg, Russia': 2018312,
  'Washington DC, United States': 1486919,
  'Bilbao, Spain': 1388030,
  // Nightlife & cities
  'Las Vegas, United States': 1486919,
  'Miami, United States': 1199951,
  'São Paulo, Brazil': 1823680,
  'Austin, United States': 1486919,
  'Nashville, United States': 1486919,
  // Food & wine
  'Bordeaux, France': 2265845,
  'Lyon, France': 2265845,
  'San Sebastián, Spain': 1388030,
  'Naples, Italy': 2674159,
  'Oaxaca, Mexico': 2523958,
  'Stellenbosch, South Africa': 2087397,
  'Mendoza, Argentina': 3571093,
  'Buenos Aires, Argentina': 3571093,
  'Ho Chi Minh City, Vietnam': 2905236,
  'Lima, Peru': 3571091,
  'New Orleans, United States': 1486919,
  'Penang, Malaysia': 2491274,
  // Adventure & outdoor
  'Zakopane, Poland': 1785495,
  'Siargao, Philippines': 2491275,
  'Bohol, Philippines': 2491275,
  'Ushuaia, Argentina': 3571093,
  'San Pedro de Atacama, Chile': 3571093,
  'Tromsø, Norway': 3582139,
  'Rovaniemi, Finland': 3250639,
  'Sapa, Vietnam': 2905236,
  'Ladakh, India': 2595805,
  // Nature & national parks
  'Yellowstone, United States': 2214712,
  'Yosemite, United States': 2214712,
  'Zion, United States': 2214712,
  'Bryce Canyon, United States': 2214712,
  'Glacier National Park, United States': 2662116,
  'Acadia, United States': 2214712,
  'Great Smoky Mountains, United States': 2214712,
  'Kerala, India': 2595805,
  'Kaziranga, India': 2595805,
  // Iconic sights
  'Statue of Liberty, United States': 1486919,
  'Golden Gate Bridge, United States': 1510599,
  // More India / Asia
  'Delhi, India': 2595805,
  'Goa, India': 2595805,
  'Amritsar, India': 2595805,
  'Red Fort (Delhi), India': 2595805,
  'Agra Fort, India': 2595805,
  'Chittorgarh Fort, India': 2595805,
  'Lhasa, China': 2506927,
  'Banaue, Philippines': 2491275,
  // More cities from destinationsByCountry
  'Vancouver, Canada': 1591447,
  'Montreal, Canada': 1591447,
  'Quebec City, Canada': 1591447,
  'Osaka, Japan': 5363400,
  'Milan, Italy': 2674159,
  'Seville, Spain': 1388030,
  'Valencia, Spain': 1388030,
  'Córdoba, Spain': 3250614,
  'Cappadocia, Turkey': 1770313,
  'Chiang Mai, Thailand': 1450354,
  'Auckland, New Zealand': 3571092,
  'Wellington, New Zealand': 3571092,
  'Brisbane, Australia': 1545526,
  'Salzburg, Austria': 2772125,
  'Brussels, Belgium': 3552946,
  'Salvador, Brazil': 1823680,
  'Santiago, Chile': 3571093,
  'Shanghai, China': 2506927,
  'Bogotá, Colombia': 2595807,
  'Dubrovnik, Croatia': 2687152,
  'Split, Croatia': 2687152,
  'Tel Aviv, Israel': 3261822,
  'Amalfi Coast, Italy': 2674159,
  'Cinque Terre, Italy': 2674159,
  'Sicily, Italy': 2674159,
  'Hiroshima, Japan': 5363400,
  'Kanazawa, Japan': 2088666,
  'Amman, Jordan': 3250644,
  'Nairobi, Kenya': 2087398,
  'Kuala Lumpur, Malaysia': 2491274,
  'Fes, Morocco': 2595806,
  'Rotterdam, Netherlands': 1450353,
  'Bergen, Norway': 3582139,
  'Warsaw, Poland': 1785495,
  'Moscow, Russia': 2018312,
  'Seattle, United States': 1486919,
  'Chicago, United States': 1486919,
  'Boston, United States': 1486919,
  'Philadelphia, United States': 1486919,
  'Denver, United States': 2214712,
  'Portland, United States': 1486919,
  'Da Nang, Vietnam': 2905236,
  'Nha Trang, Vietnam': 2905236,
  'Abu Dhabi, United Arab Emirates': 2044434,
  'Liverpool, United Kingdom': 1519088,
  'Manchester, United Kingdom': 1519088,
  'Busan, South Korea': 2372110,
  'Taipei, Taiwan': 2506927,
  'Krabi, Thailand': 1450355,
  'Antalya, Turkey': 1770313,
  'Pamukkale, Turkey': 1770313,
  'Johannesburg, South Africa': 2087397,
  'Gothenburg, Sweden': 261102,
  'Geneva, Switzerland': 2584474,
  'Lucerne, Switzerland': 2584474,
  'Jakarta, Indonesia': 2491273,
  'Yogyakarta, Indonesia': 2491273,
  'Galway, Ireland': 3552947,
  'Hamburg, Germany': 1107717,
  'Marseille, France': 2265845,
  'Strasbourg, France': 2265845,
  'Provence, France': 2265845,
  'Arequipa, Peru': 3571091,
  'Manila, Philippines': 2491275,
  'Cebu, Philippines': 2491275,
  // More countries (for hero / country cards and fallback)
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
  Argentina: 3571093,
  Chile: 3571093,
  Croatia: 2687152,
  Russia: 2018312,
  Israel: 3261822,
  Myanmar: 2404942,
  Cambodia: 2687150,
  Taiwan: 2506927,
  Maldives: 1450355,
  Seychelles: 1450355,
  Fiji: 2491273,
}

// Multiple Pexels photo IDs per destination for slideshow (fresh rotating images).
// Key: 'City, Country' or same as pexelsPhotoIds. Value: array of photo IDs.
const pexelsSlideshowIds = {
  'Paris, France': [2265845, 2662116, 2344174, 1450353],
  'London, United Kingdom': [1519088, 4278196, 2372110],
  'Tokyo, Japan': [5363400, 2506927, 2088666],
  'New York, United States': [1486919, 1199951, 1510599],
  'Rome, Italy': [2674159, 2225457, 2578780],
  'Barcelona, Spain': [1388030, 3250614, 1388031],
  'Amsterdam, Netherlands': [1450353, 3552945, 1785493],
  'Singapore': [2719318, 2595807, 2491274],
  'Dubai, United Arab Emirates': [2044434, 2044435, 1486919],
  'Sydney, Australia': [1545526, 1545527, 3571092],
  'Istanbul, Turkey': [1770313, 2413256, 1388030],
  'Bangkok, Thailand': [1450354, 1450355, 2905236],
  'Kyoto, Japan': [2088666, 5363400, 2088667],
  'Santorini, Greece': [1029592, 2413256, 1029593],
  'Bali, Indonesia': [2491273, 2491274, 1450355],
  'Reykjavik, Iceland': [3582138, 3582139, 261102],
  'Rio de Janeiro, Brazil': [1823680, 3571091, 2523958],
  'Mexico City, Mexico': [2523958, 2523959, 2595805],
  'Cairo, Egypt': [3250638, 3250639, 2674159],
  'Machu Picchu, Peru': [3571091, 3571092, 3571093],
  'Prague, Czech Republic': [1785493, 1785494, 1785495],
  'Venice, Italy': [2578780, 2674159, 2578781],
  'Florence, Italy': [2225457, 2674159, 2225458],
  'Athens, Greece': [2413256, 2413257, 1029592],
  'Lisbon, Portugal': [1325735, 1325736, 1388030],
  'Berlin, Germany': [1107717, 1643363, 1107718],
  'Vienna, Austria': [2772125, 2772126, 1785494],
  'Madrid, Spain': [3250614, 1388030, 3250615],
  'San Francisco, United States': [1510599, 1486919, 2214712],
  'Hong Kong, China': [2506927, 2372110, 2506928],
  'Seoul, South Korea': [2372110, 2372111, 5363400],
  'Cape Town, South Africa': [2087397, 2087398, 1823680],
  'Toronto, Canada': [1591447, 2662116, 1591448],
  'Los Angeles, United States': [1199951, 1199952, 1486919],
  'Marrakech, Morocco': [2595806, 2595807, 1450354],
  'Edinburgh, United Kingdom': [3552945, 1519088, 3552946],
  'Budapest, Hungary': [1785494, 1785495, 2772125],
  'Copenhagen, Denmark': [2413063, 261102, 2413064],
  'Dublin, Ireland': [3552947, 3552946, 1519088],
  'Cancún, Mexico': [2523959, 2523960, 1450355],
  'Tulum, Mexico': [2523960, 2523959, 2491273],
  'Cartagena, Colombia': [2595807, 1388030, 2595806],
  'Hanoi, Vietnam': [2905236, 2905237, 1450354],
  'Petra, Jordan': [3250644, 3250638, 2413256],
  'Grand Canyon, United States': [2214712, 2662116, 3571092],
  'Patagonia, Chile': [3571093, 3571092, 2662116],
  'Banff, Canada': [2662116, 2662117, 3582139],
  'Iceland, Iceland': [3582138, 3582139, 261102],
  'Norwegian Fjords, Norway': [3582139, 3582140, 2584475],
}

function getIdOrIds(key) {
  const multi = pexelsSlideshowIds[key]
  if (multi && Array.isArray(multi) && multi.length > 0) return multi
  const single = pexelsPhotoIds[key]
  if (single != null) return [single]
  const cachedId = getCachedPexelsId(key)
  if (cachedId) return [cachedId]
  const comma = key.lastIndexOf(', ')
  if (comma > 0) {
    const country = key.slice(comma + 2).trim()
    if (country && pexelsPhotoIds[country]) return [pexelsPhotoIds[country]]
  }
  return null
}

/**
 * Returns array of image URLs for slideshow (same destination, multiple photos).
 * Uses slideshow map when available, else single image wrapped in array.
 */
export function getDestinationImageSlideshowUrls(name, options = {}) {
  const { width = 400, height = 300 } = options
  const key = (name || '').trim()
  const ids = getIdOrIds(key)
  if (ids && ids.length > 0) {
    return ids.map((id) => pexelsUrl(id, width, height))
  }
  const seed = encodeURIComponent(key || 'travel')
  return [`https://picsum.photos/seed/${seed}/${width}/${height}`]
}

export function getDestinationImageSlideshowUrlsForCity(city, country, options = {}) {
  return getDestinationImageSlideshowUrls(`${city}, ${country}`, options)
}

/**
 * Returns image URL for a destination (e.g. "Paris, France" or custom name).
 * Uses Pexels (static map or cached from API); then country image; Picsum as last fallback.
 */
export function getDestinationImageUrl(name, options = {}) {
  const { width = 400, height = 300 } = options
  const key = (name || '').trim()
  const staticId = pexelsPhotoIds[key]
  if (staticId) return pexelsUrl(staticId, width, height)
  const cachedId = getCachedPexelsId(key)
  if (cachedId) return pexelsUrlFromId(cachedId, width, height)
  // Fallback: use country image if name looks like "City, Country"
  const comma = key.lastIndexOf(', ')
  if (comma > 0) {
    const country = key.slice(comma + 2).trim()
    if (country && pexelsPhotoIds[country]) {
      return pexelsUrl(pexelsPhotoIds[country], width, height)
    }
  }
  const seed = encodeURIComponent(key || 'travel')
  return `https://picsum.photos/seed/${seed}/${width}/${height}`
}

export function getDestinationImageUrlForCity(city, country, options = {}) {
  return getDestinationImageUrl(`${city}, ${country}`, options)
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
