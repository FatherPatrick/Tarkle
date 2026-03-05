# Tarkle

Tarkle is a React + Vite web app scaffold for a Wordle-style game.

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
