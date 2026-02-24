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

/** Tips for women travelers — show when safety is not High; country-specific or default. */
const SAFETY_WOMEN_TIPS = {
  default: [
    'Dress in line with local norms to avoid unwanted attention.',
    'Avoid walking alone at night in unfamiliar or poorly lit areas.',
    'Use registered taxis or ride apps; share your trip with someone.',
    'Keep copies of ID and emergency numbers; know the local emergency code.',
  ],
  variable: [
    'Stick to well-known areas and daytime activities when alone.',
    'Dress conservatively; research local dress codes before you go.',
    'Use hotel safes; avoid flashing phones or valuables.',
    'Trust your instincts; leave if a place or person feels off.',
  ],
  caution: [
    'Travel with a companion or group when possible.',
    'Dress very conservatively; cover shoulders and knees in public.',
    'Avoid going out alone after dark; use trusted transport only.',
    'Register with your embassy; keep emergency contacts handy.',
  ],
}

/** Tips for foreigners to stay safe — country-specific or default. */
const SAFETY_FOREIGNERS_TIPS = {
  default: [
    'Keep copies of passport and visa; know your embassy contact.',
    'Use ATMs in secure locations; avoid carrying large amounts of cash.',
    'Stay aware of local scams targeting tourists.',
    'Follow local laws and customs; when in doubt, ask.',
  ],
  moderate: [
    'Stick to tourist areas at night; avoid isolated spots.',
    'Use official or recommended transport; agree on fares in advance.',
    'Don’t flash expensive items; use a money belt or hidden pouch.',
    'Check travel advisories and register with your embassy.',
  ],
  variable: [
    'Research no-go areas; avoid political rallies or demonstrations.',
    'Use only licensed taxis or ride apps; avoid unmarked cars.',
    'Keep a low profile; avoid discussing sensitive topics in public.',
    'Have a local SIM or roaming; share your itinerary with someone.',
  ],
}

function getSafetyWomenTips(level, countryKey) {
  if (level === 'High') return ['Standard precautions: keep valuables secure, stay aware of surroundings.']
  if (level === 'Variable') return SAFETY_WOMEN_TIPS.variable
  if (level === 'Caution') return SAFETY_WOMEN_TIPS.caution
  return SAFETY_WOMEN_TIPS.default
}

function getSafetyForeignersTips(level, countryKey) {
  if (level === 'High') return ['Standard precautions: keep documents safe, be aware of common scams.']
  if (level === 'Variable' || level === 'Caution') return SAFETY_FOREIGNERS_TIPS.variable
  if (level === 'Moderate') return SAFETY_FOREIGNERS_TIPS.moderate
  return SAFETY_FOREIGNERS_TIPS.default
}

/** Labels for laws level so visitors know what to expect */
export const LAWS_LABELS = {
  'Fewer': 'Fewer regulations — generally lighter rules and paperwork for visitors.',
  'Many': 'Many rules — moderate regulation; expect some formalities and local laws.',
  'Too many': 'Complex / strict — lots of laws and procedures; research visas, permits, and local rules.',
}

/** Gauge: best (dark green), good (light green), alert (yellow), bad (red) */
export function safetyToGauge(value) {
  if (value === 'High') return 'best'
  if (value === 'Moderate') return 'good'
  if (value === 'Variable') return 'alert'
  if (value === 'Caution') return 'bad'
  return 'good'
}

export function friendlinessToGauge(value) {
  if (value === 'High') return 'best'
  if (value === 'Moderate') return 'good'
  if (value === 'Low') return 'alert'
  return 'good'
}

export function lawsToGauge(laws) {
  if (laws === 'Fewer') return 'best'
  if (laws === 'Many') return 'good'
  if (laws === 'Too many') return 'bad'
  return 'good'
}

/** Estimated total laws (national + subnational) per country — indicative figures. */
const LAWS_ESTIMATE = {
  Argentina: 95000, Australia: 120000, Austria: 85000, Belgium: 105000, Brazil: 185000, Canada: 115000, Chile: 78000,
  China: 280000, Colombia: 92000, Croatia: 72000, 'Czech Republic': 75000, Denmark: 70000, Egypt: 145000, Finland: 68000,
  France: 135000, Germany: 165000, Greece: 88000, Hungary: 82000, Iceland: 45000, India: 250000, Indonesia: 125000,
  Ireland: 75000, Israel: 95000, Italy: 155000, Japan: 145000, Jordan: 78000, Kenya: 98000, Malaysia: 88000,
  Mexico: 135000, Morocco: 85000, Netherlands: 95000, 'New Zealand': 65000, Norway: 72000, Peru: 82000, Philippines: 95000,
  Poland: 92000, Portugal: 88000, Russia: 165000, Singapore: 115000, 'South Africa': 105000, 'South Korea': 125000,
  Spain: 115000, Sweden: 78000, Switzerland: 95000, Taiwan: 88000, Thailand: 92000, Turkey: 115000, 'United Arab Emirates': 95000,
  'United Kingdom': 125000, 'United States': 195000, Vietnam: 85000,
}

/** USA: states often cited as among the most regulated (business, environment, labor, consumer, etc.). */
export const USA_MOST_REGULATED_STATES = [
  'California', 'New York', 'New Jersey', 'Massachusetts', 'Hawaii', 'Illinois', 'Connecticut', 'Washington',
]

/** USA-only: note that each state has its own laws. */
export const USA_LAWS_SUBNATIONAL_NOTE = 'Each state has its own laws—federal rules apply nationwide, but state and local rules vary a lot (e.g. alcohol, cannabis, guns, employment). Check the state you’re in.'

/** Short note on attitude towards foreigners (optional; complements friendlinessForeigners). */
const ATTITUDE_FOREIGNERS_NOTE = {
  Japan: 'Generally polite and helpful; tourists are welcomed. In rural areas or with no Japanese, expect some language barrier; fewer stares than in some other destinations.',
  China: 'Mixed in big cities; tourists often welcomed in designated areas. Outside main hubs, foreigners can draw attention; follow local norms and avoid sensitive topics.',
  'South Korea': 'Tourists generally welcomed, especially in Seoul and Busan. Older generations may be less used to diversity; younger people and tourist areas are used to foreigners.',
  India: 'Hospitality is strong; tourists often welcomed. Staring and curiosity are common. Scams targeting foreigners occur in tourist hubs—stay alert without assuming ill intent.',
  Egypt: 'Tourists are economically important; many locals are friendly. Persistent touts and occasional harassment (especially for women) occur; dress modestly and be firm with boundaries.',
  Russia: 'Varies by city and context. In Moscow/St Petersburg, tourists are common. Outside major cities, foreigners may attract curiosity; avoid political discussions.',
  'United Arab Emirates': 'Very used to foreigners and diverse residents. Generally welcoming; respect local laws and dress codes.',
  'United States': 'Varies by region; most tourist areas are diverse and used to visitors. Some rural areas less so; racial dynamics differ by place—research and trust your instincts.',
  France: 'Paris and major cities are used to tourists; service can feel brusque. Outside cities, smaller towns may be less used to non-white or non-European visitors.',
  Germany: 'Generally welcoming to tourists; big cities are multicultural. Rare incidents of hostility reported; most visitors have no issues.',
  Italy: 'Tourist areas very used to visitors. In the south and smaller towns, stares or curiosity possible; generally not hostile.',
  Brazil: 'Generally warm and welcoming. Safety varies by area regardless of race; tourists of all backgrounds should take normal precautions.',
  'South Africa': 'Complex; tourism is valued. Racial dynamics from apartheid era persist; most visitors have positive experiences in tourist areas.',
  Thailand: 'Very used to tourists; generally friendly and welcoming. Scams exist in tourist zones; overall attitude to foreigners is positive.',
  Vietnam: 'Tourists welcomed; war legacy rarely affects modern visitor experience. Curiosity rather than hostility in rural areas.',
  Morocco: 'Used to tourists; hospitality is valued. Touts and hassle in medinas can feel intense; generally not hostile to foreigners.',
  Turkey: 'Tourists welcomed in most areas. Istanbul and coast are used to diversity; eastern regions less so. Political topics best avoided.',
}

/** Race-specific precautions per country (key = country, value = { [race]: string }). */
const RACE_PRECAUTIONS = {
  'United States': { Black: 'Racial dynamics vary greatly by region. Most tourist areas are diverse; research your destinations. Avoid assuming all areas are equally welcoming; trust local advice and your instincts.', 'East Asian': 'Asian Americans report varying experiences by region. Tourist hubs and coastal cities are generally fine; isolated incidents of hostility have been reported—stay aware, not fearful.', 'South Asian': 'Diverse cities are used to South Asian visitors. In less diverse areas you may get curiosity; generally no specific precautions beyond normal travel safety.' },
  China: { Black: 'Foreigners of all backgrounds can draw attention outside major hubs. In big cities, African students and travelers exist; in rural areas, staring or curiosity is more common. Not typically hostile.', 'East Asian': 'Non-Chinese East Asians may be assumed to be Chinese until you speak; generally no specific race-based precautions.' },
  Japan: { Black: 'Tourists are generally welcomed. Occasional staring or curiosity in rural areas; rare reports of refusal of service. Major cities are used to diverse visitors.', 'East Asian': 'Korean and other East Asian visitors are common; generally no specific precautions.' },
  France: { Black: 'Paris and big cities are multicultural. In smaller towns, Black travelers sometimes report extra scrutiny or awkwardness; rarely hostile. Police checks can be more frequent for non-white people.', 'North African': 'Complex dynamics; identity checks and discrimination reported by some. Tourist areas generally fine; be aware of tensions in certain suburbs.' },
  Italy: { Black: 'Tourist areas see many visitors of all backgrounds. Isolated incidents of racism reported; overall, most visitors have no issues. South and rural areas may show more curiosity.' },
  'United Arab Emirates': { Black: 'Very diverse resident population; African and other Black visitors are common. Generally welcoming; follow local laws and dress codes.' },
  India: { Black: 'Hospitality is strong; curiosity and staring common. Some travelers report extra attention (positive or negative). Tourist circuit is used to international visitors.' },
  Egypt: { Black: 'African and Black tourists visit; touts can be persistent. No specific hostility reported; same general advice as for all travelers (dress modestly, be firm with touts).' },
  Russia: { Black: 'Moscow and St Petersburg are more cosmopolitan; non-white travelers have reported occasional stares or curiosity. Rare incidents of hostility; avoid confrontations.' },
  Brazil: { Black: 'Brazil is racially diverse; many Brazilians are Black or mixed. Generally welcoming; same safety advice applies to everyone. Racial dynamics differ from the US.' },
  'South Africa': { White: 'Post-apartheid dynamics; most tourist areas are fine. Be mindful of economic inequality and avoid insensitive comments.', Black: 'Fellow African and diaspora visitors are welcomed. Tourist areas are used to international visitors of all backgrounds.' },
  Germany: { Black: 'Big cities are diverse; most visitors have no issues. Rare reports of hostility in eastern regions; generally welcoming.' },
  'United Kingdom': { Black: 'Very diverse, especially in cities. Most visitors report no race-based issues; same general safety and awareness as elsewhere.' },
}

/** Get safety, friendliness, laws, mental health prevalence, risk likelihood, gauge levels, and estimated laws for a country. */
export function getCountryVisitorInfo(countryName) {
  const key = countryName?.trim()
  if (!key) {
    return {
      ...DEFAULT,
      cancerRisk: RISK_DEFAULT.cancerRisk,
      accidentRisk: RISK_DEFAULT.accidentRisk,
      mentalHealthRisk: RISK_DEFAULT.mentalHealthRisk,
      lawsLabel: LAWS_LABELS[DEFAULT.laws],
      safetyWomenGauge: safetyToGauge(DEFAULT.safetyWomen),
      safetyForeignersGauge: safetyToGauge(DEFAULT.safetyForeigners),
      friendlinessGauge: friendlinessToGauge(DEFAULT.friendlinessForeigners),
      lawsGauge: lawsToGauge(DEFAULT.laws),
      lawsEstimate: 100000,
      safetyWomenTips: getSafetyWomenTips(DEFAULT.safetyWomen),
      safetyForeignersTips: getSafetyForeignersTips(DEFAULT.safetyForeigners),
      attitudeForeignersNote: null,
      racePrecautions: null,
    }
  }
  const row = DATA[key]
  const safetyWomen = row?.safetyWomen ?? DEFAULT.safetyWomen
  const safetyForeigners = row?.safetyForeigners ?? DEFAULT.safetyForeigners
  const friendlinessForeigners = row?.friendlinessForeigners ?? DEFAULT.friendlinessForeigners
  const laws = row?.laws ?? DEFAULT.laws
  const mentalHealthPct = row?.mentalHealthPct ?? DEFAULT.mentalHealthPct
  const mentalHealthNote = row?.mentalHealthNote ?? DEFAULT.mentalHealthNote
  const risks = RISK_DATA[key] || RISK_DEFAULT
  const lawsEstimate = LAWS_ESTIMATE[key] ?? 100000
  const isUSA = key === 'United States'
  return {
    safetyWomen,
    safetyForeigners,
    friendlinessForeigners,
    laws,
    lawsLabel: LAWS_LABELS[laws] || LAWS_LABELS['Many'],
    mentalHealthPct,
    mentalHealthNote,
    cancerRisk: risks.cancerRisk,
    accidentRisk: risks.accidentRisk,
    mentalHealthRisk: risks.mentalHealthRisk,
    safetyWomenGauge: safetyToGauge(safetyWomen),
    safetyForeignersGauge: safetyToGauge(safetyForeigners),
    friendlinessGauge: friendlinessToGauge(friendlinessForeigners),
    lawsGauge: lawsToGauge(laws),
    lawsEstimate,
    lawsSubnationalNote: isUSA ? USA_LAWS_SUBNATIONAL_NOTE : null,
    mostRegulatedStates: isUSA ? USA_MOST_REGULATED_STATES : null,
    attitudeForeignersNote: ATTITUDE_FOREIGNERS_NOTE[key] || null,
    racePrecautions: RACE_PRECAUTIONS[key] && typeof RACE_PRECAUTIONS[key] === 'object' ? RACE_PRECAUTIONS[key] : null,
    safetyWomenTips: getSafetyWomenTips(safetyWomen, key),
    safetyForeignersTips: getSafetyForeignersTips(safetyForeigners, key),
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

/** Fields users can suggest corrections for (value = key in visitor info). */
export const STAT_FIELDS_FOR_SUGGESTIONS = [
  { value: 'safetyWomen', label: 'Safety for women' },
  { value: 'safetyForeigners', label: 'Safety for foreigners' },
  { value: 'friendlinessForeigners', label: 'Friendliness to foreigners' },
  { value: 'laws', label: 'Laws (Fewer / Many / Too many)' },
  { value: 'mentalHealthPct', label: 'Mental health %' },
  { value: 'mentalHealthNote', label: 'Mental health note' },
  { value: 'lawsEstimate', label: 'Est. number of laws' },
  { value: 'cancerRisk', label: 'Cancer risk' },
  { value: 'accidentRisk', label: 'Accident risk' },
  { value: 'mentalHealthRisk', label: 'Mental health risk' },
]
