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

The site is uploaded to a Strato Apache docroot behind its own subdomain,
**`pollenkompass.hkn7b.dev`**. There is no CI deploy: pushing to `main` changes nothing on the
live site until you run the upload.

```bash
DEPLOY_TARGET='user@ssh.strato.de:/pollenkompass/' npm run deploy         # dry run, prints the plan
DEPLOY_TARGET='user@ssh.strato.de:/pollenkompass/' npm run deploy -- --go # transfer
```

`scripts/deploy.sh` builds first, refuses to run if `dist/index.html` or `dist/privacy/index.html`
came out empty, and syncs in two passes: hashed assets first without `--delete`, then the HTML
with `--delete`. That order means the live page never references a bundle that hasn't finished
uploading, and stale bundles from earlier builds get pruned instead of piling up.

One-time server setup:

1. Strato panel → create the subdomain, point it at its own docroot folder.
2. Enable the free Let's Encrypt certificate **for that subdomain** — both stores expect an
   `https://` privacy URL.
3. Run the dry run, check the file list, then `--go`.

`public/.htaccess` ships with the build (Vite copies `public/` verbatim), and sets the caching
split the hashed filenames allow: a year for `assets/*`, `no-cache` for the two HTML files.

**Base path** is `/` in `vite.config.ts` — correct for a site at the root of its own subdomain.
It only needs changing if the site ever moves into a subdirectory.

Previously this deployed to GitHub Pages via `.github/workflows/deploy.yml`. That put the repo
name in the URL (`hakanyedibela.github.io/pollenkompass-site/privacy/`), which would break the
store-registered link on a repo rename — the subdomain removes that. The workflow was deleted
rather than left to fail on every push.

## Design notes

The six-colour ramp is the official ePIN pollen-flight scale the Pollen app renders. It appears
in exactly two places — the hero measurement strip and the skill dots — and nowhere else. That
restraint is the point: the colour carries meaning, so it isn't spent on decoration.

Accessibility floor: skip link, visible keyboard focus, `prefers-reduced-motion` respected
(the strip stops moving, reveals are disabled), and skill levels exposed to screen readers as
"level N of 6" rather than as colour alone.
