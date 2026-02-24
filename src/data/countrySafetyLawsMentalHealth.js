/**
 * Country-level visitor info: safety (women, foreigners), regulatory density (laws),
 * and mental health context in the population / top destinations.
 * Helps visitors know what they're getting into. Values are indicative.
 */

import { countryNames } from './destinationsByCountry'

// Safety: High | Moderate | Variable | Caution
// Laws: 'Fewer' | 'Many' | 'Too many'
// Mental health: prevalence in population + note for top destinations
const DATA = {
  Argentina: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Mental health services available in Buenos Aires and larger cities; awareness growing.' },
  Australia: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Good support in cities; remote areas have fewer resources. High awareness.' },
  Austria: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Lower', mentalHealthNote: 'Strong healthcare; good access in Vienna and major destinations.' },
  Belgium: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'EU-level access; services in Brussels and tourist hubs.' },
  Brazil: { safetyWomen: 'Variable', safetyForeigners: 'Variable', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Prevalence higher in urban populations; services vary by city.' },
  Canada: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Good support in major cities; Indigenous and remote areas under-served.' },
  Chile: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Improving awareness; Santiago and tourist areas have better access.' },
  China: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Stigma still present; major cities have more services. Language barrier for visitors.' },
  Colombia: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Improving in Bogotá, Medellín, Cartagena; variable elsewhere.' },
  Croatia: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'EU standards; good in coastal and capital areas.' },
  'Czech Republic': { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Prague and major cities have adequate support.' },
  Denmark: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'High awareness; good access in Copenhagen and towns.' },
  Egypt: { safetyWomen: 'Caution', safetyForeigners: 'Moderate', laws: 'Too many', mentalHealth: 'Higher', mentalHealthNote: 'Stigma common; limited public mental health in tourist areas.' },
  Finland: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Strong welfare system; good access in Helsinki and Lapland hubs.' },
  France: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Good in Paris and major cities; long wait times in places.' },
  Germany: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Well-developed; Berlin, Munich, and cities have good access.' },
  Greece: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Athens and islands have some services; awareness improving.' },
  Hungary: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Budapest well served; smaller towns less so.' },
  Iceland: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Small population; Reykjavik has support; seasonal mood factors.' },
  India: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Too many', mentalHealth: 'Higher', mentalHealthNote: 'High burden, growing awareness; major cities have private options.' },
  Indonesia: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Bali and Jakarta have some services; stigma in many areas.' },
  Ireland: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Dublin and cities have good access; awareness high.' },
  Israel: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Good services in Tel Aviv, Jerusalem; stress-related load in population.' },
  Italy: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Rome, Milan, Florence have services; south less resourced.' },
  Japan: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Tokyo, Kyoto have support; stigma still affects disclosure.' },
  Jordan: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Amman and Petra area used to tourists; mental health services limited.' },
  Kenya: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Nairobi, Mombasa have some options; overall under-resourced.' },
  Malaysia: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Kuala Lumpur and Penang have adequate services.' },
  Mexico: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Mexico City, Cancún, Oaxaca have growing support; variable elsewhere.' },
  Morocco: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Marrakech, Fes used to visitors; mental health services limited.' },
  Netherlands: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Amsterdam and cities have good access and awareness.' },
  'New Zealand': { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Auckland, Wellington, Queenstown have support; rural areas less.' },
  Norway: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Oslo, Bergen, Lofoten hubs; good welfare and access.' },
  Peru: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Lima, Cusco have some services; altitude can affect mood.' },
  Philippines: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Manila, Cebu, Palawan have options; stigma in places.' },
  Poland: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Krakow, Warsaw have good access; awareness improving.' },
  Portugal: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Lisbon, Porto, Algarve well served for a visitor.' },
  Russia: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Moscow, St Petersburg have services; stigma and language barriers.' },
  Singapore: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Excellent healthcare; mental health awareness growing.' },
  'South Africa': { safetyWomen: 'Variable', safetyForeigners: 'Moderate', laws: 'Many', mentalHealth: 'Higher', mentalHealthNote: 'Cape Town, Johannesburg have private options; high burden in population.' },
  'South Korea': { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Seoul, Busan have good access; high stress culture, awareness rising.' },
  Spain: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Barcelona, Madrid, coastal areas have good access.' },
  Sweden: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Stockholm and cities; strong welfare, good access.' },
  Switzerland: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Lower', mentalHealthNote: 'Very good access in Zurich, Geneva, Interlaken areas.' },
  Taiwan: { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Taipei and major cities have support; awareness improving.' },
  Thailand: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Bangkok, Chiang Mai, islands have some services; variable elsewhere.' },
  Turkey: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Istanbul, Cappadocia, coast have tourist infrastructure; mental health limited.' },
  'United Arab Emirates': { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Too many', mentalHealth: 'Moderate', mentalHealthNote: 'Dubai, Abu Dhabi have good healthcare; some stigma.' },
  'United Kingdom': { safetyWomen: 'High', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'London, Edinburgh, major cities; NHS and private, wait times vary.' },
  'United States': { safetyWomen: 'Variable', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Major cities and destinations have support; access varies by state.' },
  Vietnam: { safetyWomen: 'Moderate', safetyForeigners: 'High', laws: 'Many', mentalHealth: 'Moderate', mentalHealthNote: 'Hanoi, Ho Chi Minh, Hội An have some services; stigma in places.' },
}

const DEFAULT = {
  safetyWomen: 'Moderate',
  safetyForeigners: 'Moderate',
  laws: 'Many',
  mentalHealth: 'Moderate',
  mentalHealthNote: 'Mental health support and prevalence vary by region; check local resources in main destinations.',
}

/** Labels for laws level so visitors know what to expect */
export const LAWS_LABELS = {
  'Fewer': 'Fewer regulations — generally lighter rules and paperwork for visitors.',
  'Many': 'Many rules — moderate regulation; expect some formalities and local laws.',
  'Too many': 'Complex / strict — lots of laws and procedures; research visas, permits, and local rules.',
}

/** Get safety, laws, and mental health info for a country. */
export function getCountryVisitorInfo(countryName) {
  const key = countryName?.trim()
  if (!key) return { ...DEFAULT, lawsLabel: LAWS_LABELS[DEFAULT.laws] }
  const row = DATA[key]
  const safetyWomen = row?.safetyWomen ?? DEFAULT.safetyWomen
  const safetyForeigners = row?.safetyForeigners ?? DEFAULT.safetyForeigners
  const laws = row?.laws ?? DEFAULT.laws
  const mentalHealth = row?.mentalHealth ?? DEFAULT.mentalHealth
  const mentalHealthNote = row?.mentalHealthNote ?? DEFAULT.mentalHealthNote
  return {
    safetyWomen,
    safetyForeigners,
    laws,
    lawsLabel: LAWS_LABELS[laws] || LAWS_LABELS['Many'],
    mentalHealth,
    mentalHealthNote,
  }
}

/** All countries we have data for (same as app country list). */
export { countryNames }
