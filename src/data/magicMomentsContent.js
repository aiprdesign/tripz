// "Magic Moment" prompts and content for quick, vibe-based planning

export const MAGIC_MOMENTS = [
  { id: '60sec', label: 'Plan my whole trip in 60 seconds' },
  { id: '2k', label: 'Cheapest world route under $2k' },
  { id: 'vibe', label: 'Perfect itinerary based on my vibe' },
]

export const MAGIC_MOMENT_CONTENT = {
  '60sec': {
    title: 'Plan my whole trip in 60 seconds',
    intro: 'Answer three quick questions and get a ready-to-use itinerary with destinations, pace, and a sample day plan.',
    steps: [
      'Where do you want to go? (pick a region or country)',
      'How many days? (e.g. 3, 5, 7)',
      'What matters most? (food, culture, nature, nightlife, relaxation)',
    ],
    cta: 'Use the itinerary prompts below (e.g. "Build me a 5-day Japan itinerary") or pick a template—then tweak dates and add your own spots.',
  },
  '2k': {
    title: 'Cheapest world route under $2k',
    intro: 'A bare-bones round-the-world style route that aims to keep total costs (flights + basic living) under roughly $2,000 USD. Best for long-term backpackers and gap-year travellers.',
    legs: [
      { from: 'USA/Europe', to: 'Mexico', note: 'Budget airlines or bus. 1–2 weeks.', budget: '~$200' },
      { from: 'Mexico', to: 'Guatemala', note: 'Overland. 1 week.', budget: '~$80' },
      { from: 'Guatemala', to: 'Colombia', note: 'Low-cost flight. 2 weeks.', budget: '~$250' },
      { from: 'Colombia', to: 'Ecuador/Peru', note: 'Overland or cheap flight. 2 weeks.', budget: '~$150' },
      { from: 'Peru', to: 'Thailand', note: 'Book early. Bangkok hub.', budget: '~$450' },
      { from: 'Thailand', to: 'Vietnam', note: 'Short flight. 2 weeks.', budget: '~$100' },
      { from: 'Vietnam', to: 'India', note: 'Budget carrier. 2+ weeks.', budget: '~$180' },
      { from: 'India', to: 'Turkey', note: 'Istanbul. 1 week.', budget: '~$200' },
      { from: 'Turkey', to: 'Home', note: 'Return. Book early.', budget: '~$350' },
    ],
    totalNote: 'Rough total ~$2,000 for transport. Stays and food in budget destinations can keep daily spend very low. Adjust by skipping legs or staying longer in cheapest countries.',
  },
  vibe: {
    title: 'Perfect itinerary based on my vibe',
    intro: 'Set your trip preferences (budget, pace, interests, accessibility) when creating or editing a trip. We\'ll suggest destinations and templates that match.',
    tips: [
      'Relaxed pace: fewer cities, more free time; use "If you have time" spots as optional.',
      'Packed pace: hit must-sees; use "Must visit" and "Recommended" from country guides.',
      'Food-first: pick cities known for street food and local cuisine; add restaurant reservation links to your day plan.',
      'Museums & culture: focus on cities with major sites; book ticket links in advance.',
      'Hiking & nature: add national parks and trails; check accessibility and transport time.',
      'Accessibility: filter for wheelchair-friendly or low-mobility options; we\'ll surface accessible itineraries.',
    ],
    cta: 'Create a trip and set your preferences (budget, pace, interests) in the trip card—then explore countries and add destinations that match.',
  },
}
