/**
 * Practical travel info per country: currency, language, emergency number, visa note, plugs.
 * Used in country guide "Practical info" section. Defaults when no entry.
 */

import { countryNames } from './destinationsByCountry'

const DEFAULT = {
  currency: 'Local currency',
  language: 'Local language(s)',
  emergency: 'Local emergency number',
  visaNote: 'Check visa requirements with your embassy or official government travel site before you go.',
  plugs: 'Check plug type and voltage for your destination (e.g. Type C, G, or A/B).',
}

/** country -> { currency, language, emergency, visaNote, plugs } */
const DATA = {
  Argentina: { currency: 'Argentine peso (ARS)', language: 'Spanish', emergency: '911', visaNote: 'Many nationalities get 90-day visa-free or e‑ta; check official requirements.', plugs: 'Type C, I — 220 V.' },
  Australia: { currency: 'Australian dollar (AUD)', language: 'English', emergency: '000', visaNote: 'ETA or eVisitor for many nationalities; apply online before travel.', plugs: 'Type I — 230 V.' },
  Austria: { currency: 'Euro (EUR)', language: 'German', emergency: '112', visaNote: 'Schengen rules apply; 90 days in 180 for many nationalities.', plugs: 'Type C, F — 230 V.' },
  Belgium: { currency: 'Euro (EUR)', language: 'Dutch, French, German', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, E — 230 V.' },
  Brazil: { currency: 'Brazilian real (BRL)', language: 'Portuguese', emergency: '192 (ambulance), 193 (fire), 190 (police)', visaNote: 'Visa or e-visa for many; check well in advance.', plugs: 'Type N (Brazilian), C — 127/220 V.' },
  Canada: { currency: 'Canadian dollar (CAD)', language: 'English, French', emergency: '911', visaNote: 'eTA required for visa-exempt nationals flying in; check official site.', plugs: 'Type A, B — 120 V.' },
  Chile: { currency: 'Chilean peso (CLP)', language: 'Spanish', emergency: '133 (police), 131 (ambulance)', visaNote: 'Many nationalities 90 days visa-free; check before travel.', plugs: 'Type C, L — 220 V.' },
  China: { currency: 'Chinese yuan (CNY)', language: 'Mandarin', emergency: '110 (police), 120 (ambulance)', visaNote: 'Visa or visa-free transit required for most; apply in advance.', plugs: 'Type A, C, I — 220 V.' },
  Colombia: { currency: 'Colombian peso (COP)', language: 'Spanish', emergency: '123', visaNote: 'Many get 90 days visa-free; check official requirements.', plugs: 'Type A, B — 110 V.' },
  Croatia: { currency: 'Euro (EUR)', language: 'Croatian', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  'Czech Republic': { currency: 'Czech koruna (CZK)', language: 'Czech', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, E — 230 V.' },
  Denmark: { currency: 'Danish krone (DKK)', language: 'Danish', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, K — 230 V.' },
  Egypt: { currency: 'Egyptian pound (EGP)', language: 'Arabic', emergency: '122', visaNote: 'Visa or e-visa for most; obtain before or on arrival (check rules).', plugs: 'Type C, F — 220 V.' },
  Finland: { currency: 'Euro (EUR)', language: 'Finnish, Swedish', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  France: { currency: 'Euro (EUR)', language: 'French', emergency: '112 or 15 (ambulance), 17 (police), 18 (fire)', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, E — 230 V.' },
  Germany: { currency: 'Euro (EUR)', language: 'German', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Greece: { currency: 'Euro (EUR)', language: 'Greek', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Hungary: { currency: 'Hungarian forint (HUF)', language: 'Hungarian', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Iceland: { currency: 'Icelandic króna (ISK)', language: 'Icelandic', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  India: { currency: 'Indian rupee (INR)', language: 'Hindi, English + many others', emergency: '112', visaNote: 'e-Visa for many nationalities; apply online before travel.', plugs: 'Type C, D, M — 230 V.' },
  Indonesia: { currency: 'Indonesian rupiah (IDR)', language: 'Indonesian', emergency: '112', visaNote: 'Visa-free or visa-on-arrival for many; check duration and conditions.', plugs: 'Type C, F — 230 V.' },
  Ireland: { currency: 'Euro (EUR)', language: 'English, Irish', emergency: '112 or 999', visaNote: 'Part of Common Travel Area with UK; visa rules vary by nationality.', plugs: 'Type G — 230 V.' },
  Israel: { currency: 'Israeli shekel (ILS)', language: 'Hebrew, Arabic', emergency: '101 (police), 102 (fire), 100 (ambulance)', visaNote: 'Visa-free for many; entry rules can be strict; check official advice.', plugs: 'Type C, H — 230 V.' },
  Italy: { currency: 'Euro (EUR)', language: 'Italian', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F, L — 230 V.' },
  Japan: { currency: 'Japanese yen (JPY)', language: 'Japanese', emergency: '110 (police), 119 (ambulance/fire)', visaNote: 'Visa-free for many for short stays; check official requirements.', plugs: 'Type A, B — 100 V.' },
  Jordan: { currency: 'Jordanian dinar (JOD)', language: 'Arabic', emergency: '911', visaNote: 'Visa or visa-on-arrival for many; Jordan Pass can include visa and sites.', plugs: 'Type C, D, F, G, J — 230 V.' },
  Kenya: { currency: 'Kenyan shilling (KES)', language: 'Swahili, English', emergency: '999 or 112', visaNote: 'e-Visa for most; apply online before travel.', plugs: 'Type G — 240 V.' },
  Malaysia: { currency: 'Malaysian ringgit (MYR)', language: 'Malay', emergency: '999', visaNote: 'Visa-free for many (e.g. 90 days); check official rules.', plugs: 'Type G — 240 V.' },
  Mexico: { currency: 'Mexican peso (MXN)', language: 'Spanish', emergency: '911', visaNote: 'Visa-free for many nationalities for tourism (up to 180 days); check rules.', plugs: 'Type A, B — 127 V.' },
  Morocco: { currency: 'Moroccan dirham (MAD)', language: 'Arabic, Berber', emergency: '112', visaNote: 'Visa-free for many; check duration and conditions.', plugs: 'Type C, E — 220 V.' },
  Netherlands: { currency: 'Euro (EUR)', language: 'Dutch', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  'New Zealand': { currency: 'New Zealand dollar (NZD)', language: 'English, Māori', emergency: '111', visaNote: 'NZeTA for visa-waiver nationals; apply before travel.', plugs: 'Type I — 230 V.' },
  Norway: { currency: 'Norwegian krone (NOK)', language: 'Norwegian', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Peru: { currency: 'Peruvian sol (PEN)', language: 'Spanish', emergency: '105 (police), 116 (health)', visaNote: 'Many nationalities 90–183 days visa-free; check before travel.', plugs: 'Type A, C — 220 V.' },
  Philippines: { currency: 'Philippine peso (PHP)', language: 'Filipino, English', emergency: '911', visaNote: 'Visa-free for many (e.g. 30 days); extendable; check rules.', plugs: 'Type A, B, C — 220 V.' },
  Poland: { currency: 'Polish złoty (PLN)', language: 'Polish', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, E — 230 V.' },
  Portugal: { currency: 'Euro (EUR)', language: 'Portuguese', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Russia: { currency: 'Russian rouble (RUB)', language: 'Russian', emergency: '112', visaNote: 'Visa required for most; apply well in advance. Check current rules.', plugs: 'Type C, F — 220 V.' },
  Singapore: { currency: 'Singapore dollar (SGD)', language: 'English, Mandarin, Malay, Tamil', emergency: '999', visaNote: 'Visa-free for many (e.g. 90 days); check official list.', plugs: 'Type G — 230 V.' },
  'South Africa': { currency: 'South African rand (ZAR)', language: '11 official (e.g. Zulu, Xhosa, English)', emergency: '10111 (police), 10177 (ambulance)', visaNote: 'Visa-free for many; check duration; some need visa.', plugs: 'Type C, M, N — 230 V.' },
  'South Korea': { currency: 'South Korean won (KRW)', language: 'Korean', emergency: '112 (police), 119 (fire/ambulance)', visaNote: 'K-ETA or visa-free for many; check official requirements.', plugs: 'Type C, F — 220 V.' },
  Spain: { currency: 'Euro (EUR)', language: 'Spanish', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Sweden: { currency: 'Swedish krona (SEK)', language: 'Swedish', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, F — 230 V.' },
  Switzerland: { currency: 'Swiss franc (CHF)', language: 'German, French, Italian, Romansh', emergency: '112', visaNote: 'Schengen; 90 days in 180 for many.', plugs: 'Type C, J — 230 V.' },
  Taiwan: { currency: 'New Taiwan dollar (TWD)', language: 'Mandarin', emergency: '110 (police), 119 (fire/ambulance)', visaNote: 'Visa-free or e-visa for many; check duration.', plugs: 'Type A, B — 110 V.' },
  Thailand: { currency: 'Thai baht (THB)', language: 'Thai', emergency: '191 (police), 1669 (ambulance)', visaNote: 'Visa-free or visa-on-arrival for many; check duration and extensions.', plugs: 'Type A, B, C — 220 V.' },
  Turkey: { currency: 'Turkish lira (TRY)', language: 'Turkish', emergency: '112', visaNote: 'e-Visa for many nationalities; apply online before travel.', plugs: 'Type C, F — 230 V.' },
  'United Arab Emirates': { currency: 'UAE dirham (AED)', language: 'Arabic', emergency: '999', visaNote: 'Visa-free or visa-on-arrival for many; check duration and conditions.', plugs: 'Type G — 230 V.' },
  'United Kingdom': { currency: 'British pound (GBP)', language: 'English', emergency: '999 or 112', visaNote: 'Visa rules depend on nationality; check UK gov travel pages.', plugs: 'Type G — 230 V.' },
  'United States': { currency: 'US dollar (USD)', language: 'English', emergency: '911', visaNote: 'ESTA or visa required for most non-citizens; check official requirements.', plugs: 'Type A, B — 120 V.' },
  Vietnam: { currency: 'Vietnamese dong (VND)', language: 'Vietnamese', emergency: '113 (police), 115 (ambulance)', visaNote: 'e-Visa or visa-free for many; check duration and entry rules.', plugs: 'Type A, C — 220 V.' },
}

export function getPracticalInfo(countryName) {
  const key = countryName?.trim()
  if (!key) return { ...DEFAULT }
  const row = DATA[key]
  return {
    currency: row?.currency ?? DEFAULT.currency,
    language: row?.language ?? DEFAULT.language,
    emergency: row?.emergency ?? DEFAULT.emergency,
    visaNote: row?.visaNote ?? DEFAULT.visaNote,
    plugs: row?.plugs ?? DEFAULT.plugs,
  }
}

export { countryNames }
