# Tarkle

Tarkle is a React + Vite web app scaffold for a Wordle-style game.

## AdSense Approval TODO

Status: In progress (created March 18, 2026)

Use this checklist to track content work before submitting another AdSense review.

### 4) SEO and Crawlability Essentials

- [ ] Replace temporary site title/metadata in index.html
- [ ] Add route-specific page titles and meta descriptions
- [ ] Add stronger internal linking between game pages and guides
- [ ] Add sitemap.xml and robots.txt (if missing)

### 5) Improve Existing Thin Pages

- [ ] Expand homepage with: What is Tarkle, How to Play, Scoring Example, Recent Updates
- [ ] Expand Privacy page with fuller policy details and ad-data notes
- [ ] Expand Terms page with clearer usage and limitations language

### 6) Ad Placement and Quality Signals

- [ ] Keep ad density moderate on content pages
- [ ] Avoid ad-heavy layouts on low-text pages
- [ ] Keep publishing cadence visible (regular updates over multiple weeks)

### Reapply Readiness Checklist

- [ ] At least 12 indexable pages exist
- [ ] At least 8 pages have substantial original content
- [ ] Navigation and internal links are consistent across pages
- [ ] Legal and trust pages are complete and accessible
- [ ] Content has been updated recently before re-submission

### Notes

- Data endpoint currently used: https://api.tarkov.dev/graphql
- Keep all educational copy original and practical; avoid thin or duplicate text.

## Run locally

```bash
npm install
npm run dev
```

## Current infrastructure

- App shell and page layer:
	- `src/app/AppShell.jsx`
	- `src/pages/GamePage.jsx`
- Feature-first game modules:
	- `src/features/tarkle/components`
	- `src/features/tarkle/hooks/useTarkleGame.js`
	- `src/features/tarkle/utils`
	- `src/features/tarkle/constants/gameConfig.js`
- Styles:
	- `src/index.css`
	- `src/App.css`
	- `src/features/tarkle/Tarkle.css`

## Included baseline behavior

- 5-letter, 6-attempt game loop scaffold
- Keyboard and physical key input handling
- Tile state rendering (`correct`, `present`, `absent`)
- Reset button and game status messaging

This setup is intended as infrastructure so you can plug in dictionary validation, daily words, and persistence next.
