/**
 * Country rankings: ease of travel, fun, safety, affordability, tourist welcome, laws.
 * Scores 1–5 (5 = best). Derived from visitor info where possible; overlays for ease, fun, affordability.
 */

import { countryNames } from './destinationsByCountry'
import { getCountryVisitorInfo } from './countrySafetyLawsMentalHealth'

function safetyToScore(s) {
  if (s === 'High') return 5
  if (s === 'Moderate') return 4
  if (s === 'Variable') return 3
  if (s === 'Caution') return 2
  return 3
}

function friendlinessToScore(f) {
  if (f === 'High') return 5
  if (f === 'Moderate') return 3
  if (f === 'Low') return 1
  return 3
}

function lawsToScore(l) {
  if (l === 'Fewer') return 5
  if (l === 'Many') return 3
  if (l === 'Too many') return 1
  return 3
}

// Ease of travel: visa, infrastructure, English, connectivity (1–5, 5 = easiest)
const EASE_OF_TRAVEL = {
  'United Kingdom': 5, 'France': 5, 'Spain': 5, 'Italy': 5, 'Germany': 5, 'Netherlands': 5, 'Ireland': 5,
  'Portugal': 5, 'Austria': 5, 'Belgium': 5, 'Switzerland': 5, 'Czech Republic': 5, 'Croatia': 5,
  'Greece': 5, 'Poland': 5, 'Sweden': 5, 'Denmark': 5, 'Norway': 5, 'Finland': 5, 'Iceland': 5,
  'United States': 5, 'Canada': 5, 'Australia': 5, 'New Zealand': 5, 'Japan': 5, 'Singapore': 5,
  'South Korea': 4, 'Taiwan': 5, 'Thailand': 5, 'Vietnam': 4, 'Malaysia': 5, 'United Arab Emirates': 5,
  'Israel': 4, 'Turkey': 4, 'Jordan': 4, 'Egypt': 3, 'Morocco': 4, 'South Africa': 4,
  'Mexico': 4, 'Argentina': 4, 'Chile': 5, 'Brazil': 4, 'Colombia': 4, 'Peru': 4,
  'India': 3, 'Indonesia': 4, 'Philippines': 4, 'China': 3, 'Russia': 3, 'Hungary': 5, 'Kenya': 3,
}

// Fun: variety, experiences, nightlife, vibe (1–5, 5 = most fun)
const FUN = {
  'Thailand': 5, 'Spain': 5, 'Italy': 5, 'Japan': 5, 'Mexico': 5, 'Portugal': 5, 'Greece': 5,
  'France': 5, 'United Kingdom': 5, 'Brazil': 5, 'Argentina': 5, 'United States': 5, 'Australia': 5,
  'Netherlands': 5, 'Germany': 5, 'Croatia': 5, 'Vietnam': 5, 'Indonesia': 5, 'Turkey': 5,
  'South Africa': 5, 'Egypt': 5, 'Morocco': 5, 'India': 5, 'Colombia': 5, 'Peru': 5,
  'Ireland': 5, 'Czech Republic': 5, 'Hungary': 5, 'Poland': 5, 'Austria': 5, 'Switzerland': 4,
  'New Zealand': 5, 'Canada': 5, 'South Korea': 5, 'Taiwan': 5, 'Singapore': 5, 'Philippines': 5,
  'United Arab Emirates': 5, 'Israel': 5, 'Jordan': 5, 'Chile': 5, 'Malaysia': 5,
  'Belgium': 5, 'Denmark': 5, 'Norway': 5, 'Sweden': 5, 'Finland': 4, 'Iceland': 5, 'Russia': 4, 'China': 4, 'Kenya': 5,
}

// Affordability: 5 = most affordable (cheap), 1 = least (expensive)
const AFFORDABILITY = {
  'Vietnam': 5, 'Thailand': 5, 'Indonesia': 5, 'India': 5, 'Philippines': 5, 'Morocco': 5, 'Egypt': 5,
  'Colombia': 5, 'Peru': 5, 'Bolivia': 5, 'Mexico': 4, 'Argentina': 4, 'Turkey': 4, 'South Africa': 4,
  'Hungary': 5, 'Poland': 5, 'Czech Republic': 5, 'Portugal': 4, 'Greece': 4, 'Croatia': 4,
  'Malaysia': 5, 'Kenya': 4, 'Jordan': 4, 'Chile': 3, 'Brazil': 4, 'China': 4, 'Russia': 4,
  'Taiwan': 4, 'South Korea': 3, 'Japan': 2, 'Singapore': 2, 'Australia': 2, 'New Zealand': 2,
  'United States': 2, 'Canada': 2, 'United Kingdom': 2, 'France': 2, 'Germany': 2, 'Italy': 3,
  'Spain': 3, 'Netherlands': 2, 'Ireland': 2, 'Switzerland': 1, 'Norway': 1, 'Iceland': 1,
  'Denmark': 2, 'Sweden': 2, 'Finland': 2, 'Austria': 3, 'Belgium': 3, 'United Arab Emirates': 2,
  'Israel': 2,
}

export const RANKING_LABELS = {
  easeOfTravel: 'Ease of travel',
  fun: 'Fun',
  safety: 'Safety',
  affordability: 'Affordability',
  touristWelcome: 'Tourist welcome',
  lawsEase: 'Laws (ease)',
}

export const RANKING_DESCRIPTIONS = {
  easeOfTravel: 'Visa ease, infrastructure, English, connectivity',
  fun: 'Variety, experiences, nightlife, vibe',
  safety: 'Safety for women and foreigners',
  affordability: '5 = most affordable, 1 = most expensive',
  touristWelcome: 'How welcome tourists feel',
  lawsEase: '5 = fewer rules, 1 = strict / complex',
}

function clampScore(n) {
  return Math.max(1, Math.min(5, Number(n) || 3))
}

export function getRanking(countryName) {
  const info = getCountryVisitorInfo(countryName)
  const safety = safetyToScore(info.safetyForeigners)
  const touristWelcome = friendlinessToScore(info.friendlinessForeigners)
  const lawsEase = lawsToScore(info.laws)
  return {
    country: countryName,
    easeOfTravel: clampScore(EASE_OF_TRAVEL[countryName] ?? 3),
    fun: clampScore(FUN[countryName] ?? 4),
    safety,
    affordability: clampScore(AFFORDABILITY[countryName] ?? 3),
    touristWelcome,
    lawsEase,
  }
}

export function getAllRankings() {
  return countryNames.map((country) => getRanking(country))
}

export function getScoreLabel(score) {
  if (score >= 4.5) return 'Excellent'
  if (score >= 3.5) return 'Good'
  if (score >= 2.5) return 'Moderate'
  if (score >= 1.5) return 'Fair'
  return 'Poor'
}

export { countryNames }
