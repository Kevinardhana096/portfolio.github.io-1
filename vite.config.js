import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path: '/' for Vercel, '/portfolio.github.io-1/' for GitHub Pages
  base: process.env.VERCEL ? '/' : '/portfolio.github.io-1/',

  // Optimasi build
  build: {
    // Minify untuk produksi
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log di production
        drop_debugger: true
      }
    },
    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'icons-vendor': ['lucide-react']
        }
      }
    },
    // Chunk size warnings
    chunkSizeWarningLimit: 1000
  },

  // Optimasi server dev
  server: {
    port: 3000,
    open: true
  },

  // Optimasi preview
  preview: {
    port: 4173
  }
})
