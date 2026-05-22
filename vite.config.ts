import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 2000,
    minify: 'oxc',
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('shaders')) return 'three-shaders';
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('react-router-dom') || id.includes('@remix-run')) return 'router';
          if (id.includes('react-dom')) return 'react-dom';
          if (id.includes('react')) return 'react';
        }
      }
    }
  }
})
