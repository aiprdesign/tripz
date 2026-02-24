// Curated content for "Cheapest countries for a world trip" and "Round-the-world under $5k"

/** Countries often cited as budget-friendly for long-term travel (order for display) */
export const CHEAPEST_COUNTRIES_FOR_WORLD_TRIP = [
  { country: 'Thailand', note: 'Great food, beaches, temples; very low daily costs outside Bangkok.' },
  { country: 'Vietnam', note: 'Street food, motorbike trips, and Ha Long Bay on a shoestring.' },
  { country: 'Indonesia', note: 'Bali, Lombok, and beyond; budget stays and local eats.' },
  { country: 'India', note: 'Extremely low costs; trains, street food, and endless variety.' },
  { country: 'Philippines', note: 'Islands and beaches; affordable once you’re there.' },
  { country: 'Cambodia', note: 'Angkor Wat and coast; very low daily budget possible.' },
  { country: 'Laos', note: 'Slower pace, rivers, and temples; very cheap.' },
  { country: 'Nepal', note: 'Trekking and culture; budget-friendly lodging and food.' },
  { country: 'Sri Lanka', note: 'Trains, tea country, and beaches; mid–low budget.' },
  { country: 'Colombia', note: 'Cities and nature; good value in the Americas.' },
  { country: 'Mexico', note: 'Huge variety; avoid only the priciest resorts.' },
  { country: 'Portugal', note: 'Europe’s best value; food and coast without the high prices.' },
  { country: 'Morocco', note: 'Riads, souks, Sahara; affordable if you haggle and eat local.' },
  { country: 'Egypt', note: 'Ancient sites and Red Sea; budget options everywhere.' },
  { country: 'Bolivia', note: 'Salt flats and highlands; one of South America’s cheapest.' },
  { country: 'Guatemala', note: 'Volcanoes, lakes, and ruins; very low daily costs.' },
  { country: 'Peru', note: 'Machu Picchu and food; mid-range but doable on a budget.' },
  { country: 'Turkey', note: 'Istanbul and coast; good value for what you get.' },
  { country: 'Malaysia', note: 'Food and islands; often cheaper than Thailand in cities.' },
  { country: 'Romania', note: 'Castles and countryside; cheap by European standards.' },
]

/** Sample round-the-world route under ~$5k USD (flights + rough budget; prices illustrative) */
export const RTW_ROUTE_UNDER_5K = {
  title: 'Sample round-the-world route under $5k',
  description: 'One way to stretch a ~$5k budget: mix budget regions with one or two pricier stops. Book flights early, use budget airlines and overland where possible.',
  legs: [
    { from: 'USA (or your home)', to: 'Mexico City', note: 'Often cheap from North America. 1–2 weeks.', budget: '~$400' },
    { from: 'Mexico', to: 'Colombia', note: 'Bogotá or Cartagena. 1–2 weeks.', budget: '~$350' },
    { from: 'Colombia', to: 'Peru', note: 'Lima, Cusco, Machu Picchu. 2 weeks.', budget: '~$400' },
    { from: 'Peru', to: 'Thailand', note: 'Long-haul; book in advance. Bangkok as hub.', budget: '~$700' },
    { from: 'Thailand', to: 'Vietnam', note: 'Short flight or overland. 2–3 weeks.', budget: '~$200' },
    { from: 'Vietnam', to: 'Indonesia', note: 'Bali, Lombok. 2 weeks.', budget: '~$250' },
    { from: 'Indonesia', to: 'India', note: 'Delhi or Mumbai. 2–3 weeks.', budget: '~$300' },
    { from: 'India', to: 'Turkey', note: 'Istanbul. 1–2 weeks.', budget: '~$350' },
    { from: 'Turkey', to: 'Portugal', note: 'Lisbon, Porto. 1 week.', budget: '~$250' },
    { from: 'Portugal', to: 'Home', note: 'Return flight. Book early.', budget: '~$500' },
  ],
  totalNote: 'Rough total flights ~$3,800. Remaining ~$1,200+ for food, stays, and activities in budget destinations. Adjust by skipping or shortening legs.',
}
