// Guide content per country: why visit, when to go, must-sees, experiences.
// Used for Explore to help users discover the best of every country.
import { destinationsByCountry } from './destinationsByCountry'

const GUIDES = {
  France: {
    blurb: 'Art, wine, and joie de vivre. From Parisian cafés to Provençal lavender and Alpine peaks, France delivers the trip of a lifetime.',
    bestTime: 'April–June and September–October for mild weather and fewer crowds. December for Christmas markets.',
    experiences: [
      'Watch the Eiffel Tower sparkle at night',
      'Wine-taste in Bordeaux or Burgundy',
      'Wander lavender fields in Provence',
      'Climb Mont Saint-Michel at high tide',
      'Ski or hike in Chamonix',
    ],
  },
  Japan: {
    blurb: 'Ancient temples and neon cities, cherry blossoms and bullet trains. Japan balances tradition and future like nowhere else.',
    bestTime: 'March–April for cherry blossoms; October–November for autumn leaves. Avoid rainy June and humid August.',
    experiences: [
      'Temple-hop in Kyoto at sunrise',
      'Eat at a Tokyo ramen or sushi counter',
      'Soak in an onsen in Hakone',
      'See Mount Fuji from the Shinkansen',
      'Stay in a ryokan and wear a yukata',
    ],
  },
  Italy: {
    blurb: 'Food, art, and la dolce vita. Roman ruins, Renaissance masterpieces, and coastlines that define romance.',
    bestTime: 'April–May and September–October. Summer is hot and crowded; winter is quiet in cities.',
    experiences: [
      'Throw a coin in the Trevi Fountain',
      'Eat pasta and gelato in Florence',
      'Sail or drive the Amalfi Coast',
      'See the Sistine Chapel in Rome',
      'Wander Cinque Terre villages',
    ],
  },
  Spain: {
    blurb: 'Siesta, tapas, and fiesta. From Gaudí to flamenco and sun-soaked islands, Spain never stops giving.',
    bestTime: 'Spring (April–May) and fall (September–October). July–August is hot; winter is mild in the south.',
    experiences: [
      'Eat tapas in Barcelona or Madrid',
      'Visit the Alhambra in Granada',
      'Walk the Camino de Santiago',
      'Party in Ibiza or relax in Mallorca',
      'See flamenco in Seville',
    ],
  },
  'United Kingdom': {
    blurb: 'History, pubs, and dramatic landscapes. London’s buzz, Edinburgh’s charm, and the wild beauty of Scotland and Wales.',
    bestTime: 'May–September for long days and festivals. December for Christmas lights and markets.',
    experiences: [
      'Have afternoon tea in London',
      'Explore Edinburgh’s Old Town',
      'Hike the Scottish Highlands',
      'Visit Stonehenge at sunrise',
      'Pub-crawl in Dublin or Belfast',
    ],
  },
  Thailand: {
    blurb: 'Temples, street food, and beaches. Smiles, spice, and value that keep travellers coming back.',
    bestTime: 'November–February (cool, dry). March–May is hot; June–October is rainy but lush.',
    experiences: [
      'Eat pad thai from a street cart',
      'Visit temples at dawn in Chiang Mai',
      'Island-hop in the Andaman Sea',
      'Float in a longtail boat in Krabi',
      'Full moon party or quiet beach in Koh Samui',
    ],
  },
  Greece: {
    blurb: 'Blue domes, olive groves, and mythic ruins. Sun, sea, and hospitality that feel like coming home.',
    bestTime: 'April–June and September–October. July–August is peak heat and crowds on islands.',
    experiences: [
      'Watch sunset in Oia, Santorini',
      'Climb the Acropolis in Athens',
      'Sail the Cyclades',
      'Eat fresh fish on a harbour',
      'Explore ancient Delphi or Meteora',
    ],
  },
  Portugal: {
    blurb: 'Tiles, trams, and dramatic coastlines. Underrated food, wine, and warmth without the crowds.',
    bestTime: 'April–June and September–October. Summer is busy on the Algarve; winter is mild in Lisbon.',
    experiences: [
      'Ride Tram 28 in Lisbon',
      'Taste port in Porto’s cellars',
      'Surf or relax on the Algarve',
      'Visit Sintra’s palaces',
      'Hike or whale-watch in the Azores',
    ],
  },
  Iceland: {
    blurb: 'Fire and ice: glaciers, geysers, and northern lights. Otherworldly landscapes at the edge of the Arctic.',
    bestTime: 'June–August for midnight sun; September–March for aurora. Winter is cold but magical.',
    experiences: [
      'Chase the northern lights',
      'Soak in the Blue Lagoon',
      'Drive the Golden Circle',
      'Walk on a glacier',
      'See waterfalls and black-sand beaches',
    ],
  },
  Australia: {
    blurb: 'Beaches, reefs, and outback. Laid-back cities, unique wildlife, and distances worth every mile.',
    bestTime: 'September–November and March–May. December–February is summer (hot north); June–August is mild south.',
    experiences: [
      'Snorkel the Great Barrier Reef',
      'Climb the Sydney Harbour Bridge',
      'Road-trip the Great Ocean Road',
      'Meet wildlife on Kangaroo Island',
      'Explore Uluru at sunset',
    ],
  },
  Mexico: {
    blurb: 'Ancient ruins, tacos, and coastlines. Colour, culture, and warmth from the highlands to the Caribbean.',
    bestTime: 'November–April (dry). May–October is rainy but lush; avoid hurricane season on the Gulf (Aug–Oct).',
    experiences: [
      'Eat tacos al pastor in Mexico City',
      'Swim in cenotes near Tulum',
      'Visit Chichen Itzá at opening',
      'Explore Oaxaca’s markets and mezcal',
      'Relax on Playa del Carmen or Cabo',
    ],
  },
  Peru: {
    blurb: 'Inca trails, Amazon, and Andean peaks. Machu Picchu is just the start of an unforgettable journey.',
    bestTime: 'May–September (dry, best for trekking). December–March is rainy but fewer crowds.',
    experiences: [
      'Sunrise at Machu Picchu',
      'Trek the Inca Trail',
      'Explore Cusco and Sacred Valley',
      'Cruise or stay in the Amazon',
      'Taste ceviche in Lima',
    ],
  },
  'New Zealand': {
    blurb: 'Mountains, fjords, and adventure. Middle-earth landscapes and a culture built on the outdoors.',
    bestTime: 'December–February (summer). March–May and September–November for fewer crowds and mild weather.',
    experiences: [
      'Cruise Milford Sound',
      'Bungee jump in Queenstown',
      'Hike Tongariro or Routeburn',
      'Visit Hobbiton',
      'Stargaze in Tekapo’s dark sky reserve',
    ],
  },
  Vietnam: {
    blurb: 'Pho, lanterns, and limestone karsts. Bustling cities, serene bays, and food that changes the way you travel.',
    bestTime: 'November–April (dry in south); February–April (best in north). May–October is hot and rainy.',
    experiences: [
      'Sail Halong Bay on a junk',
      'Eat pho in Hanoi’s Old Quarter',
      'Lanterns and tailoring in Hội An',
      'Ride a scooter in Ho Chi Minh City',
      'Trek Sapa’s rice terraces',
    ],
  },
  Morocco: {
    blurb: 'Souks, Sahara, and mint tea. A short hop from Europe into another world of colour and hospitality.',
    bestTime: 'March–May and September–November. Summer is very hot; winter is cold in the mountains.',
    experiences: [
      'Get lost in Marrakech’s medina',
      'Spend a night in the Sahara',
      'Wander the blue streets of Chefchaouen',
      'Haggle in Fes souks',
      'Surf or relax in Essaouira',
    ],
  },
  India: {
    blurb: 'Temples, spices, and soul. From UNESCO cave temples and Chola dynasties to the Taj and the Ganges—overwhelming in the best way.',
    bestTime: 'October–March (cool, dry). April–June is hot; July–September is monsoon (lush but humid). Winter is ideal for Rajasthan and the north.',
    experiences: [
      'See the Taj Mahal at dawn in Agra',
      'Temple-hop: Khajuraho, Madurai Meenakshi, Konark, Thanjavur Brihadisvara',
      'Cave temples: Ajanta, Ellora, Elephanta',
      'Varanasi at sunrise on the Ganges',
      'Rajasthan forts: Jaipur, Udaipur, Chittorgarh, Jaisalmer',
      'Bodh Gaya and Sanchi (Buddhist heritage)',
      'Golden Temple Amritsar and langar',
      'Backwaters and ayurveda in Kerala',
      'Hampi and Pattadakal (ruins and temples)',
    ],
  },
  'United States': {
    blurb: 'From coast to coast: world-class cities, national parks, and epic road trips. One country, endless ways to explore.',
    bestTime: 'Spring and fall for most regions; summer for parks and coasts; winter for ski and sun (South, Southwest).',
    experiences: [
      'Road-trip Route 66 or Pacific Coast Highway',
      'Grand Canyon, Zion, Bryce, Yellowstone, Yosemite',
      'New York, San Francisco, New Orleans, Nashville',
      'Statue of Liberty, Golden Gate Bridge, French Quarter',
      'Music and food in Nashville or Austin',
      'Hike Glacier, Acadia, Great Smoky Mountains',
    ],
  },
  Canada: {
    blurb: 'Wilderness, cities, and kindness. Lakes, mountains, and a quality of life that draws visitors back.',
    bestTime: 'June–August for lakes and hiking; September–October for fall colours; December–March for ski and aurora.',
    experiences: [
      'Hike and canoe in Banff',
      'Explore Montreal’s food and culture',
      'See Niagara Falls',
      'Whale-watch on the coasts',
      'Experience Toronto or Vancouver',
    ],
  },
  Turkey: {
    blurb: 'East meets west: bazaars, hot air balloons, and ancient ruins. History and hospitality on two continents.',
    bestTime: 'April–May and September–October. Summer is hot; Cappadocia is magical in winter snow.',
    experiences: [
      'Hot air balloon over Cappadocia',
      'Explore Istanbul’s mosques and bazaars',
      'Swim in Pamukkale’s travertines',
      'Visit Ephesus at dawn',
      'Sail the Turquoise Coast',
    ],
  },
  Egypt: {
    blurb: 'Pyramids, Nile, and pharaohs. The cradle of civilisation still delivers wonder at every turn.',
    bestTime: 'October–April (cool). May–September is very hot. Red Sea is year-round.',
    experiences: [
      'Stand before the Pyramids of Giza',
      'Cruise the Nile to Luxor',
      'Explore Karnak and Valley of the Kings',
      'Dive the Red Sea',
      'Wander Cairo’s Khan el-Khalili',
    ],
  },
  'South Africa': {
    blurb: 'Safari, wine, and two oceans. Wildlife, landscapes, and cities that surprise and inspire.',
    bestTime: 'May–September for game viewing; November–February for beach and Cape. Whale season June–November.',
    experiences: [
      'Safari in Kruger or private reserve',
      'Table Mountain and Cape Town',
      'Drive the Garden Route',
      'Wine-taste in Stellenbosch',
      'See penguins at Boulders Beach',
    ],
  },
  Netherlands: {
    blurb: 'Canals, tulips, and cycling. Compact, charming, and easy to fall in love with.',
    bestTime: 'April–May for tulips; June–August for long days. December for cosy Christmas.',
    experiences: [
      'Cycle Amsterdam’s canals',
      'Visit Keukenhof in spring',
      'See Van Goghs and Rembrandts',
      'Explore Giethoorn by boat',
      'Try stroopwafels and bitterballen',
    ],
  },
  Germany: {
    blurb: 'Castles, beer gardens, and forests. History, efficiency, and Gemütlichkeit from Berlin to Bavaria.',
    bestTime: 'May–September; December for Christmas markets. Oktoberfest is late September.',
    experiences: [
      'Neuschwanstein and Bavarian castles',
      'Berlin’s history and nightlife',
      'Oktoberfest in Munich',
      'Romantic Road and Heidelberg',
      'Christmas markets in winter',
    ],
  },
  Croatia: {
    blurb: 'Adriatic coast, Game of Thrones walls, and island-hopping. Europe’s secret (not for long) is out.',
    bestTime: 'May–June and September for sun without crowds. July–August is peak and hot.',
    experiences: [
      'Walk Dubrovnik’s walls at sunset',
      'Island-hop from Split or Hvar',
      'Plitvice Lakes National Park',
      'Sail the Dalmatian coast',
      'Wine and truffles in Istria',
    ],
  },
}

function defaultBlurb(country) {
  return `Discover the best of ${country}—from must-see sights to local experiences. Your guide to where to go and what to do.`
}

function defaultBestTime() {
  return 'Spring and autumn often offer the best weather and fewer crowds. Check your chosen region for peak seasons.'
}

function defaultExperiences(country, cities) {
  const top = (cities || []).slice(0, 5)
  return top.length
    ? top.map((c) => `Explore ${c}`)
    : [`Discover ${country}’s highlights`, 'Taste local food', 'Meet locals', 'See iconic sights', 'Go off the beaten path']
}

/** Get full guide for a country; falls back to defaults if no custom guide */
export function getCountryGuide(countryName) {
  const cities = destinationsByCountry[countryName] || []
  const custom = GUIDES[countryName]
  const mustVisit = cities.slice(0, 4)
  const recommended = cities.slice(4, 9)
  const ifTime = cities.slice(9)
  return {
    country: countryName,
    blurb: custom?.blurb ?? defaultBlurb(countryName),
    bestTime: custom?.bestTime ?? defaultBestTime(),
    experiences: custom?.experiences ?? defaultExperiences(countryName, cities),
    highlights: cities.slice(0, 8),
    allDestinations: cities,
    mustVisit,
    recommended,
    ifTime,
  }
}

export { GUIDES }
