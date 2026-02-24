// Map TopoJSON / world-atlas country names to our guide country names.
// Only countries we have guides for are clickable on the map.
import { countryNames } from './destinationsByCountry'

const TOPO_TO_OUR_NAME = {
  'United States of America': 'United States',
  'United Kingdom': 'United Kingdom',
  'Czechia': 'Czech Republic',
  'South Korea': 'South Korea',
  'Dem. Rep. Congo': null,
  'W. Sahara': null,
  'Fr. S. Antarctic Lands': null,
  'Falkland Is.': null,
  'N. Cyprus': null,
  'Somaliland': null,
  'Kosovo': null,
  'eSwatini': null,
  'Palestine': null,
  'Eq. Guinea': null,
  'Bosnia and Herz.': null,
  'Macedonia': null,
  'Dominican Rep.': null,
  'Solomon Is.': null,
  'Trinidad and Tobago': null,
  'S. Sudan': null,
  'Antarctica': null,
}

export function topoNameToOurCountry(topoName) {
  if (!topoName) return null
  const mapped = TOPO_TO_OUR_NAME[topoName]
  if (mapped !== undefined) return mapped
  return countryNames.includes(topoName) ? topoName : null
}

export function isCountryInGuides(ourCountryName) {
  return countryNames.includes(ourCountryName)
}

/** Get TopoJSON country name from our guide country name (for finding geography feature) */
export function ourCountryToTopoName(ourCountryName) {
  const reverse = {
    'United States': 'United States of America',
    'Czech Republic': 'Czechia',
  }
  return reverse[ourCountryName] || ourCountryName
}
