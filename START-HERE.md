# Start the app (fix Error -102)

**Error -102 means the app server is not running.** Start it once, then open the URL in your browser.

## Option 1: Double‑click (Mac)

1. In Finder, go to the folder: `travel_planner`
2. **Double‑click `start.command`**
3. If macOS says it’s from an unidentified developer: right‑click → Open → Open
4. A Terminal window will open. Wait until you see a line like:
   ```text
   ➜  Local:   http://localhost:5173/
   ```
5. **Open that URL in your browser** (Chrome, Safari, etc.), or click the link if your terminal supports it.

Leave the Terminal window open while you use the app.

---

## Option 2: Run in Cursor’s terminal

1. In Cursor, press **Ctrl+`** (or **Cmd+`** on Mac) to open the terminal.
2. Paste this and press Enter:
   ```bash
   cd /Users/ibestlifeapps/cursor_apps/travel_planner && npm install && npm run dev
   ```
3. When you see `Local: http://localhost:5173/`, open that URL in your browser.

---

## If you see “npm: command not found”

You need Node.js installed:

1. Go to **https://nodejs.org**
2. Download and install the **LTS** version.
3. Restart Cursor (or your terminal), then try Option 1 or 2 again.
