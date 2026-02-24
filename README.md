# Atripza (atripza.com)

A simple, local-first travel planner: create trips, add destinations with dates, and manage packing lists. Data is stored in your browser (localStorage).

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Stack

- **React 18** + **Vite 5**
- CSS modules, no UI framework
- localStorage for persistence

## Database & hosting

See **[DATABASE_AND_HOSTING.md](./DATABASE_AND_HOSTING.md)** for:
- How the database works (localStorage: trips, country, reviews, votes)
- Optional central DB for shared reviews without accounts
- How to host (Vercel, Netlify, GitHub Pages)
