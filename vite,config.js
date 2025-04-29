// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/', // ¡Asegúrate que esto está así!
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './src/main.jsx' // Ruta correcta a tu entry point
    }
  }
})