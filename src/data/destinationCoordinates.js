// Approximate [lat, lng] for destinations. Used to show markers on the actual map.
// Format: country -> city -> [latitude, longitude]

export const destinationCoordinates = {
  Argentina: { 'Buenos Aires': [-34.61, -58.38], 'Mendoza': [-32.89, -68.83], 'Bariloche': [-41.13, -71.31], 'Ushuaia': [-54.80, -68.30] },
  Australia: { 'Sydney': [-33.87, 151.21], 'Melbourne': [-37.81, 144.96], 'Brisbane': [-27.47, 153.03], 'Perth': [-31.95, 115.86], 'Cairns': [-16.92, 145.78], 'Adelaide': [-34.93, 138.60], 'Hobart': [-42.88, 147.33] },
  Austria: { 'Vienna': [48.21, 16.37], 'Salzburg': [47.81, 13.04], 'Innsbruck': [47.27, 11.39], 'Graz': [47.07, 15.44], 'Hallstatt': [47.56, 13.65] },
  Belgium: { 'Brussels': [50.85, 4.35], 'Bruges': [51.21, 3.22], 'Ghent': [51.05, 3.72], 'Antwerp': [51.22, 4.40] },
  Brazil: { 'Rio de Janeiro': [-22.91, -43.17], 'São Paulo': [-23.55, -46.63], 'Salvador': [-12.97, -38.51], 'Florianópolis': [-27.60, -48.55], 'Manaus': [-3.12, -60.02] },
  Canada: { 'Toronto': [43.65, -79.38], 'Vancouver': [49.28, -123.12], 'Montreal': [45.50, -73.57], 'Quebec City': [46.81, -71.21], 'Calgary': [51.05, -114.07], 'Ottawa': [45.42, -75.70], 'Victoria': [48.43, -123.37], 'Banff': [51.18, -115.57] },
  Chile: { 'Santiago': [-33.45, -70.67], 'Valparaíso': [-33.05, -71.62], 'San Pedro de Atacama': [-22.91, -68.20], 'Easter Island': [-27.11, -109.35] },
  China: { 'Beijing': [39.90, 116.41], 'Shanghai': [31.23, 121.47], 'Hong Kong': [22.32, 114.17], "Xi'an": [34.27, 108.94], 'Guilin': [25.27, 110.29], 'Chengdu': [30.67, 104.06], 'Hangzhou': [30.25, 120.17], 'Lhasa': [29.65, 91.12] },
  Colombia: { 'Cartagena': [10.40, -75.51], 'Bogotá': [4.71, -74.07], 'Medellín': [6.24, -75.57] },
  Croatia: { 'Dubrovnik': [42.65, 18.09], 'Split': [43.51, 16.44], 'Zagreb': [45.81, 15.98], 'Hvar': [43.17, 16.44], 'Zadar': [44.12, 15.23] },
  'Czech Republic': { 'Prague': [50.08, 14.44], 'Český Krumlov': [48.81, 14.32], 'Brno': [49.20, 16.61], 'Karlovy Vary': [50.23, 12.87] },
  Denmark: { 'Copenhagen': [55.68, 12.57], 'Aarhus': [56.16, 10.20], 'Odense': [55.40, 10.39] },
  Egypt: { 'Cairo': [30.04, 31.24], 'Luxor': [25.70, 32.64], 'Aswan': [24.09, 32.90], 'Alexandria': [31.20, 29.92], 'Hurghada': [27.26, 33.81] },
  Finland: { 'Helsinki': [60.17, 24.94], 'Rovaniemi': [66.50, 25.72], 'Tampere': [61.50, 23.80], 'Turku': [60.45, 22.28] },
  France: { 'Paris': [48.86, 2.35], 'Lyon': [45.76, 4.84], 'Nice': [43.71, 7.26], 'Marseille': [43.30, 5.37], 'Bordeaux': [44.84, -0.58], 'Strasbourg': [48.58, 7.75], 'Mont Saint-Michel': [48.64, -1.51], 'Provence': [43.95, 5.88], 'Chamonix': [45.92, 6.87] },
  Germany: { 'Berlin': [52.52, 13.41], 'Munich': [48.14, 11.58], 'Hamburg': [53.55, 9.99], 'Cologne': [50.94, 6.96], 'Frankfurt': [50.11, 8.68], 'Dresden': [51.05, 13.74], 'Heidelberg': [49.41, 8.69], 'Bavarian Alps': [47.42, 11.18] },
  Greece: { 'Athens': [37.98, 23.73], 'Santorini': [36.39, 25.46], 'Mykonos': [37.45, 25.38], 'Crete': [35.24, 24.81], 'Thessaloniki': [40.64, 22.94], 'Rhodes': [36.44, 28.22], 'Corfu': [39.62, 19.92], 'Meteora': [39.71, 21.63] },
  Hungary: { 'Budapest': [47.50, 19.04], 'Eger': [47.90, 20.37], 'Lake Balaton': [46.83, 17.73] },
  Iceland: { 'Reykjavik': [64.15, -21.94], 'Blue Lagoon': [63.88, -22.45], 'Golden Circle': [64.26, -20.52], 'Vík': [63.42, -19.01] },
  India: {
    'Mumbai': [19.08, 72.88], 'Delhi': [28.61, 77.21], 'Jaipur': [26.91, 75.79], 'Goa': [15.30, 74.12], 'Kerala': [10.85, 76.27], 'Varanasi': [25.32, 82.97], 'Agra': [27.18, 78.01], 'Udaipur': [24.59, 73.71], 'Rishikesh': [30.11, 78.29], 'Ladakh': [34.15, 77.58], 'Amritsar': [31.62, 74.88], 'Jodhpur': [26.28, 73.02],
    'Taj Mahal (Agra)': [27.17, 78.04], 'Agra Fort': [27.18, 78.02], 'Khajuraho': [24.85, 79.93], 'Bodh Gaya': [24.70, 84.99], 'Sanchi': [23.48, 77.74], 'Mahabalipuram': [12.62, 80.19], 'Hampi': [15.34, 76.46], 'Konark Sun Temple': [19.89, 86.10], 'Thanjavur': [10.78, 79.13], 'Madurai': [9.92, 78.12], 'Tirupati': [13.68, 79.35], 'Rameswaram': [9.29, 79.31],
    'Ajanta Caves': [20.55, 75.70], 'Ellora Caves': [20.03, 75.18], 'Elephanta Caves': [18.96, 72.93], 'Nalanda': [25.14, 85.44], 'Fatehpur Sikri': [27.09, 77.67], 'Somnath': [20.89, 70.40], 'Rani ki vav': [23.86, 72.10], 'Pattadakal': [15.95, 75.82], 'Ramappa Temple': [18.26, 79.94], 'Bhimbetka': [22.94, 77.61],
    'Chidambaram': [11.40, 79.69], 'Meenakshi Temple (Madurai)': [9.92, 78.12], 'Golden Temple (Amritsar)': [31.62, 74.88], 'Red Fort (Delhi)': [28.66, 77.24], 'Qutub Minar (Delhi)': [28.52, 77.19], 'Chola Temples (Thanjavur)': [10.78, 79.13], 'Halebidu': [13.22, 75.99], 'Belur': [13.17, 75.86],
    'Chittorgarh Fort': [24.89, 74.65], 'Ranakpur': [25.11, 73.46], 'Pushkar': [26.49, 74.55], 'Shravanabelagola': [12.85, 76.48], 'Mysore': [12.30, 76.65], 'Chennai': [13.08, 80.27], 'Hyderabad': [17.39, 78.47], 'Kolkata': [22.57, 88.36], 'Darjeeling': [27.04, 88.26], 'Kaziranga': [26.57, 93.17],
  },
  Indonesia: { 'Bali': [-8.41, 115.19], 'Jakarta': [-6.21, 106.85], 'Yogyakarta': [-7.80, 110.36], 'Lombok': [-8.65, 116.32], 'Borobudur': [-7.61, 110.20] },
  Ireland: { 'Dublin': [53.35, -6.26], 'Galway': [53.27, -9.05], 'Killarney': [52.06, -9.52], 'Cork': [51.90, -8.47], 'Dingle': [52.14, -10.27], 'Cliffs of Moher': [52.97, -9.43] },
  Israel: { 'Jerusalem': [31.77, 35.21], 'Tel Aviv': [32.09, 34.78], 'Haifa': [32.82, 34.99], 'Eilat': [29.56, 34.95], 'Dead Sea': [31.56, 35.48], 'Nazareth': [32.70, 35.30] },
  Italy: { 'Rome': [41.90, 12.50], 'Florence': [43.77, 11.25], 'Venice': [45.44, 12.33], 'Milan': [45.46, 9.19], 'Naples': [40.85, 14.27], 'Amalfi Coast': [40.63, 14.60], 'Cinque Terre': [44.13, 9.65], 'Siena': [43.32, 11.33], 'Verona': [45.44, 10.99], 'Sicily': [37.60, 14.02] },
  Japan: { 'Tokyo': [35.68, 139.69], 'Kyoto': [35.01, 135.77], 'Osaka': [34.69, 135.50], 'Hiroshima': [34.39, 132.46], 'Nara': [34.69, 135.80], 'Hakone': [35.19, 139.03], 'Niseko': [42.80, 140.69], 'Okinawa': [26.21, 127.68], 'Mount Fuji': [35.36, 138.73] },
  Jordan: { 'Petra': [30.33, 35.44], 'Amman': [31.95, 35.93], 'Wadi Rum': [29.58, 35.42], 'Aqaba': [29.53, 35.01] },
  Kenya: { 'Nairobi': [-1.29, 36.82], 'Mombasa': [-4.04, 39.67], 'Masai Mara': [-1.50, 35.14] },
  Malaysia: { 'Kuala Lumpur': [3.14, 101.69], 'Penang': [5.42, 100.34], 'Langkawi': [6.35, 99.80], 'Malacca': [2.19, 102.25] },
  Mexico: { 'Mexico City': [19.43, -99.13], 'Cancún': [21.16, -86.85], 'Tulum': [20.21, -87.43], 'Oaxaca': [17.07, -96.73], 'Guadalajara': [20.67, -103.35], 'Playa del Carmen': [20.63, -87.07], 'Cabo San Lucas': [22.89, -109.91], 'Guanajuato': [21.02, -101.26], 'San Miguel de Allende': [20.91, -100.74] },
  Morocco: { 'Marrakech': [31.63, -7.99], 'Fes': [34.02, -5.01], 'Casablanca': [33.57, -7.59], 'Chefchaouen': [35.17, -5.26], 'Essaouira': [31.51, -9.77], 'Rabat': [34.02, -6.84] },
  Netherlands: { 'Amsterdam': [52.37, 4.89], 'Rotterdam': [51.92, 4.48], 'The Hague': [52.08, 4.31], 'Utrecht': [52.09, 5.12], 'Keukenhof': [52.28, 4.55], 'Giethoorn': [52.74, 6.08] },
  'New Zealand': { 'Auckland': [-36.85, 174.76], 'Queenstown': [-45.03, 168.66], 'Wellington': [-41.29, 174.78], 'Christchurch': [-43.53, 172.64], 'Rotorua': [-38.14, 176.25], 'Milford Sound': [-44.67, 167.92], 'Lake Tekapo': [-44.00, 170.48] },
  Norway: { 'Oslo': [59.91, 10.75], 'Bergen': [60.39, 5.32], 'Tromsø': [69.65, 18.96], 'Lofoten': [68.21, 13.62], 'Geiranger': [62.10, 7.21], 'Stavanger': [58.97, 5.73] },
  Peru: { 'Lima': [-12.05, -77.04], 'Cusco': [-13.53, -71.97], 'Machu Picchu': [-13.16, -72.55], 'Arequipa': [-16.41, -71.54], 'Lake Titicaca': [-15.92, -69.34] },
  Philippines: { 'Manila': [14.60, 120.98], 'Cebu': [10.32, 123.89], 'Palawan': [10.00, 118.79], 'Boracay': [11.97, 121.93], 'Bohol': [9.85, 124.14], 'Banaue': [16.91, 121.06] },
  Poland: { 'Krakow': [50.06, 19.94], 'Warsaw': [52.23, 21.01], 'Gdańsk': [54.35, 18.65], 'Wrocław': [51.11, 17.04], 'Zakopane': [49.30, 19.95] },
  Portugal: { 'Lisbon': [38.72, -9.14], 'Porto': [41.16, -8.63], 'Algarve': [37.02, -7.93], 'Sintra': [38.80, -9.38], 'Madeira': [32.76, -16.96], 'Évora': [38.57, -7.91] },
  Russia: { 'Moscow': [55.76, 37.62], 'Saint Petersburg': [59.93, 30.36], 'Kazan': [55.83, 49.07], 'Sochi': [43.59, 39.73] },
  Singapore: { 'Singapore': [1.35, 103.82] },
  'South Africa': { 'Cape Town': [-33.92, 18.42], 'Johannesburg': [-26.20, 28.04], 'Kruger National Park': [-24.01, 31.48], 'Durban': [-29.86, 31.03], 'Stellenbosch': [-33.93, 18.86] },
  'South Korea': { 'Seoul': [37.57, 126.98], 'Busan': [35.10, 129.04], 'Jeju Island': [33.50, 126.53], 'Gyeongju': [35.86, 129.22], 'Jeonju': [35.82, 127.15] },
  Spain: { 'Barcelona': [41.39, 2.17], 'Madrid': [40.42, -3.70], 'Seville': [37.39, -5.98], 'Valencia': [39.47, -0.38], 'Granada': [37.18, -3.60], 'Bilbao': [43.26, -2.93], 'San Sebastián': [43.32, -1.98], 'Santiago de Compostela': [42.88, -8.54], 'Ibiza': [38.91, 1.44], 'Mallorca': [39.57, 2.65], 'Toledo': [39.86, -4.02] },
  Sweden: { 'Stockholm': [59.33, 18.07], 'Gothenburg': [57.71, 11.97], 'Malmö': [55.61, 13.00] },
  Switzerland: { 'Zurich': [47.38, 8.54], 'Geneva': [46.20, 6.14], 'Interlaken': [46.69, 7.86], 'Zermatt': [45.98, 7.75], 'Lucerne': [47.05, 8.31], 'Bern': [46.95, 7.45], 'Lausanne': [46.52, 6.63] },
  Taiwan: { 'Taipei': [25.03, 121.56], 'Kaohsiung': [22.63, 120.27], 'Sun Moon Lake': [23.87, 120.91], 'Tainan': [22.99, 120.21] },
  Thailand: { 'Bangkok': [13.76, 100.50], 'Chiang Mai': [18.79, 98.99], 'Phuket': [7.88, 98.39], 'Krabi': [8.09, 98.91], 'Koh Samui': [9.54, 100.06], 'Ayutthaya': [14.37, 100.59], 'Pai': [19.36, 98.44] },
  Turkey: { 'Istanbul': [41.01, 28.95], 'Cappadocia': [38.64, 34.83], 'Antalya': [36.90, 30.69], 'Pamukkale': [37.92, 29.12], 'Ephesus': [37.94, 27.34], 'Bodrum': [37.03, 27.43], 'Bursa': [40.19, 29.06] },
  'United Arab Emirates': { 'Dubai': [25.20, 55.27], 'Abu Dhabi': [24.45, 54.39], 'Sharjah': [25.36, 55.40] },
  'United Kingdom': { 'London': [51.51, -0.13], 'Edinburgh': [55.95, -3.19], 'Bath': [51.38, -2.36], 'York': [53.96, -1.08], 'Liverpool': [53.41, -2.99], 'Manchester': [53.48, -2.24], 'Cambridge': [52.21, 0.12], 'Oxford': [51.75, -1.26], 'Stonehenge': [51.18, -1.83], 'Scottish Highlands': [57.12, -4.72], 'Lake District': [54.47, -3.08] },
  'United States': {
    'New York': [40.71, -74.01], 'Los Angeles': [34.05, -118.24], 'San Francisco': [37.77, -122.42], 'Las Vegas': [36.17, -115.14], 'Miami': [25.76, -80.19], 'Chicago': [41.88, -87.63], 'Boston': [42.36, -71.06], 'Washington DC': [38.91, -77.04], 'Seattle': [47.61, -122.33], 'New Orleans': [29.95, -90.07], 'San Diego': [32.72, -117.16], 'Austin': [30.27, -97.74], 'Nashville': [36.16, -86.78],
    'Grand Canyon': [36.05, -112.14], 'Hawaii': [19.90, -155.58], 'Alaska': [64.84, -147.72], 'Napa Valley': [38.30, -122.29], 'Savannah': [32.08, -81.09], 'Charleston': [32.78, -79.93], 'Philadelphia': [39.95, -75.17], 'Denver': [39.74, -104.99], 'Portland': [45.52, -122.68], 'Santa Fe': [35.69, -105.94], 'Sedona': [34.87, -111.76],
    'Yellowstone': [44.43, -110.59], 'Yosemite': [37.75, -119.59], 'New Orleans French Quarter': [29.96, -90.06], 'Statue of Liberty': [40.69, -74.04], 'Golden Gate Bridge': [37.82, -122.48], 'Bryce Canyon': [37.63, -112.17], 'Zion': [37.30, -113.05], 'Glacier National Park': [48.76, -113.79], 'Acadia': [44.35, -68.21], 'Great Smoky Mountains': [35.65, -83.51],
  },
  Vietnam: { 'Hanoi': [21.03, 105.85], 'Ho Chi Minh City': [10.82, 106.63], 'Hội An': [15.88, 108.33], 'Halong Bay': [20.91, 107.18], 'Da Nang': [16.07, 108.20], 'Sapa': [22.34, 103.84], 'Nha Trang': [12.24, 109.20] },
}

/** Get [lng, lat] for Marker (react-simple-maps uses longitude, latitude) */
export function getDestinationCoords(country, city) {
  const byCountry = destinationCoordinates[country]
  if (!byCountry) return null
  const latLng = byCountry[city]
  if (!latLng) return null
  return [latLng[1], latLng[0]] // [lng, lat]
}

/** Get all destinations with coordinates for the world map */
export function getAllDestinationsWithCoords() {
  const result = []
  for (const [country, cities] of Object.entries(destinationCoordinates)) {
    for (const [city, latLng] of Object.entries(cities)) {
      result.push({
        city,
        country,
        label: `${city}, ${country}`,
        coordinates: [latLng[1], latLng[0]], // [lng, lat]
      })
    }
  }
  return result
}

/** Get destinations with coords for one country */
export function getCountryDestinationsWithCoords(countryName) {
  const cities = destinationCoordinates[countryName]
  if (!cities) return []
  return Object.entries(cities).map(([city, latLng]) => ({
    city,
    country: countryName,
    label: `${city}, ${countryName}`,
    coordinates: [latLng[1], latLng[0]],
  }))
}
