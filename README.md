# gigsiswa-web

The public "coming soon" landing page for GigSiswa. It's a plain static site: HTML, CSS and one small script, with no build step.

Visitors pick Student or Business and leave their email. The form posts to the GigSiswa API (`POST /api/v1/waitlist` in `stugig-api`), and admins see the sign-ups under **Waitlist** in the admin dashboard.

## Files

| File | What it is |
|---|---|
| `index.html` | The page. The `gigsiswa-api` meta tag sets which API the form posts to. |
| `styles.css` | Styles. Colours and fonts follow the app's `design/tokens.json` (navy, teal, coral; Poppins and Inter). |
| `main.js` | The sign-up form: checks the email, posts it, shows the result. |
| `main.test.mjs` | Tests for the form logic (`node --test`). |
| `assets/` | Mascot, favicon, Apple touch icon and the 1200×630 share image (`og-image.png`). |

## Run it locally

```bash
python3 -m http.server 8090
```

Open http://localhost:8090. On `localhost` the form posts to a local API at http://localhost:3000. Start one with `pnpm db:up && pnpm dev` in `stugig-api`, with `http://localhost:8090` in its `CORS_ORIGINS`.

## Test

```bash
node --test
```

## Going live

1. Host the folder as static files anywhere, with HTTPS.
2. Set the `gigsiswa-api` meta tag in `index.html` to the API that should receive sign-ups.
3. Add the site's origin (for example `https://gigsiswa.my`) to `CORS_ORIGINS` on that API. Without it, the browser blocks the form and visitors see "We couldn't save your email just now".
4. Once the final domain is known, change `og:image` in `index.html` to a full URL (`https://…/assets/og-image.png`) so WhatsApp and social previews show the image.
