# Tarkle

Tarkle is a Tarkov-focused web project that combines interactive tools, game-like learning experiences, and practical reference content into one deployable site.

## Why I built it

I built Tarkle as a resume booster and skills showcase.

The goal is to demonstrate that I can:

- Build production-ready React applications, not just isolated UI demos
- Design modular frontend architecture that can scale with new features
- Integrate third-party data APIs and transform raw data into usable UX
- Ship full-stack workflows (frontend + serverless API + email delivery)
- Continuously iterate on content, performance, and site structure

## Technology behind the site

### Frontend stack

- React 19 + Vite 8
- React Router-style route configuration with an app shell pattern
- Feature-first organization for game logic and UI
- Markdown rendering for content-rich pages (`react-markdown` + `remark-gfm`)

### Application architecture

- `src/app`: shared shell, route config, navigation, reusable layout components
- `src/features/tarkle`: game domain modules (components, hooks, constants, utils)
- `src/pages`: content and feature pages split by domain (core, guides, legal, reference)
- `src/styles`: global and page-level style layers for responsive behavior

### Data and domain logic

- External GraphQL source: `https://api.tarkov.dev/graphql`
- Dedicated utilities to fetch and normalize weapon/ammo data
- Guess evaluation logic isolated in utility modules for testable rule handling

### Full-stack pieces

- Vercel serverless function at `/api/contact`
- Resend integration for contact form email delivery
- Configurable rate limiting and sender/recipient environment settings

### Ops and quality

- ESLint 9 for linting and code quality guardrails
- Vercel deployment with support for local API simulation
- Analytics + Speed Insights integration via Vercel packages

## Local development

Install and run the app:

```bash
npm install
npm run dev
```

Run with local Vercel function support (recommended when testing `/api/contact`):

```bash
npm run dev:vercel
```

Run against linked Vercel project environment/config:

```bash
npm run dev:vercel:linked
```

The Vite dev server alone does not run Vercel serverless functions, so `/api/contact` returns 404 with only `npm run dev`.

Optional first-time env pull:

```bash
npx vercel env pull .env.local
```

Minimum required for contact delivery:

- `RESEND_API_KEY`

Optional contact config:

- `CONTACT_TO_EMAIL`
- `CONTACT_FROM_EMAIL` (default: `Tarkle Contact <onboarding@resend.dev>`)
- `VITE_CONTACT_FORM_ENDPOINT` (default: `/api/contact`)
- `CONTACT_RATE_LIMIT_MAX` (default: `3`)
- `CONTACT_RATE_LIMIT_WINDOW_MS` (default: `900000` / 15 minutes)

## Recent changes

Most recent updates have focused on turning Tarkle from a single game experience into a broader content + tools platform:

- Embedded README-style project context directly into the home page
- Refreshed home page structure and improved update visibility
- Added a left-side navigation layout for better discoverability
- Temporarily removed ads while improving core UX and content focus
- Added BTR tracker pages, including in-game time tracker enhancements
- Refactored key areas toward cleaner project conventions
- Fixed contact form delivery flow and added leave-confirmation safeguards
- Expanded high-value informational content and improved routing/styling
- Performed SEO-focused updates across core pages

## Project direction

Near-term work is focused on deeper data-driven features, better gameplay feedback loops, and continued content quality improvements that make Tarkle useful to both players and recruiters reviewing the project.