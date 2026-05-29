# ET Shorts — PWA Installation Guide

## What's included
- `index.html` — Main app
- `manifest.json` — PWA manifest (home screen icon, name, theme)
- `sw.js` — Service worker (offline cache + notifications)

---

## How to install on your phone (Add to Home Screen)

### Android (Chrome)
1. Open `index.html` hosted on any HTTPS server (see hosting below)
2. Tap the **⋮ menu** → "Add to Home screen"
3. Tap "Add" — ET Shorts icon appears on your home screen
4. Open it — it runs like a native app (no browser bar)

### iPhone (Safari)
1. Open the hosted URL in **Safari** (not Chrome)
2. Tap the **Share icon** (box with arrow)
3. Scroll down → "Add to Home Screen"
4. Tap "Add"

---

## How to host (free, 2 minutes)

### Option A — Netlify Drop (easiest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `et-shorts-pwa` folder into the browser
3. Get a free `https://xxx.netlify.app` URL
4. Open that URL on your phone → Add to Home Screen ✅

### Option B — GitHub Pages
1. Push the folder to a GitHub repo
2. Go to Settings → Pages → Deploy from main branch
3. Your URL: `https://yourusername.github.io/et-shorts-pwa/`

---

## Features
- ⚡ **Shorts tab**: AI-generated 60-word summaries, filtered by section
- 📰 **Newspaper tab**: Full archive, open any edition as PDF in-app
- 🔔 **Notifications**: 8 AM daily alert when today's paper is ready
- 🤖 **Auto PDF fetch**: Scrapes dailyepaper.in daily for the latest link
- 💾 **Cache**: Same-day results cached — no repeat API calls
- 📱 **PWA**: Runs offline (cached), installable, no app store needed

---

## Notes
- PDF loading requires Google Drive to allow public access (which these links do)
- If today's PDF isn't up yet (before 8 AM), the app shows the most recent edition
- Notification scheduling works best when the app is added to home screen
