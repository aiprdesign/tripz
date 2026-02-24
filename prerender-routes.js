/**
 * List of routes to prerender to static HTML (used by vite-plugin-prerender).
 * Kept in a separate file so we can import countryNames without pulling the full app.
 */
import { countryNames } from './src/data/destinationsByCountry.js'

export const prerenderRoutes = [
  '/',
  '/explore',
  '/trips',
  '/rankings',
  '/admin',
  ...countryNames.map((c) => `/explore/${encodeURIComponent(c)}`),
]
