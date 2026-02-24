// Common itinerary prompts: "Build me a X-day (Country) itinerary"
// Used on Home and Explore to create a pre-filled trip.
import { getCountryGuide } from './countryGuides'

/** Suggested prompts: { days, country } */
export const COMMON_ITINERARY_PROMPTS = [
  { days: 3, country: 'Japan' },
  { days: 5, country: 'Japan' },
  { days: 7, country: 'Japan' },
  { days: 3, country: 'France' },
  { days: 5, country: 'France' },
  { days: 7, country: 'Italy' },
  { days: 5, country: 'Italy' },
  { days: 3, country: 'Spain' },
  { days: 5, country: 'Spain' },
  { days: 7, country: 'United Kingdom' },
  { days: 5, country: 'Thailand' },
  { days: 7, country: 'Thailand' },
  { days: 5, country: 'Greece' },
  { days: 7, country: 'Greece' },
  { days: 5, country: 'Portugal' },
  { days: 5, country: 'Iceland' },
  { days: 7, country: 'Australia' },
  { days: 5, country: 'Mexico' },
  { days: 7, country: 'India' },
  { days: 5, country: 'India' },
  { days: 5, country: 'Vietnam' },
  { days: 7, country: 'United States' },
  { days: 5, country: 'Germany' },
  { days: 5, country: 'Croatia' },
  { days: 3, country: 'United Arab Emirates' },
  { days: 5, country: 'Indonesia' },
  { days: 5, country: 'Turkey' },
  { days: 5, country: 'South Korea' },
  { days: 7, country: 'New Zealand' },
]

/**
 * Get suggested destination names for a X-day country itinerary.
 * Returns "City, Country" strings, prioritising must-visit then recommended.
 * @param {number} days
 * @param {string} country
 * @returns {string[]}
 */
export function getSuggestedDestinationsForItinerary(days, country) {
  const guide = getCountryGuide(country)
  const combined = [...guide.mustVisit, ...guide.recommended]
  // Roughly 1–2 stops per day; at least 2, max 12
  const count = Math.min(Math.max(2, Math.ceil(days * 1.2)), 12, combined.length)
  return combined.slice(0, count).map((city) => `${city}, ${country}`)
}

/**
 * Format prompt label: "Build me a 5-day Japan itinerary"
 */
export function formatItineraryPromptLabel(days, country) {
  return `Build me a ${days}-day ${country} itinerary`
}
