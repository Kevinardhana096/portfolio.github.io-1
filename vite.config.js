import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path: '/' for Vercel, '/portfolio.github.io-1/' for GitHub Pages
  base: process.env.VERCEL ? '/' : '/portfolio.github.io-1/'
})
