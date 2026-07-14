# hakan-dev-site

Static personal site — React + TypeScript + Vite. No backend, no tracking.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
npm run preview  # serve the built output
```

## Edit the content

All copy, skills, and links live in **`src/content.ts`** — you shouldn't need to touch the
components to keep the site current.

- `SKILL_GROUPS` — each skill has a `level` from **1 to 6** on the same scale the hero strip
  shows (1 = working knowledge, 6 = what people call you for). Deliberately not percentages.
- `WORK` — the project case study and its facts table.
- `SUPPORT` — the donation cards.

## Before you publish: replace the placeholder links

`src/content.ts` → `LINKS` currently points at placeholders. Replace all three:

| Key        | Where to get it                                                       |
| ---------- | --------------------------------------------------------------------- |
| `github`   | your profile URL                                                      |
| `sponsors` | enable at <https://github.com/sponsors> — 0% platform fee, bank payout |
| `kofi`     | create at <https://ko-fi.com> — 0% on donations, PayPal/Stripe payout  |

Both donation routes are free to run: GitHub Sponsors and Ko-fi take no cut of the donation
itself (Ko-fi's payment processor still charges its normal transaction fee).

**Do not link these from inside the iOS app or its App Store description.** Apple's Guideline
3.1.1 requires in-app tips to go through In-App Purchase; an external donation link there is a
rejection. On this website they are fine.

## Deploy to GitHub Pages

`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.

1. Push this repo to GitHub.
2. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The workflow builds and deploys.

**Base path:** `vite.config.ts` reads `BASE_PATH`, falling back to `/`.

- User site (`<user>.github.io`) or a custom domain → leave it as is.
- Project site (`<user>.github.io/<repo>/`) → set `BASE_PATH: /<repo>/` as an env var on the
  build step in the workflow, otherwise the CSS and JS 404.

## Design notes

The six-colour ramp is the official ePIN pollen-flight scale the Pollen app renders. It appears
in exactly two places — the hero measurement strip and the skill dots — and nowhere else. That
restraint is the point: the colour carries meaning, so it isn't spent on decoration.

Accessibility floor: skip link, visible keyboard focus, `prefers-reduced-motion` respected
(the strip stops moving, reveals are disabled), and skill levels exposed to screen readers as
"level N of 6" rather than as colour alone.
