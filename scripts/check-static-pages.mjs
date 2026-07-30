/**
 * Asserts the hand-written pages under `public/` are reachable at their trailing-slash URLs on
 * BOTH servers — `vite dev` and `vite preview`.
 *
 * Why this exists: `/privacy/` is the URL registered as the Privacy Policy URL in App Store
 * Connect and the Play Console, so it has to stay exactly that. It worked on a static host but
 * not in `vite dev`, where directory paths fell through to the SPA history fallback and quietly
 * rendered the start page instead — a link that looks fine and goes nowhere. The dev-server
 * middleware in vite.config.ts closes that gap; this check keeps the two servers honest about it.
 *
 * Run: node scripts/check-static-pages.mjs   (npm run check:pages)
 */
import { spawn } from 'node:child_process'

const PAGES = [
  { path: '/privacy/', expect: 'Datenschutzerkl' },
  { path: '/', expect: 'Hakan Yedibela' },
]

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 250))
  }
  throw new Error(`server at ${url} never became ready`)
}

async function checkServer(label, args, port) {
  const server = spawn('npx', ['vite', ...args, '--port', String(port)], {
    stdio: 'ignore',
    detached: true,
  })
  const base = `http://localhost:${port}`
  const failures = []
  try {
    await waitForServer(base)
    for (const { path, expect } of PAGES) {
      const body = await (await fetch(base + path)).text()
      const ok = body.includes(expect)
      console.log(`${ok ? 'ok  ' : 'FAIL'}  ${label} ${path} — expected ${JSON.stringify(expect)}`)
      if (!ok) failures.push(`${label} ${path}`)
    }
  } finally {
    try {
      process.kill(-server.pid)
    } catch {
      // already gone
    }
  }
  return failures
}

const failures = [
  ...(await checkServer('dev    ', [], 5391)),
  ...(await checkServer('preview', ['preview'], 5392)),
]

if (failures.length) {
  console.error(`\n${failures.length} page(s) served the wrong document: ${failures.join(', ')}`)
  process.exit(1)
}
console.log('\nall static pages resolve on both servers')
