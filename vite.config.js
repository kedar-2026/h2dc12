import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/h2dc12/',
  build: {
    outDir: 'dist',
  },
})

