// Popular itineraries: day-by-day schedules, links (hotels, tickets, restaurants)

export const POPULAR_ITINERARIES = [
  { id: 'paris3', title: '3 Days in Paris Itinerary', country: 'France', city: 'Paris', days: 3 },
  { id: 'bali-cheap', title: 'Cheap Bali trip plan', country: 'Indonesia', city: 'Bali', days: 5 },
  { id: 'japan-best-time', title: 'Best time to visit Japan', country: 'Japan', city: null, days: 0 }, // info only
]

export const BEST_TIME_TO_VISIT = {
  Japan: 'March–April for cherry blossoms; October–November for autumn leaves. Avoid rainy June and humid August.',
  France: 'April–June and September–October for mild weather and fewer crowds. December for Christmas markets.',
  Italy: 'April–May and September–October. Summer is hot and crowded; winter is quiet in cities.',
  Spain: 'Spring (April–May) and fall (September–October). July–August is hot; winter is mild in the south.',
  Thailand: 'November–February (cool, dry). March–May is hot; June–October is rainy but lush.',
  Greece: 'April–June and September–October. July–August is peak heat and crowds on islands.',
  Indonesia: 'April–October (dry). Bali is busiest July–August; shoulder months are cheaper.',
  'United States': 'Varies by region: spring/fall for most; winter for ski; avoid summer in desert/South.',
  India: 'October–March (cool, dry). Avoid monsoon (June–September) and peak heat (April–May).',
  Portugal: 'April–June and September–October. Summer is busy on the Algarve; winter is mild in Lisbon.',
}

const HOTEL_LINK = 'https://www.booking.com'
const TICKETS_LINK = 'https://www.getyourguide.com'
const RESTAURANTS_LINK = 'https://www.opentable.com'

export const ITINERARY_DETAIL = {
  paris3: {
    title: '3 Days in Paris Itinerary',
    subtitle: 'Classic Paris: icons, art, and neighbourhoods.',
    mapNote: 'Paris is walkable + metro. Day 1: Louvre area. Day 2: Eiffel + Left Bank. Day 3: Montmartre or Marais.',
    travelTime: '~30–45 min between areas by metro; allow 2–3 hr for Louvre.',
    days: [
      {
        day: 1,
        title: 'Louvre & Tuileries',
        activities: [
          { time: '09:00', what: 'Louvre (book timed slot)', link: TICKETS_LINK, linkLabel: 'Book Louvre' },
          { time: '13:00', what: 'Lunch near Palais Royal', link: RESTAURANTS_LINK, linkLabel: 'Reserve table' },
          { time: '15:00', what: 'Tuileries Garden → Place de la Concorde' },
          { time: '18:00', what: 'Dinner in Saint-Germain', link: RESTAURANTS_LINK, linkLabel: 'Reserve' },
        ],
        hotelNote: 'Stay near Louvre or Saint-Germain for easy Day 1 start.',
        hotelLink: HOTEL_LINK,
      },
      {
        day: 2,
        title: 'Eiffel Tower & Left Bank',
        activities: [
          { time: '09:30', what: 'Eiffel Tower (book in advance)', link: TICKETS_LINK, linkLabel: 'Book Eiffel' },
          { time: '12:00', what: 'Lunch on the Seine or Champ de Mars' },
          { time: '14:00', what: 'Musée d\'Orsay (optional)', link: TICKETS_LINK, linkLabel: 'Tickets' },
          { time: '19:00', what: 'Evening: Trocadéro for tower views' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
      {
        day: 3,
        title: 'Montmartre or Le Marais',
        activities: [
          { time: '09:00', what: 'Sacré-Cœur + Montmartre streets' },
          { time: '12:00', what: 'Lunch in Montmartre' },
          { time: '14:00', what: 'Le Marais: Place des Vosges, shops' },
          { time: '18:00', what: 'Final dinner in Marais', link: RESTAURANTS_LINK, linkLabel: 'Reserve' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
    ],
  },
  'bali-cheap': {
    title: 'Cheap Bali trip plan',
    subtitle: '5 days on a budget: temples, rice terraces, beach.',
    mapNote: 'Base in Ubud 2–3 nights, then 2 nights near beach (Canggu/Sanur). Scooter or driver for day trips.',
    travelTime: 'Ubud ↔ Canggu ~1–1.5 hr. Temple day trips from Ubud ~30–45 min each.',
    days: [
      {
        day: 1,
        title: 'Ubud arrival & Monkey Forest',
        activities: [
          { time: '—', what: 'Check in Ubud (guesthouse/homestay)', link: HOTEL_LINK, linkLabel: 'Find stays' },
          { time: '14:00', what: 'Monkey Forest + Ubud market' },
          { time: '19:00', what: 'Dinner at warung (local eatery)' },
        ],
        hotelNote: 'Budget: homestays in Ubud from ~$15/night.',
        hotelLink: HOTEL_LINK,
      },
      {
        day: 2,
        title: 'Temples & rice terraces',
        activities: [
          { time: '08:00', what: 'Tegalalang Rice Terraces (early = fewer crowds)' },
          { time: '11:00', what: 'Tirta Empul or Goa Gajah' },
          { time: '14:00', what: 'Lunch in Ubud' },
          { time: '16:00', what: 'Campuhan Ridge Walk (free)' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
      {
        day: 3,
        title: 'Ubud culture or move to beach',
        activities: [
          { time: '09:00', what: 'Yoga class or cooking class (optional)' },
          { time: '12:00', what: 'Check out, transfer to Canggu/Sanur' },
          { time: '15:00', what: 'Beach time' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
      {
        day: 4,
        title: 'Beach day',
        activities: [
          { time: '—', what: 'Relax, surf lesson, or Tanah Lot sunset' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
      {
        day: 5,
        title: 'Depart or half-day',
        activities: [
          { time: '—', what: 'Last beach morning or quick temple; head to airport.' },
        ],
        hotelNote: null,
        hotelLink: null,
      },
    ],
  },
  'japan-best-time': {
    title: 'Best time to visit Japan',
    subtitle: 'When to go for cherry blossoms, autumn leaves, or fewer crowds.',
    mapNote: null,
    travelTime: null,
    bestTimeText: BEST_TIME_TO_VISIT.Japan,
    days: null,
  },
}

export function getItineraryById(id) {
  return POPULAR_ITINERARIES.find((i) => i.id === id)
}

export function getItineraryDetail(id) {
  return ITINERARY_DETAIL[id] || null
}

export function getBestTimeForCountry(country) {
  return BEST_TIME_TO_VISIT[country] || null
}
