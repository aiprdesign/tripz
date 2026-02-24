// "People like you went here" / similar destinations (e-commerce style recommendations)

export const SIMILAR_DESTINATIONS = {
  'Paris, France': [
    { city: 'Barcelona', country: 'Spain', reason: 'Art, architecture, and great food' },
    { city: 'Rome', country: 'Italy', reason: 'History and iconic sights' },
    { city: 'Lisbon', country: 'Portugal', reason: 'European charm, cheaper' },
    { city: 'Prague', country: 'Czech Republic', reason: 'Walkable city break' },
  ],
  'Tokyo, Japan': [
    { city: 'Seoul', country: 'South Korea', reason: 'Neon cities and food' },
    { city: 'Taipei', country: 'Taiwan', reason: 'Street food and temples' },
    { city: 'Singapore', country: 'Singapore', reason: 'Clean, efficient, foodie' },
    { city: 'Kyoto', country: 'Japan', reason: 'Traditional side of Japan' },
  ],
  'Bali, Indonesia': [
    { city: 'Thailand', country: 'Thailand', reason: 'Beaches and temples' },
    { city: 'Sri Lanka', country: 'Sri Lanka', reason: 'Tea, beaches, wildlife' },
    { city: 'Vietnam', country: 'Vietnam', reason: 'Coast and culture' },
    { city: 'Philippines', country: 'Philippines', reason: 'Islands on a budget' },
  ],
  'Barcelona, Spain': [
    { city: 'Madrid', country: 'Spain', reason: 'Museums and tapas' },
    { city: 'Lisbon', country: 'Portugal', reason: 'Hills, tiles, and seafood' },
    { city: 'Nice', country: 'France', reason: 'Mediterranean and art' },
    { city: 'Valencia', country: 'Spain', reason: 'Paella and architecture' },
  ],
  'London, United Kingdom': [
    { city: 'Edinburgh', country: 'United Kingdom', reason: 'History and festivals' },
    { city: 'Dublin', country: 'Ireland', reason: 'Pubs and culture' },
    { city: 'Amsterdam', country: 'Netherlands', reason: 'Canals and museums' },
    { city: 'Berlin', country: 'Germany', reason: 'History and nightlife' },
  ],
  'New York, United States': [
    { city: 'Chicago', country: 'United States', reason: 'Architecture and food' },
    { city: 'San Francisco', country: 'United States', reason: 'Hills and tech' },
    { city: 'Boston', country: 'United States', reason: 'History and walkable' },
    { city: 'London', country: 'United Kingdom', reason: 'Big city vibe' },
  ],
}

/** Get similar destinations for a "City, Country" or city+country; fallback to country-only. */
export function getSimilarDestinations(city, country) {
  const key = `${city}, ${country}`
  if (SIMILAR_DESTINATIONS[key]) return SIMILAR_DESTINATIONS[key]
  const countryKey = Object.keys(SIMILAR_DESTINATIONS).find((k) => k.endsWith(`, ${country}`))
  return countryKey ? SIMILAR_DESTINATIONS[countryKey] : []
}
