/**
 * Map app country names to ISO 3166-1 alpha-2 codes for flag emoji.
 * Flag emoji = regional indicator symbols (e.g. US → 🇺🇸).
 */
const COUNTRY_TO_ISO = {
  Argentina: 'AR',
  Australia: 'AU',
  Austria: 'AT',
  Belgium: 'BE',
  Brazil: 'BR',
  Canada: 'CA',
  Chile: 'CL',
  China: 'CN',
  Colombia: 'CO',
  Croatia: 'HR',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Egypt: 'EG',
  Finland: 'FI',
  France: 'FR',
  Germany: 'DE',
  Greece: 'GR',
  Hungary: 'HU',
  Iceland: 'IS',
  India: 'IN',
  Indonesia: 'ID',
  Ireland: 'IE',
  Israel: 'IL',
  Italy: 'IT',
  Japan: 'JP',
  Jordan: 'JO',
  Kenya: 'KE',
  Malaysia: 'MY',
  Mexico: 'MX',
  Morocco: 'MA',
  Netherlands: 'NL',
  'New Zealand': 'NZ',
  Norway: 'NO',
  Peru: 'PE',
  Philippines: 'PH',
  Poland: 'PL',
  Portugal: 'PT',
  Russia: 'RU',
  Singapore: 'SG',
  'South Africa': 'ZA',
  'South Korea': 'KR',
  Spain: 'ES',
  Sweden: 'SE',
  Switzerland: 'CH',
  Taiwan: 'TW',
  Thailand: 'TH',
  Turkey: 'TR',
  'United Arab Emirates': 'AE',
  'United Kingdom': 'GB',
  'United States': 'US',
  Vietnam: 'VN',
}

/** Convert ISO 2-letter code to flag emoji (e.g. "US" → "🇺🇸") */
function isoToFlagEmoji(iso) {
  if (!iso || iso.length !== 2) return ''
  return iso
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 - 65 + c.charCodeAt(0)))
    .join('')
}

/** Get ISO 2-letter code for a country name. Returns '' if unknown. */
export function getCountryIso(countryName) {
  if (!countryName || typeof countryName !== 'string') return ''
  return COUNTRY_TO_ISO[countryName.trim()] || ''
}

/** Get flag emoji for a country name used in the app. Returns '' if unknown. */
export function getCountryFlag(countryName) {
  const iso = getCountryIso(countryName)
  return iso ? isoToFlagEmoji(iso) : ''
}

/** URL to a small flag image (e.g. for header). Uses flagcdn.com (free, no key). Size: 28x21 or 24x18. */
export function getCountryFlagImageUrl(countryName, size = '28x21') {
  const iso = getCountryIso(countryName)
  if (!iso) return ''
  const dims = size === '24x18' ? '24x18' : '28x21'
  return `https://flagcdn.com/${dims}/${iso.toLowerCase()}.png`
}
