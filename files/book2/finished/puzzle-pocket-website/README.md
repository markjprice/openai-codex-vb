# Puzzle Pocket website

The website for Puzzle Pocket, a mobile game with three classic puzzles. It
has five pages, a playable noughts and crosses demo, and a contact form. This
is the finished version from the end of Book 2. Compare it with yours, or
copy it into your Codex Projects folder to continue with Book 3.

## What you need

- Node.js (the LTS version)

## Start

```
npm install
npm run dev
```

Open the address the terminal shows, such as http://localhost:5173.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development preview, which reloads when files change |
| `npm run dev -- --host` | The same, but also visible to your phone on the same Wi-Fi |
| `npm test` | Runs the unit tests: the demo rules, the form checks, and the design tokens |
| `npm run tokens` | Regenerates `src/styles/tokens.css` from `design-tokens.json` |
| `npm run build` | Creates the finished site in `dist`, ready to publish |
| `npm run preview` | Shows the finished site from `dist` |
| `npm run test:e2e` | Builds the site and runs the browser tests and accessibility scan |

The first time you run the browser tests, install Playwright's browsers:

```
npx playwright install
```

To run the browser tests against the published site, set `BASE_URL` first
(see `playwright.config.js`).

## How the project is organized

| File or folder | What it's for |
| --- | --- |
| `index.html`, `how-to-play.html`, `support.html`, `privacy.html`, `contact.html` | The five pages |
| `src/components/` | The navigation, footer, puzzle cards, mockups, and page metadata, defined once and inserted into every page when the site is built |
| `src/styles/main.css` | How every page looks, using only design tokens |
| `src/styles/tokens.css` | The design tokens as CSS. Generated: don't edit it by hand |
| `src/demo/rules.js` | The noughts and crosses rules, reused in Book 3 |
| `src/demo/demo.js` | Draws the demo board and responds to players |
| `src/contact/validate.js` | Checks what visitors type into the contact form |
| `src/contact/form.js` | Shows errors and sends the form to Netlify Forms |
| `design-tokens.json` | Colors, fonts, spacing, and sizes, shared with the game in Book 3 |
| `content/site-text.md` | Every word on the site. Change text here first |
| `content/ATTRIBUTIONS.md` | Where every font, icon, and image came from, and its license |
| `content/CHECK-IN-BOOK-3.md` | Answers to confirm once the game exists |
| `assets/` | Fonts, icons, images, and mockups |
| `tests/unit/` | Unit tests, run with the Node.js test runner |
| `tests/e2e/` | Browser tests and the accessibility scan, run with Playwright |
| `vite.config.js` | Vite settings: the list of pages, and the site's public address |
| `PRODUCT-BRIEF.md` | What the website should do |
| `TESTING.md` | Each requirement and the checks that prove it |
| `STORE-INFO.md` | The URLs the app stores will ask for |
| `AGENTS.md` | Working agreements that Codex reads before every task |

## Publishing

Run `npm run build`, then drag the `dist` folder onto Netlify's manual
deploy page. Change `SITE_URL` in `vite.config.js` to your site's address,
and build again, so shared links show the right preview.

The contact form only sends messages from the published site, after you
turn on form detection in Netlify. In the local preview, pressing Send with
valid details shows the "wasn't sent" message.
