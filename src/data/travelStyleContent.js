// Content for "Plan by travel style" on HomePage

export const TRAVEL_STYLES = [
  { id: 'kids', label: 'Trips with Kids' },
  { id: 'visa', label: 'Visa-heavy multi-country travel' },
  { id: 'backpack', label: 'Budget backpacking routes' },
  { id: 'honeymoon', label: 'Honeymoon & luxury planning' },
  { id: 'group', label: 'Group travel coordination' },
]

export const TRAVEL_STYLE_CONTENT = {
  kids: {
    title: 'Trips with Kids',
    intro: 'Family-friendly destinations and tips: safety, pace, and activities that work for all ages.',
    tips: [
      'Pick one or two bases; avoid packing too many one-night stops.',
      'Look for countries with good healthcare and low travel health risks.',
      'Mix cultural sights with parks, beaches, or zoos so kids can run around.',
      'Check visa rules for minors; some countries need consent letters or extra docs.',
      'Book family rooms or apartments; kitchens help with snacks and picky eaters.',
    ],
    suggestedCountries: ['Japan', 'Portugal', 'Spain', 'Ireland', 'Australia', 'Canada', 'United Kingdom', 'Italy', 'Thailand', 'Croatia'],
  },
  visa: {
    title: 'Visa-heavy multi-country travel',
    intro: 'Planning routes when you need visas: order of countries, processing times, and common pitfalls.',
    tips: [
      'Apply for visas in order of trip flow; some embassies want proof of onward travel.',
      'Allow 4–12+ weeks for visa processing; some countries offer e-visas or visa-on-arrival.',
      'Check validity and entry rules: single vs multiple entry, max stay, and “use by” date.',
      'Schengen: 90 days in 180; plan border runs or limit time in the zone.',
      'Keep digital and paper copies of visas, invitation letters, and hotel bookings.',
      'Consider visa-free corridors (e.g. ASEAN, Central America) to reduce applications.',
    ],
    suggestedCountries: ['France', 'Italy', 'Spain', 'Japan', 'Vietnam', 'Thailand', 'India', 'Turkey', 'Egypt', 'United Kingdom'],
  },
  backpack: {
    title: 'Budget backpacking routes',
    intro: 'Classic overland routes and regions where your money goes further and transport is straightforward.',
    tips: [
      'Southeast Asia: Thailand → Laos → Vietnam → Cambodia (or reverse); buses and cheap flights.',
      'Central America: Mexico → Guatemala → Nicaragua → Costa Rica → Panama; shared shuttles and buses.',
      'Balkans: Croatia → Bosnia → Montenegro → Albania; buses and ferries, no Schengen clock pressure.',
      'South America: Colombia → Ecuador → Peru → Bolivia; long buses and budget flights.',
      'Use overnight buses or trains to save a night’s accommodation; book popular legs in advance.',
    ],
    suggestedCountries: ['Thailand', 'Vietnam', 'Indonesia', 'Colombia', 'Peru', 'Portugal', 'Croatia', 'Mexico', 'India', 'Morocco'],
  },
  honeymoon: {
    title: 'Honeymoon & luxury planning',
    intro: 'Romantic, splurge-worthy destinations and how to plan for privacy, special experiences, and smooth logistics.',
    tips: [
      'Mix one or two “wow” stays (overwater villa, safari lodge) with comfortable city or coast.',
      'Book key experiences in advance: private dinners, hot-air balloons, diving, spa days.',
      'Consider shoulder season for better rates and fewer crowds with still-good weather.',
      'All-inclusive or small luxury ships can simplify budgeting and reduce decision fatigue.',
      'Tell hotels it’s a honeymoon; many offer upgrades, champagne, or late checkout.',
    ],
    suggestedCountries: ['Italy', 'Greece', 'France', 'Maldives', 'Japan', 'Portugal', 'Spain', 'Thailand', 'Indonesia', 'South Africa'],
  },
  group: {
    title: 'Group travel coordination',
    intro: 'Keeping a group trip smooth: shared docs, budgets, and decisions without the chaos.',
    tips: [
      'Create a shared doc or app with itinerary, flights, and accommodation links so everyone has one source of truth.',
      'Set a rough daily budget (accommodation, food, activities) so people can opt in or out of pricier add-ons.',
      'Book key group activities (tours, dinners) in advance; leave some days free for splitting up.',
      'Designate one person for payments and reimbursements, or use a kitty for shared expenses.',
      'Agree on a few “non‑negotiables” (e.g. one museum, one night out) and keep the rest flexible.',
    ],
    suggestedCountries: ['Spain', 'Portugal', 'Thailand', 'Italy', 'United Kingdom', 'Germany', 'Czech Republic', 'Croatia', 'Mexico', 'Japan'],
  },
}
