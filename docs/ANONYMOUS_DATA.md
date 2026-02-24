# Storing likes, dislikes, and reviews without user accounts

You can keep **reviews**, **likes/dislikes**, and **tips** in a database and show them to everyone **without** sign-up, email, or accounts.

## How it works

1. **No accounts** – You never ask for email, name, or password. Nobody “signs in”.
2. **Anonymous submissions** – When someone adds a review or clicks Like/Dislike, the app sends that action to your API with **no user id**. Optionally you use a **device fingerprint** (a random ID stored only in their browser) so each device has at most one vote per place – still no account.
3. **Central database** – Your backend (e.g. Netlify Functions + Blobs) stores:
   - **Reviews/tips:** e.g. `destination`, `rating`, `text`, `date`. No user id.
   - **Votes:** e.g. `destination`, `vote` (like/dislike), and optionally `fingerprint` so you can enforce “one vote per device” and show “Your vote” back.

## What you store

| Data        | Stored in DB                    | Identifies user? |
|------------|----------------------------------|------------------|
| Reviews    | `destination`, `rating`, `text`, `date` | No (or optional fingerprint) |
| Tips       | Same as reviews (or a separate “tips” table with same idea) | No |
| Like/Dislike | `destination`, `vote`, optional `fingerprint` | No; fingerprint only = “this device” |

- **Reviews/tips:** Append-only. Each submission is a new row (or new item in a list). You can show “Community reviews” and “Tips” from the DB to everyone.
- **Likes/dislikes:** Either:
  - **Simple:** Append every click → total “likes” and “dislikes” per destination (no “one per person”; easy to implement).
  - **One per device:** Send a **fingerprint** (random UUID in localStorage, generated once). Backend stores `(destination, fingerprint, vote)` and replaces the previous vote for that fingerprint → one like or dislike per destination per device; you can return “your vote” to the UI.

## In this app

- **Reviews** (and tips, if you use the same flow) are already in the **database** (Netlify Blobs): anonymous POST, no account. See `netlify/functions/reviews.mjs` and “Community reviews” in the city modal.
- **Likes/dislikes** are added the same way: a **votes** API (Netlify function + Blobs) that accepts anonymous POST with optional fingerprint so you can show counts and “your vote” without accounts.

No email, no accounts – only optional fingerprint for “one vote per device” and to show the user their own vote.
