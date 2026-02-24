import { useState, useEffect } from 'react'
import { getCityTripInfo } from '../data/cityTripInfo'
import { getDestinationImageUrlForCity } from '../data/destinationImages'
import { getReview, setReview, removeReview, getVote, setVote } from '../data/localUserData'
import { getCommunityReviews, submitCommunityReview, getCommunityVotes, submitCommunityVote } from '../data/communityData'
import styles from './CityDetailModal.module.css'

export default function CityDetailModal({
  city,
  country,
  onClose,
  onAddToTrip,
  onExploreCountry,
}) {
  const label = `${city}, ${country}`
  const info = getCityTripInfo(city, country)
  const [review, setReviewState] = useState(() => getReview(label))
  const [vote, setVoteState] = useState(() => getVote(label))
  const [communityReviews, setCommunityReviews] = useState([])
  const [loadingCommunity, setLoadingCommunity] = useState(false)
  const [communityVotes, setCommunityVotes] = useState({ likes: 0, dislikes: 0, userVote: null })
  const [loadingVotes, setLoadingVotes] = useState(false)
  const [editingReview, setEditingReview] = useState(false)
  const [reviewRating, setReviewRating] = useState(review?.rating ?? 5)
  const [reviewText, setReviewText] = useState(review?.text ?? '')

  useEffect(() => {
    setReviewState(getReview(label))
    setVoteState(getVote(label))
  }, [label])

  useEffect(() => {
    let cancelled = false
    setLoadingCommunity(true)
    getCommunityReviews(label).then((list) => {
      if (!cancelled) {
        setCommunityReviews(list)
        setLoadingCommunity(false)
      }
    }).catch(() => { if (!cancelled) setLoadingCommunity(false) })
    return () => { cancelled = true }
  }, [label])

  useEffect(() => {
    let cancelled = false
    setLoadingVotes(true)
    getCommunityVotes(label).then((data) => {
      if (!cancelled) {
        setCommunityVotes(data)
        setLoadingVotes(false)
      }
    }).catch(() => { if (!cancelled) setLoadingVotes(false) })
    return () => { cancelled = true }
  }, [label])

  useEffect(() => {
    if (review) {
      setReviewRating(review.rating)
      setReviewText(review.text)
    } else {
      setReviewRating(5)
      setReviewText('')
    }
  }, [review])

  const handleSaveReview = async () => {
    const r = setReview(label, { rating: reviewRating, text: reviewText })
    setReviewState(r)
    setEditingReview(false)
    const submitted = await submitCommunityReview(label, { rating: reviewRating, text: reviewText })
    if (submitted) {
      setCommunityReviews((prev) => [...prev, submitted])
    }
  }

  const handleRemoveReview = () => {
    removeReview(label)
    setReviewState(null)
    setReviewText('')
    setReviewRating(5)
    setEditingReview(false)
  }

  const handleVote = async (value) => {
    const next = (communityVotes.userVote ?? vote) === value ? null : value
    setVote(label, next)
    setVoteState(next)
    const result = await submitCommunityVote(label, next)
    if (result) {
      setCommunityVotes((prev) => ({
        ...prev,
        likes: result.likes ?? prev.likes,
        dislikes: result.dislikes ?? prev.dislikes,
        userVote: next,
      }))
    }
  }

  const displayVote = communityVotes.userVote ?? vote

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="city-detail-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div
          className={styles.hero}
          style={{ backgroundImage: `url(${getDestinationImageUrlForCity(city, country)})` }}
        />
        <div className={styles.header}>
          <h2 id="city-detail-title" className={styles.title}>{city}</h2>
          <p className={styles.country}>{country}</p>
          <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Your take</h3>
            <p className={styles.localOnlyNote}>No account. Add a rating or like/dislike; they’re shared with everyone.</p>
            <div className={styles.voteRow}>
              <button
                type="button"
                className={displayVote === 'like' ? styles.voteBtnActive : styles.voteBtn}
                onClick={() => handleVote('like')}
                aria-pressed={displayVote === 'like'}
                title="I liked it"
              >
                👍 Like
              </button>
              <button
                type="button"
                className={displayVote === 'dislike' ? styles.voteBtnActive : styles.voteBtn}
                onClick={() => handleVote('dislike')}
                aria-pressed={displayVote === 'dislike'}
                title="Not for me"
              >
                👎 Dislike
              </button>
              {!loadingVotes && (communityVotes.likes > 0 || communityVotes.dislikes > 0) && (
                <span className={styles.voteCounts}>
                  {communityVotes.likes} likes · {communityVotes.dislikes} dislikes
                </span>
              )}
            </div>
            {!review && !editingReview && (
              <button type="button" className={styles.addReviewBtn} onClick={() => setEditingReview(true)}>
                Add your review
              </button>
            )}
            {review && !editingReview && (
              <div className={styles.yourReview}>
                <div className={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                <p className={styles.reviewBody}>{review.text}</p>
                <span className={styles.reviewDate}>{review.date}</span>
                <button type="button" className={styles.editReviewBtn} onClick={() => setEditingReview(true)}>Edit</button>
                <button type="button" className={styles.removeReviewBtn} onClick={handleRemoveReview}>Remove</button>
              </div>
            )}
            {editingReview && (
              <div className={styles.reviewForm}>
                <label className={styles.reviewFormLabel}>
                  Rating
                  <select value={reviewRating} onChange={(e) => setReviewRating(Number(e.target.value))} className={styles.reviewSelect}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} ★</option>
                    ))}
                  </select>
                </label>
                <label className={styles.reviewFormLabel}>
                  Your review
                  <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className={styles.reviewTextarea} rows={3} placeholder="Optional notes..." />
                </label>
                <div className={styles.reviewFormActions}>
                  <button type="button" className={styles.saveReviewBtn} onClick={handleSaveReview}>Save</button>
                  <button type="button" className={styles.cancelReviewBtn} onClick={() => { setEditingReview(false); if (!review) setReviewText(''); setReviewRating(5); }}>Cancel</button>
                </div>
              </div>
            )}
          </section>
          <section className={styles.section} aria-labelledby="community-reviews-heading">
            <h3 id="community-reviews-heading" className={styles.sectionTitle}>Community reviews</h3>
            <p className={styles.localOnlyNote}>Reviews from everyone. No account needed to add one.</p>
            {loadingCommunity ? (
              <p className={styles.communityLoading}>Loading…</p>
            ) : communityReviews.length === 0 ? (
              <p className={styles.communityEmpty}>No reviews yet. Be the first to add one above.</p>
            ) : (
              <ul className={styles.communityReviewList}>
                {communityReviews.map((r) => (
                  <li key={r.id} className={styles.communityReviewItem}>
                    <span className={styles.communityReviewStars}>{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                    {r.text && <p className={styles.communityReviewText}>{r.text}</p>}
                    <span className={styles.communityReviewDate}>{r.date}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Costs & currency</h3>
            <p className={styles.localOnlyNote}>Rough ranges to help you budget. Prices vary by season and area.</p>
            <dl className={styles.infoGrid}>
              <dt>Currency</dt>
              <dd>{info.currency}{info.currencyCode ? ` (${info.currencyCode})` : ''}</dd>
              <dt>Cost of living</dt>
              <dd>{info.costOfLivingLevel}</dd>
              <dt>Hotels (avg per night)</dt>
              <dd>{info.hotelAvgPerNight}</dd>
              <dt>Food (avg per day)</dt>
              <dd>{info.foodAvgPerDay}</dd>
            </dl>
          </section>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Things to avoid</h3>
            <p className={styles.localOnlyNote}>Common pitfalls so you can plan smarter.</p>
            <ul className={styles.avoidList}>
              {info.thingsToAvoid.map((item, i) => (
                <li key={i} className={styles.avoidItem}>{item}</li>
              ))}
            </ul>
          </section>
          <div className={styles.actions}>
            {onAddToTrip && (
              <button type="button" className={styles.primaryBtn} onClick={() => onAddToTrip(label)}>
                Add to trip
              </button>
            )}
            {onExploreCountry && (
              <button type="button" className={styles.secondaryBtn} onClick={() => onExploreCountry(country)}>
                Explore {country}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
