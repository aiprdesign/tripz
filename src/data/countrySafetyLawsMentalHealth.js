/**
 * Country-level visitor info: safety (women, foreigners), friendliness to foreigners,
 * regulatory density (laws), and % of population with mental health issues.
 * Helps visitors know what they're getting into. Values are indicative.
 */

import { countryNames } from './destinationsByCountry'

// Safety: High | Moderate | Variable | Caution
// Friendliness to foreigners: High | Moderate | Low
// Laws: 'Fewer' | 'Many' | 'Too many'
// mentalHealthPct: estimated % of population with some form of mental health issue (anxiety, depression, etc.)
const DATA = {
  Argentina: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Estimates for anxiety, depression, or other common conditions in the population.' },
  Australia: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'Higher in urban and remote stressed populations.' },
  Austria: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~15%', mentalHealthNote: 'Lower than EU average in some surveys.' },
  Belgium: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'In line with Western European prevalence.' },
  Brazil: { safetyWomen: 'Variable', safetyForeigners: 'Variable', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~25%', mentalHealthNote: 'Higher in urban populations; under-reporting in many areas.' },
  Canada: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'Similar to other high-income countries; Indigenous populations disproportionately affected.' },
  Chile: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'Rising awareness and reporting in recent years.' },
  China: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', friendlinessForeigners: 'Moderate', laws: 'Too many', mentalHealthPct: '~17%', mentalHealthNote: 'Under-reporting due to stigma; urban stress and youth prevalence notable.' },
  Colombia: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'Conflict and displacement history affect prevalence; improving data.' },
  Croatia: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'EU-level estimates; tourism areas generally positive.' },
  'Czech Republic': { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Central European average.' },
  Denmark: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~17%', mentalHealthNote: 'Good data; high awareness.' },
  Egypt: { safetyWomen: 'Caution', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~25%', mentalHealthNote: 'Significant under-reporting; stigma and limited services.' },
  Finland: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Seasonal and substance-related issues noted in data.' },
  France: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'In line with Western Europe; urban stress factors.' },
  Germany: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~18%', mentalHealthNote: 'Well-studied; depression and anxiety most common.' },
  Greece: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~19%', mentalHealthNote: 'Economic crisis increased prevalence in past decade.' },
  Hungary: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'Moderate', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Stigma still affects reporting.' },
  Iceland: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'Seasonal affective and substance-related conditions notable.' },
  India: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~14%', mentalHealthNote: 'Large under-reporting; true burden likely higher, especially in cities.' },
  Indonesia: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~12%', mentalHealthNote: 'Under-reporting; Bali and urban areas show higher stress indicators.' },
  Ireland: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'High awareness and reporting.' },
  Israel: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', friendlinessForeigners: 'Moderate', laws: 'Many', mentalHealthPct: '~16%', mentalHealthNote: 'Conflict and stress factors; good data in urban areas.' },
  Italy: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~18%', mentalHealthNote: 'Southern regions and youth show higher prevalence in studies.' },
  Japan: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'Moderate', laws: 'Too many', mentalHealthPct: '~18%', mentalHealthNote: 'Under-reporting due to stigma; work-related stress and suicide rates notable.' },
  Jordan: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~23%', mentalHealthNote: 'Refugee and conflict-affected populations increase overall burden.' },
  Kenya: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~11%', mentalHealthNote: 'Severe under-reporting; true prevalence likely higher.' },
  Malaysia: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~12%', mentalHealthNote: 'Stigma affects data; urban and youth rates rising.' },
  Mexico: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~19%', mentalHealthNote: 'Depression and anxiety most reported; violence-related trauma in some regions.' },
  Morocco: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~17%', mentalHealthNote: 'Under-reporting; tourism areas generally positive.' },
  Netherlands: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~20%', mentalHealthNote: 'High reporting and awareness.' },
  'New Zealand': { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~22%', mentalHealthNote: 'Youth and Māori populations show higher rates in surveys.' },
  Norway: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Seasonal and substance-related conditions noted.' },
  Peru: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Altitude and urban stress in Lima/Cusco; under-reporting in rural areas.' },
  Philippines: { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~16%', mentalHealthNote: 'Stigma and lack of services mean true rate likely higher.' },
  Poland: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Awareness and reporting improving.' },
  Portugal: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~19%', mentalHealthNote: 'In line with Southern European estimates.' },
  Russia: { safetyWomen: 'Moderate', safetyForeigners: 'Moderate', friendlinessForeigners: 'Moderate', laws: 'Too many', mentalHealthPct: '~16%', mentalHealthNote: 'Stigma and substance-related conditions; under-reporting.' },
  Singapore: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~14%', mentalHealthNote: 'Work and youth stress; reporting improving.' },
  'South Africa': { safetyWomen: 'Variable', safetyForeigners: 'Moderate', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~27%', mentalHealthNote: 'Among highest in surveys; trauma, inequality, and HIV-related burden.' },
  'South Korea': { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'Moderate', laws: 'Too many', mentalHealthPct: '~18%', mentalHealthNote: 'Work pressure and youth; suicide rates notably high; stigma remains.' },
  Spain: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~19%', mentalHealthNote: 'Depression and anxiety; crisis and youth well-documented.' },
  Sweden: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Good data; seasonal and youth prevalence.' },
  Switzerland: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~15%', mentalHealthNote: 'Lower than many European peers in studies.' },
  Taiwan: { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~15%', mentalHealthNote: 'Stigma affects reporting; work stress notable.' },
  Thailand: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~13%', mentalHealthNote: 'Under-reporting; tourism hubs generally positive.' },
  Turkey: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Depression and anxiety; urban and youth rates notable.' },
  'United Arab Emirates': { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Too many', mentalHealthPct: '~17%', mentalHealthNote: 'Expat and youth stress; stigma in local population.' },
  'United Kingdom': { safetyWomen: 'High', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~18%', mentalHealthNote: 'Anxiety and depression most common; regional variation.' },
  'United States': { safetyWomen: 'Variable', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~22%', mentalHealthNote: 'Anxiety and depression; regional and demographic variation.' },
  Vietnam: { safetyWomen: 'Moderate', safetyForeigners: 'High', friendlinessForeigners: 'High', laws: 'Many', mentalHealthPct: '~15%', mentalHealthNote: 'Under-reporting; war legacy and urban stress in data.' },
}

const DEFAULT = {
  safetyWomen: 'Moderate',
  safetyForeigners: 'Moderate',
  friendlinessForeigners: 'Moderate',
  laws: 'Many',
  mentalHealthPct: '~18%',
  mentalHealthNote: 'Estimated share of population with anxiety, depression, or other common mental health conditions. Varies by region.',
}

/** Labels for laws level so visitors know what to expect */
export const LAWS_LABELS = {
  'Fewer': 'Fewer regulations — generally lighter rules and paperwork for visitors.',
  'Many': 'Many rules — moderate regulation; expect some formalities and local laws.',
  'Too many': 'Complex / strict — lots of laws and procedures; research visas, permits, and local rules.',
}

/** Get safety, friendliness, laws, mental health prevalence, and risk likelihood for a country. */
export function getCountryVisitorInfo(countryName) {
  const key = countryName?.trim()
  if (!key) return { ...DEFAULT, ...RISK_DEFAULT, lawsLabel: LAWS_LABELS[DEFAULT.laws] }
  const row = DATA[key]
  const safetyWomen = row?.safetyWomen ?? DEFAULT.safetyWomen
  const safetyForeigners = row?.safetyForeigners ?? DEFAULT.safetyForeigners
  const friendlinessForeigners = row?.friendlinessForeigners ?? DEFAULT.friendlinessForeigners
  const laws = row?.laws ?? DEFAULT.laws
  const mentalHealthPct = row?.mentalHealthPct ?? DEFAULT.mentalHealthPct
  const mentalHealthNote = row?.mentalHealthNote ?? DEFAULT.mentalHealthNote
  const risks = RISK_DATA[key] || RISK_DEFAULT
  return {
    safetyWomen,
    safetyForeigners,
    friendlinessForeigners,
    laws,
    lawsLabel: LAWS_LABELS[laws] || LAWS_LABELS['Many'],
    mentalHealthPct,
    mentalHealthNote,
    lifetimeRisk: risks.lifetimeRisk,
    cancerRisk: risks.cancerRisk,
    accidentRisk: risks.accidentRisk,
    mentalHealthRisk: risks.mentalHealthRisk,
  }
}

// Risk levels: Lower | Moderate | Higher (likelihood in the country / for residents; indicative for visitors)
const RISK_DATA = {
  Argentina: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Australia: { lifetimeRisk: 'Lower', cancerRisk: 'Higher', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Austria: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Lower' },
  Belgium: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Brazil: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Higher' },
  Canada: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Chile: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  China: { lifetimeRisk: 'Moderate', cancerRisk: 'Higher', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Colombia: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Croatia: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  'Czech Republic': { lifetimeRisk: 'Lower', cancerRisk: 'Higher', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Denmark: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  Egypt: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Higher' },
  Finland: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  France: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Germany: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  Greece: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Hungary: { lifetimeRisk: 'Moderate', cancerRisk: 'Higher', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Iceland: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  India: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Indonesia: { lifetimeRisk: 'Moderate', cancerRisk: 'Lower', accidentRisk: 'Higher', mentalHealthRisk: 'Lower' },
  Ireland: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Israel: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Italy: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Japan: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  Jordan: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Higher' },
  Kenya: { lifetimeRisk: 'Higher', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Malaysia: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Lower' },
  Mexico: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Morocco: { lifetimeRisk: 'Moderate', cancerRisk: 'Lower', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Netherlands: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  'New Zealand': { lifetimeRisk: 'Lower', cancerRisk: 'Higher', accidentRisk: 'Moderate', mentalHealthRisk: 'Higher' },
  Norway: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  Peru: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Philippines: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Poland: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Portugal: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Russia: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  Singapore: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Lower' },
  'South Africa': { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Higher' },
  'South Korea': { lifetimeRisk: 'Lower', cancerRisk: 'Higher', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Spain: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Sweden: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Moderate' },
  Switzerland: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Lower', mentalHealthRisk: 'Lower' },
  Taiwan: { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Lower' },
  Thailand: { lifetimeRisk: 'Moderate', cancerRisk: 'Lower', accidentRisk: 'Higher', mentalHealthRisk: 'Lower' },
  Turkey: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  'United Arab Emirates': { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Moderate' },
  'United Kingdom': { lifetimeRisk: 'Lower', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  'United States': { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' },
  Vietnam: { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Higher', mentalHealthRisk: 'Lower' },
}

const RISK_DEFAULT = { lifetimeRisk: 'Moderate', cancerRisk: 'Moderate', accidentRisk: 'Moderate', mentalHealthRisk: 'Moderate' }

/** All countries we have data for (same as app country list). */
export { countryNames }
