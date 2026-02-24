// State / region data per country. Used for "view by state" on the map.
// Only includes countries we have guides/destinations for.
// Format: country -> { stateName -> [city names] }

export const statesByCountry = {
  'United States': {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Napa Valley', 'Yosemite', 'Golden Gate Bridge'],
    'New York': ['New York', 'Statue of Liberty'],
    'Nevada': ['Las Vegas'],
    'Florida': ['Miami'],
    'Illinois': ['Chicago'],
    'Massachusetts': ['Boston'],
    'Washington DC': ['Washington DC'],
    'Washington': ['Seattle'],
    'Louisiana': ['New Orleans', 'New Orleans French Quarter'],
    'Texas': ['Austin'],
    'Tennessee': ['Nashville'],
    'Arizona': ['Grand Canyon', 'Sedona'],
    'Hawaii': ['Hawaii'],
    'Alaska': ['Alaska'],
    'Georgia': ['Savannah'],
    'South Carolina': ['Charleston'],
    'Pennsylvania': ['Philadelphia'],
    'Colorado': ['Denver'],
    'Oregon': ['Portland'],
    'New Mexico': ['Santa Fe'],
    'Utah': ['Bryce Canyon', 'Zion'],
    'Montana': ['Glacier National Park'],
    'Wyoming': ['Yellowstone'],
    'Maine': ['Acadia'],
    'North Carolina': ['Great Smoky Mountains'],
  },
  Australia: {
    'New South Wales': ['Sydney'],
    'Victoria': ['Melbourne'],
    'Queensland': ['Brisbane', 'Cairns', 'Gold Coast'],
    'Western Australia': ['Perth'],
    'South Australia': ['Adelaide'],
    'Tasmania': ['Hobart'],
  },
  'United Kingdom': {
    'England': ['London', 'Bath', 'York', 'Liverpool', 'Manchester', 'Cambridge', 'Oxford', 'Stonehenge', 'Windsor', 'Stratford-upon-Avon', 'Lake District'],
    'Scotland': ['Edinburgh', 'Scottish Highlands'],
  },
  Canada: {
    'Ontario': ['Toronto', 'Ottawa'],
    'British Columbia': ['Vancouver', 'Victoria'],
    'Quebec': ['Montreal', 'Quebec City'],
    'Alberta': ['Calgary', 'Banff'],
  },
  India: {
    'Rajasthan': ['Jaipur', 'Udaipur', 'Jodhpur', 'Pushkar', 'Ranakpur', 'Chittorgarh Fort'],
    'Maharashtra': ['Mumbai', 'Ajanta Caves', 'Ellora Caves', 'Elephanta Caves'],
    'Delhi': ['Delhi', 'Red Fort (Delhi)', 'Qutub Minar (Delhi)'],
    'Goa': ['Goa'],
    'Kerala': ['Kerala'],
    'Uttar Pradesh': ['Varanasi', 'Agra', 'Taj Mahal (Agra)', 'Fatehpur Sikri'],
    'Himachal Pradesh': ['Rishikesh'],
    'Ladakh': ['Ladakh'],
    'Punjab': ['Amritsar', 'Golden Temple (Amritsar)'],
    'Tamil Nadu': ['Mahabalipuram', 'Thanjavur', 'Madurai', 'Rameswaram', 'Chidambaram', 'Meenakshi Temple (Madurai)', 'Chola Temples (Thanjavur)', 'Chennai'],
    'Bihar': ['Bodh Gaya', 'Nalanda'],
    'Madhya Pradesh': ['Khajuraho', 'Sanchi', 'Bhimbetka'],
    'Karnataka': ['Hampi', 'Pattadakal', 'Halebidu', 'Belur', 'Shravanabelagola', 'Mysore'],
    'Odisha': ['Konark Sun Temple'],
    'Gujarat': ['Somnath', 'Rani ki vav'],
    'Andhra Pradesh': ['Tirupati'],
    'Telangana': ['Ramappa Temple', 'Hyderabad'],
    'West Bengal': ['Kolkata', 'Darjeeling'],
    'Assam': ['Kaziranga'],
  },
  Germany: {
    'Bavaria': ['Munich', 'Bavarian Alps', 'Neuschwanstein'],
    'Berlin': ['Berlin'],
    'Hamburg': ['Hamburg'],
    'North Rhine-Westphalia': ['Cologne'],
    'Hesse': ['Frankfurt'],
    'Saxony': ['Dresden'],
    'Baden-Württemberg': ['Heidelberg'],
  },
  Spain: {
    'Catalonia': ['Barcelona'],
    'Madrid': ['Madrid'],
    'Andalusia': ['Seville', 'Granada', 'Córdoba'],
    'Valencia': ['Valencia'],
    'Basque Country': ['Bilbao', 'San Sebastián'],
    'Galicia': ['Santiago de Compostela'],
    'Balearic Islands': ['Ibiza', 'Mallorca'],
    'Castile-La Mancha': ['Toledo'],
    'Castile and León': ['Segovia'],
  },
  Italy: {
    'Lazio': ['Rome'],
    'Tuscany': ['Florence', 'Siena'],
    'Veneto': ['Venice', 'Verona'],
    'Lombardy': ['Milan'],
    'Campania': ['Naples', 'Amalfi Coast'],
    'Liguria': ['Cinque Terre'],
    'Sicily': ['Sicily'],
    'Emilia-Romagna': ['Bologna'],
  },
  France: {
    'Île-de-France': ['Paris'],
    'Auvergne-Rhône-Alpes': ['Lyon', 'Chamonix'],
    "Provence-Alpes-Côte d'Azur": ['Nice', 'Marseille', 'Provence', 'French Riviera'],
    'Nouvelle-Aquitaine': ['Bordeaux'],
    'Normandy': ['Mont Saint-Michel'],
    'Grand Est': ['Strasbourg'],
  },
  Japan: {
    'Tokyo': ['Tokyo'],
    'Kyoto': ['Kyoto'],
    'Osaka': ['Osaka'],
    'Hiroshima': ['Hiroshima'],
    'Nara': ['Nara'],
    'Kanagawa': ['Hakone'],
    'Hokkaido': ['Niseko'],
    'Okinawa': ['Okinawa'],
    'Shizuoka': ['Mount Fuji'],
    'Hyogo': ['Himeji'],
  },
  Mexico: {
    'Mexico City': ['Mexico City'],
    'Quintana Roo': ['Cancún', 'Tulum', 'Playa del Carmen'],
    'Oaxaca': ['Oaxaca'],
    'Jalisco': ['Guadalajara'],
    'Baja California Sur': ['Cabo San Lucas'],
    'Guanajuato': ['Guanajuato', 'San Miguel de Allende'],
  },
}

/** Get list of state/region names for a country. Returns [] if no state data. */
export function getStatesForCountry(countryName) {
  const states = statesByCountry[countryName]
  if (!states) return []
  return Object.keys(states).sort()
}

/** Get list of city names in a given state (for a country). */
export function getCitiesInState(countryName, stateName) {
  const states = statesByCountry[countryName]
  if (!states) return []
  return states[stateName] || []
}

/** Get state/region name for a city in a country. Returns null if unknown. */
export function getStateForCity(cityName, countryName) {
  const states = statesByCountry[countryName]
  if (!states) return null
  for (const [state, cities] of Object.entries(states)) {
    if (cities.includes(cityName)) return state
  }
  return null
}

/** Check if country has state/region data. */
export function countryHasStates(countryName) {
  return Object.keys(statesByCountry[countryName] || {}).length > 0
}
