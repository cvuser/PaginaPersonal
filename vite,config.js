import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src') // Permite usar import '@components/...'
    }
  },
  server: {
    port: 3000,
    open: true // Abre el navegador automáticamente
  },
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096 // Límite para assets en base64 (4KB)
  }
})