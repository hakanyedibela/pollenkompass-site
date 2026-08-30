import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Serves `public/<dir>/index.html` for a request to `/<dir>/` in `vite dev`.
 *
 * Static hosts (GitHub Pages, `vite preview`) resolve a trailing-slash URL to that
 * directory's index.html, so `/privacy/` works in production. The dev server does not: it
 * hands directory paths to the SPA history fallback, which answers with the app's own
 * index.html — so clicking "Datenschutz" in dev silently landed back on the start page while
 * the deployed link was fine. That divergence is the bug; this closes it rather than changing
 * the published URL, which is the one registered as the Privacy Policy URL in both stores.
 */
function serveStaticDirIndexes(): Plugin {
  return {
    name: 'serve-static-dir-indexes',
    apply: 'serve',
    configureServer(server) {
      const publicDir = server.config.publicDir
      // Registered directly in the hook body on purpose: that installs the middleware BEFORE
      // Vite's internal stack. Returning a function from configureServer would install it
      // after, where the history fallback has already answered and the rewrite never runs.
      server.middlewares.use((req, _res, next) => {
        const path = req.url?.split('?')[0]
        if (path?.endsWith('/') && publicDir) {
          const candidate = join(publicDir, path, 'index.html')
          if (existsSync(candidate)) req.url = `${path}index.html`
        }
        next()
      })
    },
  }
}

// The site is served from the root of its own subdomain (pollenkompass.hkn7b.dev), so the
// base path is "/". It was configurable via BASE_PATH while the target was a GitHub Pages
// project site at /<repo>/ — that put the repo name inside the store-registered privacy URL,
// which is exactly what the subdomain removes.
export default defineConfig({
  base: "/",
  plugins: [react(), serveStaticDirIndexes()],
})
