// Inline SVG icons for nav and destination categories. Use with className for size/color.

const iconClass = 'icon-svg'

export function IconHome({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function IconExplore({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function IconTrips({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  )
}

export function IconGlobe({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export function IconCategory({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
    </svg>
  )
}

// Category icons (destination types)
function IconTemple({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2L4 6v2h16V6L12 2z" />
      <path d="M4 10v10h6V14h4v6h6V10H4z" />
    </svg>
  )
}
function IconCastle({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 22h16v-8l-4-4V8l4-4h-4V2h-2v2h-4V2H8v2H4l4 4v2l-4 4v8z" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="12" y1="12" x2="12" y2="22" />
    </svg>
  )
}
function IconStar({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
function IconBeach({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      <path d="M12 17c-2.5 0-5-2-5-5s2.5-5 5-5 5 2 5 5-2.5 5-5 5z" />
    </svg>
  )
}
function IconMountain({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}
function IconHistorical({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      <rect x="6" y="8" width="12" height="8" rx="1" />
    </svg>
  )
}
function IconMuseum({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2L2 7v2h20V7L12 2z" />
      <path d="M4 11v10h4V14h8v7h4V11H4z" />
    </svg>
  )
}
function IconNightlife({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M9 2h6v12a4 4 0 1 1-8 0V2z" />
      <path d="M12 2v3M12 18v2" />
    </svg>
  )
}
function IconFood({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 8c0-3.31-2.69-6-6-6S6 4.69 6 8v12h12V8z" />
      <path d="M6 12h12" />
    </svg>
  )
}
function IconAdventure({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 2L9 8l-7 1 5 5-1 7 6-3 6 3-1-7 5-5-7-1 3-6z" />
    </svg>
  )
}
function IconZoo({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22c4 0 6-4 6-9s-2-9-6-9-6 4-6 9 2 9 6 9z" />
      <path d="M8 13h.01M16 13h.01M10 17s.5-2 2-2 2 2 2 2" />
    </svg>
  )
}
function IconNature({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 22V12M12 12c-2 0-4-2-4-5s2-5 4-5 4 2 4 5-2 5-4 5z" />
    </svg>
  )
}
function IconLandmark({ className = '' }) {
  return (
    <svg className={`${iconClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  )
}

const categoryIconMap = {
  'Temples & religious sites': IconTemple,
  'Castles & palaces': IconCastle,
  'Popular destinations': IconStar,
  'Beaches & islands': IconBeach,
  'Mountains & nature': IconMountain,
  'Historical & ancient sites': IconHistorical,
  'Museums & culture': IconMuseum,
  'Nightlife & cities': IconNightlife,
  'Food & wine': IconFood,
  'Adventure & outdoor': IconAdventure,
  'Zoos & wildlife': IconZoo,
  'Nature & national parks': IconNature,
  'Iconic sights & landmarks': IconLandmark,
}

/** Render the icon for a destination category. Use with a wrapper that sets size (e.g. .categoryIcon). */
export function CategoryIcon({ categoryName, className = '' }) {
  const Icon = categoryIconMap[categoryName]
  if (!Icon) return null
  return <Icon className={className} />
}

export { categoryIconMap }
