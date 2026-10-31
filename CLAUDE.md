# gigsiswa-web: map for Claude

GigSiswa's public coming-soon landing page. Plain static HTML/CSS/JS, no framework and no build step; keep it that way. See [README.md](README.md) for running and going live.

- **Sign-ups** post to `POST /api/v1/waitlist` on `stugig-api` (`src/modules/waitlist`); admins read them in `stugig-admin` → Waitlist. The API answers 202 for every valid sign-up (duplicates included) and drops anything that fills the hidden `website` honeypot.
- **Hosting:** https://gigsiswa.com via GitHub Pages from `main` (the `CNAME` file holds the domain; DNS at Shinjiru). Keep `og:url`/`og:image` as full `https://gigsiswa.com/` URLs.
- **Which API:** the `gigsiswa-api` meta tag in `index.html`; on `localhost` the script uses `http://localhost:3000` instead. The site's origin must be in the API's `CORS_ORIGINS`.
- **Brand:** colours and fonts copy the app's tokens (`stugig-mobile/design/tokens.json`). The logo is drawn as text (`.mark`), so it follows dark mode. The mascot is `assets/mascot.png`, cut out from `stugig-mobile/assets/mascot.png`.
- **Copy** is Malay-English rojak aimed at Malaysian students; the sample shift card is labelled "Example shift" and must stay labelled.
- **Tests:** `node --test` (form logic in `main.js`; keep DOM code inside `wire()` so the module imports in Node).
