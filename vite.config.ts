import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    chunkSizeWarningLimit: 1500,
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
