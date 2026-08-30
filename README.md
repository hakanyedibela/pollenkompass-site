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

## Deploy

GitHub Pages, on the custom domain **`pollenkompass.hkn7b.dev`**.
`.github/workflows/deploy.yml` builds and publishes `dist/` on every push to `main`.

One-time setup:

1. Repo → **Settings → Pages → Source: GitHub Actions**. Without this the build succeeds and
   `actions/configure-pages` fails.
2. Same page → **Custom domain** → `pollenkompass.hkn7b.dev`. GitHub then issues a Let's Encrypt
   certificate for that hostname; tick **Enforce HTTPS** once it unlocks.
3. DNS: `CNAME pollenkompass → hakanyedibela.github.io.` and **remove any A record** for that
   name — a leftover A record keeps sending visitors elsewhere and breaks domain verification.

`public/CNAME` carries the domain into every build, so the setting survives a redeploy.

**Base path** is `/` in `vite.config.ts` — correct for a custom domain at its own root. Do not
set a base prefix: it would reappear inside the store-registered privacy URL.

Why not the Strato box, which already serves the imprint: its certificates are Strato-managed
Sectigo DV certs covering `<domain>` and `www.<domain>` only, so the subdomain had no cert and
`https://` failed at the handshake. Pages issues and renews one for the exact hostname for
free. The earlier rsync-to-Apache setup (`scripts/deploy.sh`, `public/.htaccess`) is in git
history if that box is ever needed again.

Verify a deploy:

```bash
curl -sI https://pollenkompass.hkn7b.dev/ | head -1                 # HTTP/2 200
curl -s -o /dev/null -w '%{http_code}\n' https://pollenkompass.hkn7b.dev/privacy/
```

## Design notes

The six-colour ramp is the official ePIN pollen-flight scale the Pollen app renders. It appears
in exactly two places — the hero measurement strip and the skill dots — and nowhere else. That
restraint is the point: the colour carries meaning, so it isn't spent on decoration.

Accessibility floor: skip link, visible keyboard focus, `prefers-reduced-motion` respected
(the strip stops moving, reveals are disabled), and skill levels exposed to screen readers as
"level N of 6" rather than as colour alone.
