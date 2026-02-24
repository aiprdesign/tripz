// Top destinations (points of interest) within a city. Used for the city map view.
// Each POI: { name, lat, lng, categories } — categories match destinationsByCategory keys.
// Key format: "city|country" (e.g. "Paris|France").

export const cityDestinations = {
  'Paris|France': [
    { name: 'Eiffel Tower', lat: 48.8584, lng: 2.2945, categories: ['Popular destinations', 'Historical & ancient sites'] },
    { name: 'Louvre Museum', lat: 48.8606, lng: 2.3376, categories: ['Museums & culture', 'Popular destinations'] },
    { name: 'Notre-Dame Cathedral', lat: 48.8530, lng: 2.3499, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
    { name: 'Arc de Triomphe', lat: 48.8738, lng: 2.2950, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Sacré-Cœur', lat: 48.8867, lng: 2.3431, categories: ['Temples & religious sites'] },
    { name: 'Palace of Versailles', lat: 48.8049, lng: 2.1204, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Musée d\'Orsay', lat: 48.8599, lng: 2.3265, categories: ['Museums & culture'] },
    { name: 'Champs-Élysées', lat: 48.8698, lng: 2.3078, categories: ['Popular destinations', 'Nightlife & cities'] },
    { name: 'Montmartre', lat: 48.8867, lng: 2.3431, categories: ['Popular destinations', 'Food & wine'] },
    { name: 'Latin Quarter', lat: 48.8512, lng: 2.3458, categories: ['Historical & ancient sites', 'Food & wine'] },
  ],
  'London|United Kingdom': [
    { name: 'British Museum', lat: 51.5194, lng: -0.1270, categories: ['Museums & culture', 'Historical & ancient sites'] },
    { name: 'Tower of London', lat: 51.5081, lng: -0.0759, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Buckingham Palace', lat: 51.5014, lng: -0.1419, categories: ['Castles & palaces', 'Popular destinations'] },
    { name: 'Westminster Abbey', lat: 51.4994, lng: -0.1273, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
    { name: 'Big Ben', lat: 51.5007, lng: -0.1246, categories: ['Popular destinations', 'Historical & ancient sites'] },
    { name: 'Hyde Park', lat: 51.5073, lng: -0.1657, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: 'Tate Modern', lat: 51.5076, lng: -0.0994, categories: ['Museums & culture'] },
    { name: 'Camden Market', lat: 51.5432, lng: -0.1465, categories: ['Food & wine', 'Nightlife & cities'] },
    { name: 'Natural History Museum', lat: 51.4967, lng: -0.1764, categories: ['Museums & culture'] },
    { name: 'St Paul\'s Cathedral', lat: 51.5136, lng: -0.0984, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
  ],
  'Rome|Italy': [
    { name: 'Colosseum', lat: 41.8902, lng: 12.4922, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Vatican Museums', lat: 41.9065, lng: 12.4536, categories: ['Museums & culture', 'Temples & religious sites'] },
    { name: 'Trevi Fountain', lat: 41.9009, lng: 12.4833, categories: ['Popular destinations', 'Historical & ancient sites'] },
    { name: 'Pantheon', lat: 41.8986, lng: 12.4769, categories: ['Historical & ancient sites', 'Temples & religious sites'] },
    { name: 'Roman Forum', lat: 41.8925, lng: 12.4853, categories: ['Historical & ancient sites'] },
    { name: 'Sistine Chapel', lat: 41.9029, lng: 12.4545, categories: ['Museums & culture', 'Temples & religious sites'] },
    { name: 'Spanish Steps', lat: 41.9058, lng: 12.4823, categories: ['Popular destinations'] },
    { name: 'Trastevere', lat: 41.8897, lng: 12.4692, categories: ['Food & wine', 'Nightlife & cities'] },
    { name: 'Borghese Gallery', lat: 41.9142, lng: 12.4922, categories: ['Museums & culture'] },
    { name: 'Castel Sant\'Angelo', lat: 41.9031, lng: 12.4663, categories: ['Castles & palaces', 'Historical & ancient sites'] },
  ],
  'Tokyo|Japan': [
    { name: 'Senso-ji Temple', lat: 35.7148, lng: 139.7967, categories: ['Temples & religious sites', 'Popular destinations'] },
    { name: 'Shibuya Crossing', lat: 35.6595, lng: 139.7004, categories: ['Popular destinations', 'Nightlife & cities'] },
    { name: 'Imperial Palace', lat: 35.6852, lng: 139.7528, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Meiji Shrine', lat: 35.6764, lng: 139.6993, categories: ['Temples & religious sites'] },
    { name: 'teamLab Borderless', lat: 35.6251, lng: 139.7756, categories: ['Museums & culture', 'Popular destinations'] },
    { name: 'Tsukiji Outer Market', lat: 35.6654, lng: 139.7707, categories: ['Food & wine'] },
    { name: 'Akihabara', lat: 35.6982, lng: 139.7744, categories: ['Popular destinations', 'Nightlife & cities'] },
    { name: 'Tokyo Skytree', lat: 35.7101, lng: 139.8107, categories: ['Popular destinations'] },
    { name: 'Ueno Park', lat: 35.7148, lng: 139.7744, categories: ['Museums & culture', 'Adventure & outdoor'] },
    { name: 'Harajuku', lat: 35.6702, lng: 139.7027, categories: ['Popular destinations', 'Food & wine'] },
  ],
  'New York|United States': [
    { name: 'Statue of Liberty', lat: 40.6892, lng: -74.0445, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Central Park', lat: 40.7829, lng: -73.9654, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: 'Metropolitan Museum of Art', lat: 40.7794, lng: -73.9632, categories: ['Museums & culture'] },
    { name: 'Times Square', lat: 40.7580, lng: -73.9855, categories: ['Popular destinations', 'Nightlife & cities'] },
    { name: 'Empire State Building', lat: 40.7484, lng: -73.9857, categories: ['Popular destinations', 'Historical & ancient sites'] },
    { name: 'Brooklyn Bridge', lat: 40.7061, lng: -73.9969, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Museum of Natural History', lat: 40.7813, lng: -73.9740, categories: ['Museums & culture'] },
    { name: 'High Line', lat: 40.7480, lng: -74.0048, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: '9/11 Memorial', lat: 40.7114, lng: -74.0125, categories: ['Historical & ancient sites', 'Museums & culture'] },
    { name: 'Broadway', lat: 40.7614, lng: -73.9776, categories: ['Nightlife & cities', 'Popular destinations'] },
  ],
  'Barcelona|Spain': [
    { name: 'Sagrada Família', lat: 41.4036, lng: 2.1744, categories: ['Temples & religious sites', 'Popular destinations'] },
    { name: 'Park Güell', lat: 41.4145, lng: 2.1527, categories: ['Popular destinations', 'Museums & culture'] },
    { name: 'La Rambla', lat: 41.3856, lng: 2.1700, categories: ['Popular destinations', 'Food & wine', 'Nightlife & cities'] },
    { name: 'Casa Batlló', lat: 41.3917, lng: 2.1649, categories: ['Museums & culture', 'Historical & ancient sites'] },
    { name: 'Gothic Quarter', lat: 41.3830, lng: 2.1769, categories: ['Historical & ancient sites', 'Food & wine'] },
    { name: 'Camp Nou', lat: 41.3809, lng: 2.1228, categories: ['Popular destinations'] },
    { name: 'Picasso Museum', lat: 41.3852, lng: 2.1812, categories: ['Museums & culture'] },
    { name: 'Barceloneta Beach', lat: 41.3784, lng: 2.1920, categories: ['Beaches & islands', 'Popular destinations'] },
    { name: 'Casa Milà (La Pedrera)', lat: 41.3954, lng: 2.1619, categories: ['Museums & culture', 'Historical & ancient sites'] },
    { name: 'Montjuïc', lat: 41.3633, lng: 2.1652, categories: ['Popular destinations', 'Adventure & outdoor'] },
  ],
  'Kyoto|Japan': [
    { name: 'Fushimi Inari Shrine', lat: 34.9671, lng: 135.7727, categories: ['Temples & religious sites', 'Popular destinations'] },
    { name: 'Kinkaku-ji (Golden Pavilion)', lat: 35.0394, lng: 135.7292, categories: ['Temples & religious sites', 'Castles & palaces'] },
    { name: 'Kiyomizu-dera', lat: 34.9949, lng: 135.7850, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
    { name: 'Arashiyama Bamboo Grove', lat: 35.0094, lng: 135.6722, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: 'Gion', lat: 35.0037, lng: 135.7751, categories: ['Historical & ancient sites', 'Food & wine'] },
    { name: 'Ryoan-ji', lat: 35.0346, lng: 135.7180, categories: ['Temples & religious sites'] },
    { name: 'Nijo Castle', lat: 35.0142, lng: 135.7481, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Philosopher\'s Path', lat: 35.0272, lng: 135.7931, categories: ['Temples & religious sites', 'Adventure & outdoor'] },
    { name: 'Nishiki Market', lat: 35.0052, lng: 135.7682, categories: ['Food & wine'] },
    { name: 'Sanjusangendo', lat: 34.9878, lng: 135.7703, categories: ['Temples & religious sites'] },
  ],
  'Istanbul|Turkey': [
    { name: 'Hagia Sophia', lat: 41.0086, lng: 28.9802, categories: ['Temples & religious sites', 'Historical & ancient sites', 'Museums & culture'] },
    { name: 'Blue Mosque', lat: 41.0054, lng: 28.9768, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
    { name: 'Grand Bazaar', lat: 41.0106, lng: 28.9681, categories: ['Popular destinations', 'Food & wine'] },
    { name: 'Topkapi Palace', lat: 41.0115, lng: 28.9833, categories: ['Castles & palaces', 'Museums & culture'] },
    { name: 'Bosphorus', lat: 41.0422, lng: 29.0067, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: 'Basilica Cistern', lat: 41.0084, lng: 28.9782, categories: ['Historical & ancient sites'] },
    { name: 'Spice Bazaar', lat: 41.0163, lng: 28.9706, categories: ['Food & wine'] },
    { name: 'Galata Tower', lat: 41.0258, lng: 28.9744, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Sultanahmet', lat: 41.0064, lng: 28.9762, categories: ['Historical & ancient sites'] },
    { name: 'Istiklal Street', lat: 41.0340, lng: 28.9850, categories: ['Nightlife & cities', 'Food & wine'] },
  ],
  'Delhi|India': [
    { name: 'Red Fort', lat: 28.6562, lng: 77.2410, categories: ['Historical & ancient sites', 'Castles & palaces'] },
    { name: 'Qutub Minar', lat: 28.5244, lng: 77.1855, categories: ['Historical & ancient sites', 'Temples & religious sites'] },
    { name: 'Akshardham Temple', lat: 28.6127, lng: 77.2773, categories: ['Temples & religious sites', 'Museums & culture'] },
    { name: 'India Gate', lat: 28.6129, lng: 77.2295, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Humayun\'s Tomb', lat: 28.5933, lng: 77.2507, categories: ['Historical & ancient sites'] },
    { name: 'Jama Masjid', lat: 28.6506, lng: 77.2332, categories: ['Temples & religious sites', 'Historical & ancient sites'] },
    { name: 'Lotus Temple', lat: 28.5535, lng: 77.2588, categories: ['Temples & religious sites'] },
    { name: 'Lodi Gardens', lat: 28.5931, lng: 77.2197, categories: ['Historical & ancient sites', 'Adventure & outdoor'] },
    { name: 'Chandni Chowk', lat: 28.6519, lng: 77.2315, categories: ['Food & wine', 'Popular destinations'] },
    { name: 'Swaminarayan Akshardham', lat: 28.6127, lng: 77.2773, categories: ['Temples & religious sites'] },
  ],
  'Agra|India': [
    { name: 'Taj Mahal', lat: 27.1751, lng: 78.0421, categories: ['Historical & ancient sites', 'Popular destinations'] },
    { name: 'Agra Fort', lat: 27.1797, lng: 78.0211, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Fatehpur Sikri', lat: 27.0945, lng: 77.6670, categories: ['Historical & ancient sites', 'Castles & palaces'] },
    { name: 'Itmad-ud-Daulah', lat: 27.1842, lng: 78.0428, categories: ['Historical & ancient sites'] },
    { name: 'Mehtab Bagh', lat: 27.1778, lng: 78.0442, categories: ['Popular destinations', 'Adventure & outdoor'] },
    { name: 'Jama Masjid (Agra)', lat: 27.1797, lng: 78.0210, categories: ['Temples & religious sites'] },
    { name: 'Akbar\'s Tomb', lat: 27.2206, lng: 77.9504, categories: ['Historical & ancient sites'] },
  ],
  'Jaipur|India': [
    { name: 'Amber Fort', lat: 26.9855, lng: 75.8513, categories: ['Castles & palaces', 'Historical & ancient sites'] },
    { name: 'Hawa Mahal', lat: 26.9239, lng: 75.8267, categories: ['Castles & palaces', 'Popular destinations'] },
    { name: 'City Palace', lat: 26.9258, lng: 75.8236, categories: ['Castles & palaces', 'Museums & culture'] },
    { name: 'Jantar Mantar', lat: 26.9249, lng: 75.8245, categories: ['Historical & ancient sites'] },
    { name: 'Jal Mahal', lat: 26.9532, lng: 75.8466, categories: ['Castles & palaces', 'Popular destinations'] },
    { name: 'Albert Hall Museum', lat: 26.9110, lng: 75.8120, categories: ['Museums & culture'] },
  ],
}

/** Get POIs for a city. Returns [] if no data. */
export function getCityDestinations(cityName, countryName) {
  const key = `${cityName}|${countryName}`
  return cityDestinations[key] || []
}

/** List of [city, country] that have city-level POI data (for dropdowns). */
export function getCitiesWithDestinations() {
  return Object.keys(cityDestinations).map((key) => {
    const [city, country] = key.split('|')
    return { city, country, label: `${city}, ${country}` }
  })
}

/** Check if we have POI data for this city. */
export function hasCityDestinations(cityName, countryName) {
  return !!cityDestinations[`${cityName}|${countryName}`]
}
