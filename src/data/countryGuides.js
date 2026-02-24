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
    cultureFacts: [
      'Always say "Bonjour" when entering a shop or café—skipping it is considered rude.',
      'Dining is slower here: rushing a meal or asking for the bill too soon can seem impolite.',
      'Keep your hands on the table (wrists visible) during meals; hands in lap can look suspicious.',
      'Tipping is optional; service is included. Rounding up or leaving small change is enough.',
      'Don’t expect a smile from strangers—it’s not coldness, just reserve until you know someone.',
    ],
    neverDo: [
      'Don’t skip saying "Bonjour" when entering a shop or café—it’s seen as rude.',
      'Don’t ask for the bill as soon as you finish eating; meals are meant to be lingered over.',
      'Don’t order a cappuccino or coffee with a full meal in a proper restaurant—water and wine are the norm.',
      'Don’t touch produce at markets without buying; let the vendor hand you items.',
      'Don’t assume everyone speaks English; start with a few words in French.',
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
    cultureFacts: [
      'Never stick chopsticks upright in rice—it resembles funeral offerings.',
      'Slurping noodles is polite and shows you’re enjoying the meal.',
      'Remove shoes before entering homes, many restaurants, and some temples; look for the step up.',
      'Tipping is not customary and can cause confusion; excellent service is the norm.',
      'Avoid eating or drinking while walking; it’s considered messy and disrespectful.',
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
    cultureFacts: [
      'Cover shoulders and knees in churches; many enforce a dress code.',
      'Cappuccino is a morning drink—ordering it after lunch can mark you as a tourist.',
      'Don’t ask for parmesan on seafood pasta; it’s often considered wrong for the dish.',
      'A small "coperto" (cover charge) on the bill is normal; tipping is optional (round up).',
      'Dinner starts late: 8–9 p.m. is normal; earlier can mean tourist-only spots.',
    ],
    neverDo: [
      'Don’t enter churches in shorts, short skirts, or bare shoulders—you’ll be turned away.',
      'Don’t order cappuccino after 11 a.m. or with a meal; it’s a breakfast drink.',
      'Don’t ask for parmesan on seafood or fish pasta.',
      'Don’t cut spaghetti with a knife; twirl it with a fork (and spoon if you like).',
      'Don’t sit at a table and expect table service at a bar; order and pay at the counter.',
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
    cultureFacts: [
      'Lunch is around 2–4 p.m. and dinner often 9–11 p.m.; many shops close for siesta.',
      'Tapas are often free with a drink in the south; in tourist areas you'll usually pay.',
      'Spaniards use two surnames (father's + mother's); don't assume the first is "family name."',
      'Greet with two kisses (cheek to cheek) in social settings; handshakes for business.',
      'Don't expect punctuality for social plans—"ahora" (now) can mean in a while.',
    ],
    neverDo: [
      "Don't expect lunch before 2 p.m. or dinner before 9 p.m. in most of Spain.",
      "Don't confuse Catalonia or the Basque Country with \"just Spain\"—identity matters.",
      "Don't skip the greeting (two kisses or handshake); diving into business is rude.",
      "Don't rush a meal; Spaniards don't do quick lunches.",
      "Don't assume \"tapas\" means free everywhere; in tourist areas you usually pay.",
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
    cultureFacts: [
      'Queue properly—jumping the line is one of the quickest ways to annoy Brits.',
      '"Sorry" is used constantly, often to mean "excuse me" or to soften requests.',
      'Don’t assume "England" means the whole UK; Scotland, Wales, and Northern Ireland are distinct.',
      'In pubs you often order (and pay) at the bar; table service isn’t standard.',
      'Tea is serious: "builder’s tea" is strong with milk; declining can be fine but expect it offered.',
    ],
    neverDo: [
      "Don't jump the queue—Brits take lining up very seriously.",
      "Don't say \"England\" when you mean the whole UK; Scotland, Wales, and NI are distinct.",
      "Don't expect table service in a pub; order and pay at the bar.",
      "Don't be overly loud or touchy in public; Brits value reserve.",
      "Don't refuse a cup of tea when offered; it's a social ritual.",
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
    cultureFacts: [
      'Don’t touch the head (including a child’s)—the head is considered sacred.',
      'Pointing with a finger or showing the sole of your foot is rude.',
      'Remove shoes before entering homes and many temples.',
      'The king and royal family are deeply respected; avoid criticism or disrespect.',
      'Wai (palms together, slight bow) is the traditional greeting; return it appropriately.',
    ],
    neverDo: [
      "Never touch a Thai person's head—even a child's—or point your feet at people or Buddha images.",
      "Don't disrespect the king or royal family; it's illegal and deeply offensive.",
      "Don't enter temples in shorts, short skirts, or bare shoulders.",
      "Don't take photos with Buddha in a disrespectful way (e.g. climbing on statues).",
      "Don't raise your voice or lose your temper; losing face is a big deal.",
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
    cultureFacts: [
      'A nod or slight backward tilt of the head means "no"; don’t confuse it with a yes.',
      'Don’t wave with an open palm (fingers spread)—it’s an offensive gesture (moutza).',
      'Refusing food or drink when offered at a home can seem rude; accept at least a little.',
      'Dinner is often late (9–10 p.m.); lunch is the big meal for many families.',
      'Tipping: round up or leave 5–10%; service is sometimes included but extra is appreciated.',
    ],
    neverDo: [
      'Don’t use an open palm with fingers spread to wave or gesture—it’s the "moutza" insult.',
      'Don’t refuse food or drink when offered at someone’s home; accept at least a little.',
      'Don’t assume a backward head nod means yes—in Greece it often means no.',
      'Don’t take photos of monks or religious ceremonies without permission.',
      'Don’t rush through a meal; Greeks take their time at the table.',
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
    cultureFacts: [
      'Coffee culture is strong: "bica" (Lisbon) or "cimbalino" (Porto) means espresso.',
      'Don’t confuse Portugal with Spain—they’re separate languages and identities.',
      'Dinner is often 8–9 p.m.; lunch is the main meal for many.',
      'Tipping is optional; rounding up is common; 5–10% in restaurants is generous.',
      'Personal space is smaller; touching during conversation is normal among friends.',
    ],
    neverDo: [
      'Don’t call Portugal "part of Spain" or assume they speak Spanish—Portuguese identity is distinct.',
      'Don’t expect dinner before 8 p.m. in most places.',
      'Don’t skip the queue; Portuguese take turns seriously.',
      'Don’t leave trash on beaches or in nature; locals are proud of their coast.',
      'Don’t assume everyone speaks English in small towns; a few phrases help.',
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
    cultureFacts: [
      'Shower (without swimsuit) before entering pools and hot springs; it’s mandatory and checked.',
      'Don’t walk on moss—it takes decades to grow and is fragile.',
      'First names are used almost everywhere; formality is low.',
      'Tipping is not expected; wages are high and service is included.',
      'Off-road driving is illegal; stick to marked roads (F-roads need 4×4 and care).',
    ],
    neverDo: [
      'Don’t skip the shower before entering a pool or hot spring—it’s mandatory and enforced.',
      'Don’t walk or drive on moss or off marked roads; nature is fragile and off-roading is illegal.',
      'Don’t ignore weather or road warnings; conditions change fast.',
      'Don’t leave the road to get closer to wildlife or waterfalls; stay on paths.',
      'Don’t assume you can camp anywhere; use designated sites.',
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
    cultureFacts: [
      'Uluru and many sacred sites: don’t climb, touch, or photograph where it’s forbidden; respect signs.',
      'Informal and direct communication is normal; titles and formality are minimal.',
      'Tipping is not expected; rounding up or 10% for good service is fine.',
      'Distances are huge—don’t underestimate drive times; fuel and water in remote areas matter.',
      '"No worries" and "mate" are common; taking the piss (light teasing) is often friendly.',
    ],
    neverDo: [
      'Don’t climb Uluru or ignore signs at sacred Indigenous sites.',
      'Don’t underestimate distances; running out of fuel or water in the outback is dangerous.',
      'Don’t touch or feed wildlife; it’s illegal and harmful.',
      'Don’t assume "no worries" or teasing is hostility; it’s often friendly.',
      'Don’t skip sunscreen and hydration; the sun is harsh.',
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
    cultureFacts: [
      'Haggling is normal in markets; stay friendly—it’s part of the interaction.',
      'Lunch (comida) is the main meal, often 2–4 p.m.; dinner can be light and late.',
      'Don’t assume everyone speaks English; a few phrases in Spanish go a long way.',
      'Tipping 10–15% is expected in restaurants; small tips for guides and drivers are appreciated.',
      'Avoid discussing drugs or cartels; keep convos positive and respectful.',
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
    cultureFacts: [
      'Altitude in Cusco and the highlands affects many; take it easy the first day or two.',
      'Coca tea is legal and used for altitude; don’t take coca leaves home—illegal elsewhere.',
      'Lunch is the main meal; dinner is often lighter and earlier than in Spain.',
      'Bargaining is common in markets; stay polite; fixed prices in shops and restaurants.',
      'Respect sacred sites and local guides; don’t remove stones or touch restricted areas.',
    ],
    neverDo: [
      'Don’t rush at altitude in Cusco or the Sacred Valley; take it easy the first 24–48 hours.',
      'Don’t take coca leaves or coca tea bags home; illegal in most countries.',
      'Don’t touch or remove anything at Machu Picchu or other sacred sites.',
      'Don’t skip booking the Inca Trail or Machu Picchu tickets well in advance.',
      'Don’t drink tap water in the highlands; stick to bottled or boiled.',
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
    cultureFacts: [
      'Māori culture is central: learn a few phrases, respect marae (meeting grounds) and protocols.',
      'Don’t confuse NZ with Australia—Kiwis take the distinction seriously.',
      'Tipping is not expected; excellent service might get a round-up or small tip.',
      'Leave no trace: nature is treasured; stick to tracks and take rubbish with you.',
      'Informal and egalitarian; first names and casual dress are normal.',
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
    cultureFacts: [
      'Don’t touch someone’s head; pass items with both hands when possible.',
      'Bargaining is expected in markets; stay calm and good-humoured.',
      'Remove shoes before entering homes and some temples.',
      'Avoid public criticism of the government or sensitive history.',
      'Eat with chopsticks; rest them on the bowl, not upright in rice.',
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
    cultureFacts: [
      'Accept mint tea when offered—refusing can seem rude; use your right hand to receive.',
      'Haggling in souks is expected; start low, stay friendly, walk away if needed.',
      'Dress modestly, especially outside tourist areas and near religious sites.',
      'Use the right hand for eating and handing things; the left is considered unclean.',
      'Ramadan: eating/drinking in public during daylight can offend; check dates.',
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
    cultureFacts: [
      'Use the right hand for eating and giving; the left is considered unclean.',
      'Remove shoes before temples and many homes; dress modestly (shoulders and knees covered).',
      'Don’t touch people or sacred objects with your feet; don’t point feet at people or shrines.',
      'Head wobble can mean yes, okay, or "I hear you"—context matters.',
      'Bargaining is normal in markets; fixed prices in malls and many restaurants.',
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
    cultureFacts: [
      'Tipping is expected: 15–20% in restaurants; a few dollars for bartenders, valet, and guides.',
      'States differ a lot in laws (alcohol, cannabis, guns)—check local rules.',
      'Personal space is larger; avoid touching strangers; handshakes for introductions.',
      'Service and sales tax are often not included in displayed prices.',
      'Politics and religion can be sensitive; read the room before diving in.',
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
    cultureFacts: [
      'Don’t confuse Canada with the US—Canadians are proud of a distinct identity.',
      'Quebec: French is the official language; a few French phrases are appreciated.',
      'Tipping 15–20% in restaurants is standard; similar to the US in service culture.',
      'Apologising is cultural ("sorry" often means "excuse me"); politeness is valued.',
      'Indigenous peoples and land acknowledgements are increasingly part of public life.',
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
    cultureFacts: [
      'Remove shoes before entering mosques and many homes; dress modestly at religious sites.',
      'Haggling in bazaars is expected; stay friendly and walk away if the price doesn’t work.',
      'Tea (çay) is offered constantly; accepting is a sign of respect and connection.',
      'Don’t confuse Turkey with the Middle East or "Arab"—Turkish identity and language are distinct.',
      'Tipping: round up or 5–10%; small tips for guides and hamam attendants are appreciated.',
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
    cultureFacts: [
      'Bargaining is normal in souks and with many vendors; stay calm and polite.',
      'Use the right hand for eating and handing things; left is considered unclean.',
      'Dress modestly, especially at religious sites and outside tourist zones.',
      'Avoid public criticism of the government or sensitive political topics.',
      'Tipping (baksheesh) is widespread: small amounts for services, guides, and restroom attendants.',
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
    cultureFacts: [
      'Don’t call it "Africa" as if one country—South Africa is one of 54 nations.',
      'Tipping 10–15% in restaurants is standard; tip guides and safari staff as well.',
      'Safety varies by area; follow local advice on where to walk and after dark.',
      'History (apartheid, colonialism) is sensitive; listen and be respectful.',
      '"Braai" (barbecue) is a big part of social life; accept invites when you can.',
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
    cultureFacts: [
      'Don’t call the country "Holland" in front of everyone—Holland is two provinces; Netherlands is the country.',
      'Directness is normal; it’s not rudeness—Dutch value honest, clear communication.',
      'Tipping is optional; rounding up or a few euros is fine; service is included in mindset.',
      'Cyclists have priority; don’t walk in bike lanes; watch for bikes when crossing.',
      'Split the bill is common; "going Dutch" is the norm.',
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
    cultureFacts: [
      'Punctuality is important; being late without notice is considered disrespectful.',
      'Don’t joke about the Nazi era or WWII; it’s a serious and sensitive subject.',
      'Tipping: round up or 5–10%; saying the total including tip when paying is common.',
      'Look people in the eye when toasting—not doing so can invite a joke about bad luck.',
      'Recycling and rules (e.g. quiet hours) are taken seriously; follow local signs.',
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
    cultureFacts: [
      'Don’t confuse Croatia with "former Yugoslavia" in conversation; identity is Croatian.',
      'Tipping: round up or 5–10%; not always expected but appreciated in restaurants.',
      'Coffee culture is strong; sitting with one drink for a while is normal.',
      'War (1990s) is a sensitive topic; listen rather than assume or compare.',
      'Swimwear only on the beach; cover up when walking through towns.',
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

function defaultCultureFacts() {
  return [
    'Learn a few words in the local language—hello, please, and thank you go a long way.',
    'Check local dress codes for religious sites and conservative areas.',
    'Tipping customs vary; ask or observe what locals do.',
    'Respect queues and local etiquette; when in doubt, follow others.',
  ]
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
    cultureFacts: custom?.cultureFacts ?? defaultCultureFacts(),
    neverDo: custom?.neverDo ?? defaultNeverDo(),
    highlights: cities.slice(0, 8),
    allDestinations: cities,
    mustVisit,
    recommended,
    ifTime,
  }
}

export { GUIDES }
