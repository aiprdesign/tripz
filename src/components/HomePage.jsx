import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconExplore, IconTrips } from './Icons'
import {
  COMMON_ITINERARY_PROMPTS,
  getSuggestedDestinationsForItinerary,
  formatItineraryPromptLabel,
} from '../data/itineraryPrompts'
import { getCountryGuide } from '../data/countryGuides'
import { countryNames } from '../data/destinationsByCountry'
import {
  CHEAPEST_COUNTRIES_FOR_WORLD_TRIP,
  RTW_ROUTE_UNDER_5K,
} from '../data/worldTripContent'
import { TRAVEL_STYLES, TRAVEL_STYLE_CONTENT } from '../data/travelStyleContent'
import { MAGIC_MOMENTS, MAGIC_MOMENT_CONTENT } from '../data/magicMomentsContent'
import { POPULAR_ITINERARIES, ITINERARY_DETAIL } from '../data/popularItineraries'
import { TRAVELER_REVIEWS } from '../data/travelerReviews'
import { SIMILAR_DESTINATIONS } from '../data/peopleLikeYou'
import { getAllReviewedDestinations } from '../data/localUserData'
import styles from './HomePage.module.css'

export default function HomePage({ userCountry, tripCount, onNavigate, onCreateItineraryTrip }) {
  const [expandedWorldPrompt, setExpandedWorldPrompt] = useState(null)
  const [expandedTravelStyle, setExpandedTravelStyle] = useState(null)
  const [expandedMagic, setExpandedMagic] = useState(null)
  const [expandedItineraryId, setExpandedItineraryId] = useState(null)

  const handleItineraryPrompt = (days, country) => {
    if (!onCreateItineraryTrip) return
    const tripName = `${days}-day ${country} itinerary`
    const destinationNames = getSuggestedDestinationsForItinerary(days, country)
    onCreateItineraryTrip(days, country, tripName, destinationNames)
  }

  const handleNavigate = (viewName, payload) => {
    if (typeof onNavigate === 'function') onNavigate(viewName, payload)
  }

  const guide = getCountryGuide(userCountry)
  const hasGuideDestinations = guide.mustVisit?.length > 0
  const exploreYourCountry = () => handleNavigate('explore', { initialCountry: userCountry })
  const myReviews = getAllReviewedDestinations()

  // Prioritize content for the user's selected country
  const itineraryPromptsForCountry = [...COMMON_ITINERARY_PROMPTS].sort(
    (a, b) => (b.country === userCountry ? 1 : 0) - (a.country === userCountry ? 1 : 0)
  )
  const peopleLikeEntries = Object.entries(SIMILAR_DESTINATIONS).sort(([keyA], [keyB]) => {
    const matchA = keyA.endsWith(`, ${userCountry}`) ? 1 : 0
    const matchB = keyB.endsWith(`, ${userCountry}`) ? 1 : 0
    return matchB - matchA
  })
  const reviewsForCountry = [...TRAVELER_REVIEWS].sort(
    (a, b) => (b.country === userCountry ? 1 : 0) - (a.country === userCountry ? 1 : 0)
  )
  const itinerariesForCountry = [...POPULAR_ITINERARIES].sort(
    (a, b) => (b.country === userCountry ? 1 : 0) - (a.country === userCountry ? 1 : 0)
  )

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h2 className={styles.heroTitle}>Your guide to every country</h2>
        <p className={styles.heroSubtitle}>
          {userCountry
            ? `Showing ideas for ${userCountry}. Discover the best destinations, when to go, and what to experience—or change “My country” in the header to see another place.`
            : 'Discover the best destinations, when to go, and what to experience. Plan your trips and pack with confidence.'}
        </p>
      </div>

      <div className={styles.getStarted} role="region" aria-label="What’s on the site">
        <p className={styles.getStartedTitle}>What you get for every country</p>
        <ul className={styles.getStartedList}>
          <li><strong>When to go</strong> — Best seasons and weather</li>
          <li><strong>Practical info</strong> — Currency, language, emergency numbers, visa notes, plugs</li>
          <li><strong>Safety & visitor info</strong> — Safety for women and foreigners, friendliness, laws, mental health context, and—if you set your profile—attitude towards foreigners and precautions by race</li>
          <li><strong>Culture & etiquette</strong> — Tipping, dress, gestures, and local norms</li>
          <li><strong>Useful phrases</strong> — Basic words in the local language</li>
          <li><strong>Must-sees & experiences</strong> — Curated places and what to do there</li>
          <li><strong>Trip planner</strong> — Add places to a trip, set dates, and track bookings</li>
        </ul>
        <p className={styles.getStartedDisclaimer}>All content is for general information only. Always verify with official sources before travel.</p>
      </div>
      <div className={styles.getStarted} role="region" aria-label="How to get started">
        <p className={styles.getStartedTitle}>How to get started</p>
        <ol className={styles.getStartedList}>
          <li><strong>Explore</strong> — Use the map or filters to pick a country or type of place (e.g. temples, beaches). Click any destination to see costs, tips, and add it to a trip.</li>
          <li><strong>Add to a trip</strong> — From a city card, click “Add to trip” and choose an existing trip or create a new one.</li>
          <li><strong>Plan</strong> — In My trips, set dates, add hotel and ticket links by day, and set your budget and pace.</li>
        </ol>
      </div>

      {hasGuideDestinations && (
        <section className={styles.yourCountrySection} aria-labelledby="your-country-heading">
          <h2 id="your-country-heading" className={styles.yourCountryTitle}>
            What to visit in {userCountry}
          </h2>
          <p className={styles.yourCountryIntro}>
            Top spots to explore in your country. Change “My country” in the menu above to see suggestions for another place.
          </p>
          <ul className={styles.yourCountryList}>
            {guide.mustVisit.slice(0, 6).map((city) => (
              <li key={city} className={styles.yourCountryItem}>{city}</li>
            ))}
            {guide.recommended?.length > 0 && guide.mustVisit.length < 6 &&
              guide.recommended.slice(0, 6 - guide.mustVisit.length).map((city) => (
                <li key={city} className={styles.yourCountryItem}>{city}</li>
              ))}
          </ul>
          <button type="button" className={styles.exploreCountryBtn} onClick={exploreYourCountry}>
            Explore {userCountry}
          </button>
        </section>
      )}

      <div className={styles.cards}>
        <Link to="/explore" className={styles.card}>
          <span className={styles.cardIcon}><IconExplore /></span>
          <span className={styles.cardTitle}>Explore the world</span>
          <span className={styles.cardDesc}>
            Browse the map, pick a country, and see top destinations and experiences.
          </span>
        </Link>
        <Link to="/rankings" className={styles.card}>
          <span className={styles.cardIcon}><IconExplore /></span>
          <span className={styles.cardTitle}>Country rankings</span>
          <span className={styles.cardDesc}>
            Compare countries by ease of travel, fun, safety, affordability, tourist welcome, and laws.
          </span>
        </Link>
        <Link to="/trips" className={styles.card}>
          <span className={styles.cardIcon}><IconTrips /></span>
          <span className={styles.cardTitle}>My trips</span>
          <span className={styles.cardDesc}>
            {tripCount === 0
              ? 'Create a trip and add destinations from Explore.'
              : `You have ${tripCount} trip${tripCount === 1 ? '' : 's'}. View and edit.`}
          </span>
        </Link>
      </div>

      <section className={styles.localDataSection} aria-labelledby="your-data-heading">
        <h2 id="your-data-heading" className={styles.promptsTitle}>
          Your reviews & likes
        </h2>
        <p className={styles.promptsIntro}>
          Your ratings and likes are saved on this device. Add a star rating, notes, or like/dislike from any city card in Explore—reviews are also shared with everyone (no account).
        </p>
        {myReviews.length > 0 ? (
          <ul className={styles.myReviewsList}>
            {myReviews.map((r) => (
              <li key={r.destinationKey} className={styles.myReviewItem}>
                <span className={styles.myReviewDest}>{r.destinationKey}</span>
                <span className={styles.myReviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                {r.text && <span className={styles.myReviewSnippet}>{r.text.slice(0, 60)}{r.text.length > 60 ? '…' : ''}</span>}
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noReviewsYet}>You haven’t reviewed any places yet. Go to <strong>Explore</strong>, click a city card, then add your review or tap Like/Dislike. Your take will appear for other travelers too.</p>
        )}
      </section>

      <section className={styles.magicSection} aria-labelledby="magic-heading">
        <h2 id="magic-heading" className={styles.promptsTitle}>
          Magic Moments
        </h2>
        <p className={styles.promptsIntro}>
          Shortcuts: plan a trip in 60 seconds, see an ultra-cheap world route, or get a vibe-based itinerary. Click to expand.
        </p>
        <div className={styles.worldTripChips}>
          {MAGIC_MOMENTS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={expandedMagic === id ? styles.promptChipActive : styles.promptChip}
              onClick={() => setExpandedMagic((p) => (p === id ? null : id))}
            >
              {label}
            </button>
          ))}
        </div>
        {expandedMagic && MAGIC_MOMENT_CONTENT[expandedMagic] && (
          <div className={styles.worldTripContent}>
            <h3 className={styles.rtwTitle}>{MAGIC_MOMENT_CONTENT[expandedMagic].title}</h3>
            <p className={styles.worldTripContentIntro}>{MAGIC_MOMENT_CONTENT[expandedMagic].intro}</p>
            {MAGIC_MOMENT_CONTENT[expandedMagic].steps && (
              <ol className={styles.rtwList}>
                {MAGIC_MOMENT_CONTENT[expandedMagic].steps.map((step, i) => (
                  <li key={i} className={styles.rtwItem}>{step}</li>
                ))}
              </ol>
            )}
            {MAGIC_MOMENT_CONTENT[expandedMagic].legs && (
              <ol className={styles.rtwList}>
                {MAGIC_MOMENT_CONTENT[expandedMagic].legs.map((leg, i) => (
                  <li key={i} className={styles.rtwItem}>
                    <strong>{leg.from} → {leg.to}</strong>
                    {leg.note && <span> — {leg.note}</span>}
                    {leg.budget && <span className={styles.rtwBudget}> {leg.budget}</span>}
                  </li>
                ))}
              </ol>
            )}
            {MAGIC_MOMENT_CONTENT[expandedMagic].tips && (
              <ul className={styles.cheapestList}>
                {MAGIC_MOMENT_CONTENT[expandedMagic].tips.map((tip, i) => (
                  <li key={i} className={styles.cheapestItem}>{tip}</li>
                ))}
              </ul>
            )}
            {MAGIC_MOMENT_CONTENT[expandedMagic].totalNote && (
              <p className={styles.rtwTotal}>{MAGIC_MOMENT_CONTENT[expandedMagic].totalNote}</p>
            )}
            {MAGIC_MOMENT_CONTENT[expandedMagic].cta && (
              <p className={styles.rtwTotal}>{MAGIC_MOMENT_CONTENT[expandedMagic].cta}</p>
            )}
          </div>
        )}
      </section>

      <section className={styles.templatesSection} aria-labelledby="templates-heading">
        <h2 id="templates-heading" className={styles.promptsTitle}>
          Ready-made itineraries
        </h2>
        <p className={styles.promptsIntro}>
          Day-by-day plans with timing and booking links. Examples: 3 Days in Paris, Cheap Bali, Best time to visit Japan. Click a title to open.
        </p>
        <div className={styles.templateCards}>
          {itinerariesForCountry.map((it) => {
            const detail = ITINERARY_DETAIL[it.id]
            const open = expandedItineraryId === it.id
            return (
              <div key={it.id} className={styles.templateCardWrap}>
                <button
                  type="button"
                  className={open ? styles.travelStyleCardActive : styles.travelStyleCard}
                  onClick={() => setExpandedItineraryId((p) => (p === it.id ? null : it.id))}
                >
                  {it.title}
                </button>
                {open && detail && (
                  <div className={styles.worldTripContent}>
                    <h3 className={styles.rtwTitle}>{detail.title}</h3>
                    {detail.subtitle && <p className={styles.worldTripContentIntro}>{detail.subtitle}</p>}
                    {detail.bestTimeText && (
                      <p className={styles.rtwTotal}><strong>Best time:</strong> {detail.bestTimeText}</p>
                    )}
                    {detail.mapNote && <p className={styles.rtwTotal}><strong>Map & route:</strong> {detail.mapNote}</p>}
                    {detail.travelTime && <p className={styles.rtwTotal}><strong>Travel time:</strong> {detail.travelTime}</p>}
                    {detail.days && detail.days.map((d) => (
                      <div key={d.day} className={styles.dayBlock}>
                        <h4 className={styles.dayTitle}>Day {d.day}: {d.title}</h4>
                        {d.hotelNote && <p className={styles.dayNote}>{d.hotelNote}</p>}
                        <ul className={styles.dayActivities}>
                          {d.activities.map((a, i) => (
                            <li key={i} className={styles.dayActivity}>
                              {a.time && <span className={styles.dayTime}>{a.time}</span>}
                              <span>{a.what}</span>
                              {a.link && (
                                <a href={a.link} target="_blank" rel="noopener noreferrer" className={styles.extLink}>
                                  {a.linkLabel || 'Book'}
                                </a>
                              )}
                            </li>
                          ))}
                        </ul>
                        {d.hotelLink && (
                          <a href={d.hotelLink} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
                            Find hotels
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className={styles.reviewsSection} aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className={styles.promptsTitle}>
          Traveler reviews
        </h2>
        <p className={styles.promptsIntro}>
          What other travelers say about these destinations. Use them as inspiration; add your own in Explore (stored only on your device).
        </p>
        <div className={styles.reviewsGrid}>
          {reviewsForCountry.slice(0, 6).map((r) => (
            <blockquote key={r.id} className={styles.reviewCard}>
              <p className={styles.reviewText}>"{r.text}"</p>
              <footer className={styles.reviewFooter}>
                <span className={styles.reviewStars}>{'★'.repeat(r.rating)}</span>
                <span className={styles.reviewAuthor}>{r.author}</span>
                <span className={styles.reviewDest}>{r.destination}, {r.country}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className={styles.peopleLikeSection} aria-labelledby="people-like-heading">
        <h2 id="people-like-heading" className={styles.promptsTitle}>
          If you liked that, try this
        </h2>
        <p className={styles.promptsIntro}>
          Destinations that go well together. Click a place to open that country in Explore.
        </p>
        <div className={styles.peopleLikeGrid}>
          {peopleLikeEntries.slice(0, 4).map(([key, list]) => (
            <div key={key} className={styles.peopleLikeBlock}>
              <p className={styles.peopleLikeFrom}>If you liked <strong>{key}</strong></p>
              <ul className={styles.peopleLikeList}>
                {list.slice(0, 3).map((item, i) => (
                  <li key={i}>
                    <button
                      type="button"
                      className={styles.suggestedChip}
                      onClick={() => countryNames.includes(item.country) && handleNavigate('explore', { initialCountry: item.country })}
                    >
                      {item.city}, {item.country}
                    </button>
                    <span className={styles.peopleLikeReason}> — {item.reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.travelStyleSection} aria-labelledby="travel-style-heading">
        <h2 id="travel-style-heading" className={styles.promptsTitle}>
          Plan by travel style
        </h2>
        <p className={styles.promptsIntro}>
          Tips and country ideas for family trips, backpacking, honeymoons, group travel, and visa-heavy routes. Click a card to expand.
        </p>
        <div className={styles.travelStyleGrid}>
          {TRAVEL_STYLES.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className={expandedTravelStyle === id ? styles.travelStyleCardActive : styles.travelStyleCard}
              onClick={() => setExpandedTravelStyle((p) => (p === id ? null : id))}
            >
              {label}
            </button>
          ))}
        </div>
        {expandedTravelStyle && TRAVEL_STYLE_CONTENT[expandedTravelStyle] && (
          <div className={styles.worldTripContent}>
            <h3 className={styles.rtwTitle}>{TRAVEL_STYLE_CONTENT[expandedTravelStyle].title}</h3>
            <p className={styles.worldTripContentIntro}>
              {TRAVEL_STYLE_CONTENT[expandedTravelStyle].intro}
            </p>
            <ul className={styles.cheapestList}>
              {TRAVEL_STYLE_CONTENT[expandedTravelStyle].tips.map((tip, i) => (
                <li key={i} className={styles.cheapestItem}>{tip}</li>
              ))}
            </ul>
            {TRAVEL_STYLE_CONTENT[expandedTravelStyle].suggestedCountries?.length > 0 && (
              <>
                <p className={styles.suggestedLabel}>Suggested countries to explore</p>
                <div className={styles.suggestedCountryChips}>
                  {TRAVEL_STYLE_CONTENT[expandedTravelStyle].suggestedCountries
                    .filter((c) => countryNames.includes(c))
                    .map((country) => (
                      <button
                        key={country}
                        type="button"
                        className={styles.suggestedChip}
                        onClick={() => handleNavigate('explore', { initialCountry: country })}
                      >
                        {country}
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section className={styles.worldTripSection} aria-labelledby="world-trip-heading">
        <h2 id="world-trip-heading" className={styles.promptsTitle}>
          World trip ideas
        </h2>
        <p className={styles.promptsIntro}>
          Cheapest countries for long-term travel and sample round-the-world routes. Click to see the list.
        </p>
        <div className={styles.worldTripChips}>
          <button
            type="button"
            className={expandedWorldPrompt === 'cheapest' ? styles.promptChipActive : styles.promptChip}
            onClick={() => setExpandedWorldPrompt((p) => (p === 'cheapest' ? null : 'cheapest'))}
          >
            Cheapest countries for a world trip
          </button>
          <button
            type="button"
            className={expandedWorldPrompt === 'rtw' ? styles.promptChipActive : styles.promptChip}
            onClick={() => setExpandedWorldPrompt((p) => (p === 'rtw' ? null : 'rtw'))}
          >
            Plan a round-the-world route under $5k
          </button>
        </div>
        {expandedWorldPrompt === 'cheapest' && (
          <div className={styles.worldTripContent}>
            <p className={styles.worldTripContentIntro}>
              Budget-friendly countries for long-term travel. Costs vary; research visas and current prices.
            </p>
            <ul className={styles.cheapestList}>
              {CHEAPEST_COUNTRIES_FOR_WORLD_TRIP.map(({ country, note }) => (
                <li key={country} className={styles.cheapestItem}>
                  <strong>{country}</strong>
                  {note && <span> — {note}</span>}
                  {countryNames.includes(country) && (
                    <button
                      type="button"
                      className={styles.inlineLink}
                      onClick={() => handleNavigate('explore', { initialCountry: country })}
                    >
                      Explore
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
        {expandedWorldPrompt === 'rtw' && (
          <div className={styles.worldTripContent}>
            <h3 className={styles.rtwTitle}>{RTW_ROUTE_UNDER_5K.title}</h3>
            <p className={styles.worldTripContentIntro}>{RTW_ROUTE_UNDER_5K.description}</p>
            <ol className={styles.rtwList}>
              {RTW_ROUTE_UNDER_5K.legs.map((leg, i) => (
                <li key={i} className={styles.rtwItem}>
                  <strong>{leg.from} → {leg.to}</strong>
                  {leg.note && <span> — {leg.note}</span>}
                  {leg.budget && <span className={styles.rtwBudget}> {leg.budget}</span>}
                </li>
              ))}
            </ol>
            <p className={styles.rtwTotal}>{RTW_ROUTE_UNDER_5K.totalNote}</p>
          </div>
        )}
      </section>

      {onCreateItineraryTrip && (
        <section className={styles.promptsSection} aria-labelledby="common-questions-heading">
          <h2 id="common-questions-heading" className={styles.promptsTitle}>
            Build an itinerary in one click
          </h2>
          <p className={styles.promptsIntro}>
            Choose a duration and country below. We’ll create a trip with suggested places; you can then edit dates and add or remove destinations in My trips.
          </p>
          <div className={styles.promptChips}>
            {itineraryPromptsForCountry.map(({ days, country }) => (
              <button
                key={`${days}-${country}`}
                type="button"
                className={styles.promptChip}
                onClick={() => handleItineraryPrompt(days, country)}
              >
                {formatItineraryPromptLabel(days, country)}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
