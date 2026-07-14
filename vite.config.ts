import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves a project site from /<repo>/, so assets need that base path.
// Set BASE_PATH in CI (or edit the fallback). "/" is correct for a user site
// (<user>.github.io) or a custom domain.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
})
