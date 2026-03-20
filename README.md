# Tarkle

Tarkle is a React + Vite web app scaffold for a Wordle-style game.

### Notes

- Data endpoint currently used: https://api.tarkov.dev/graphql
- Keep all educational copy original and practical; avoid thin or duplicate text.

## Run locally

```bash
npm install
npm run dev
```

To test API routes like /api/contact locally, run:

```bash
npm run dev:vercel
```

This uses a small Node wrapper that loads `.env.local` first and then starts `vercel dev --local`, so local testing prefers your local secrets instead of the linked Vercel project's dashboard env vars.

If you want to test against the linked Vercel project env/config instead, run:

```bash
npm run dev:vercel:linked
```

The Vite dev server alone does not run Vercel serverless functions, so /api/contact returns 404 when using only npm run dev.

For local API testing, pull the project env vars into a local env file once:

```bash
npx vercel env pull .env.local
```

At minimum, your local `.env.local` needs `RESEND_API_KEY` for `/api/contact` to work.

## Contact Form Email Delivery

The Contact page submits to `/api/contact`, a Vercel Serverless Function that sends email using Resend.

Required environment variables:

- `RESEND_API_KEY`

Optional:

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (defaults to `Tarkle Contact <onboarding@resend.dev>`)
- `VITE_CONTACT_FORM_ENDPOINT` (defaults to `/api/contact`)
- `CONTACT_RATE_LIMIT_MAX` (defaults to `3`)
- `CONTACT_RATE_LIMIT_WINDOW_MS` (defaults to `900000` = 15 minutes)

The contact endpoint also sends a branded HTML email plus plain text fallback to make incoming messages easier to spot.

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
