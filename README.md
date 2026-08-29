# pollenkompass-site

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

## Privacy policy page

`public/privacy/index.html` is the canonical privacy policy for the **Pollenkompass app on
both stores** — enter its published URL in App Store Connect (Privacy Policy URL) and in the
Google Play Console (Store presence → Privacy policy). It is a static, self-contained page
(German authoritative + English translation) served at `<site>/privacy/`; the footer links to
it. Keep it in sync with what the apps actually do — it currently covers: ePIN + DWD fetches,
local settings and symptom diary, optional iCloud sync (iOS), manual backup export plus
system Android Backup of diary/alerts/settings to the user's Google account (Android — see
`backup_rules.xml` and `data_extraction_rules.xml` in the Android repo for the allow-list),
optional location, local notifications, no analytics/ads/accounts.

The site and both apps are free, with no donations, no in-app purchases and no payment links
anywhere.

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
