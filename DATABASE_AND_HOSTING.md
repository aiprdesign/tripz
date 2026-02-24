# Database & Hosting Guide — Atripza (atripza.com)

## How the database works today

The app is **local-first**: all data lives in the **browser** (localStorage). No server, no accounts, no data collection.

| What | Where | Keys / shape |
|------|--------|---------------|
| **Trips** (name, dates, destinations, schedule, packing, preferences) | `localStorage` | `travel-planner-trips` — array of trip objects |
| **User’s country** (for “My country” in header) | `localStorage` | `travel-planner-user-country` — string (e.g. `"United States"`) |
| **Reviews** (star rating + text per destination) | `localStorage` | `wander-local-reviews` — object keyed by `"City, Country"` |
| **Likes / dislikes** (per destination) | `localStorage` | `wander-local-votes` — object keyed by `"City, Country"`, value `"like"` or `"dislike"` |

- **Trips**: `App.jsx` loads/saves via `loadTrips()` / `saveTrips()`.
- **Reviews & votes**: `src/data/localUserData.js` — `getReview`, `setReview`, `removeReview`, `getVote`, `setVote`, `getAllReviewedDestinations`, `getAllVotes`.

So the “database” is just the browser: each user only sees their own trips, country, reviews, and votes. Clearing site data or using another device = fresh data.

---

## Optional: central database (shared reviews, no accounts)

If you want **reviews and likes from everyone** to show on the site (still without email/accounts), you need a **central store**. You can do that **with or without Supabase**.

### Option A: Supabase (or Firebase)

- **Supabase** or **Firebase** — managed backend + DB, free tiers. Tables for `community_reviews` and `community_votes`; allow anonymous inserts and public reads. Your app calls their APIs with `fetch()`.

### Option B: Without Supabase — other options

Yes, you can do shared reviews **without Supabase**. Pick one of these:

1. **Firebase (Google)**  
   - Firestore or Realtime Database. Same idea as Supabase: no server to run, anonymous read/write rules. Just a different vendor.

2. **Your own small backend**  
   - A minimal **Node + Express** (or similar) API that:
     - Writes reviews/votes to a **SQLite** or **Postgres** database.
     - Serves GET (list reviews, vote counts) and POST (add review, add vote).
   - Host the API on **Railway**, **Render**, **Fly.io**, or a small VPS. You run one process; no Supabase.

3. **Serverless + any managed DB**  
   - **Vercel** or **Netlify** serverless functions act as your API (a few endpoints).  
   - Store data in any managed DB you like, for example:
     - **Turso** (SQLite at edge, free tier)
     - **Neon** (Postgres, free tier)
     - **PlanetScale** (MySQL, free tier)
     - **MongoDB Atlas** (free tier)
   - No long‑running server, no Supabase; you just write a few serverless handlers and connect them to the DB.

### App changes (same for any option)

- Add a small API layer (e.g. `src/data/communityData.js`) that:
  - **Submits** a review or vote with `fetch()` to your API (no login).
  - **Loads** reviews and vote counts per destination when opening a city modal or listing.
- In the UI, show “Community reviews” and like/dislike counts from that API; “Add your review” / Like–Dislike post to the same API.

So: **with Supabase** = one vendor for DB + API. **Without Supabase** = use Firebase, or your own backend (Node + SQLite/Postgres), or serverless functions + Turso/Neon/PlanetScale/MongoDB. All can support anonymous, no-account reviews and likes.

---

## How to host the app

The app is a **static Vite + React** build. You only need to host the built files (no Node server in production).

### 1. Build

```bash
cd /Users/ibestlifeapps/cursor_apps/travel_planner
npm install
npm run build
```

Output is in `dist/` (HTML, JS, CSS). That’s what you deploy.

### 2. Host on Vercel (recommended, free)

1. Push the project to **GitHub** (if not already).
2. Go to [vercel.com](https://vercel.com) → Sign in → **Add New Project**.
3. Import the repo. Vercel will detect Vite; use:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Deploy. You get a URL like `https://your-project.vercel.app`.

**CLI option:**

```bash
npm i -g vercel
vercel login
vercel
```

Follow prompts; then `vercel --prod` for production.

### 3. Host on Netlify

1. Push to **GitHub**.
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import from Git**.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Deploy. URL like `https://your-site.netlify.app`.

**CLI:**

```bash
npm i -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### 4. Host on GitHub Pages

1. In `vite.config.js`, set `base: '/your-repo-name/'` (e.g. `base: '/travel_planner/'`).
2. Build: `npm run build`.
3. Use the **gh-pages** package or push `dist` contents to a branch and turn on GitHub Pages for that branch.

---

## Summary

- **Database now:** localStorage only — trips, country, reviews, votes; all on the user’s device.
- **Central DB (optional):** Add a central store (Supabase, Firebase, your own backend, or serverless + Turso/Neon/PlanetScale/MongoDB) + a small API layer so reviews/likes are shared, still without email or accounts.
- **Hosting:** Build with `npm run build`, then deploy the `dist/` folder to **Vercel**, **Netlify**, or **GitHub Pages**; no server required for the current app.

---

## Admin dashboard (Netlify)

When deployed on Netlify you get an **admin dashboard** to see all collective reviews, ratings, and top visits.

- **Open:** Click **Admin** in the footer, or go to `https://your-site.netlify.app/#admin`.
- **Login:** Enter your **admin key** (no account; key-only). The key is set in Netlify: **Site settings → Environment variables** → add `ADMIN_SECRET` with a long random string (e.g. a password or `openssl rand -hex 32`). Only requests that send this key (in the query as `?key=...` or header `X-Admin-Key`) can read the dashboard data.
- **Dashboard shows:** Security & health (store status, total destinations, total reviews, average rating), **top visits** (destinations sorted by review count), and **all reviews by destination** (expandable list). Use **Refresh** to reload; **Log out** clears the key from the session so the next visitor must enter it again.
