import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MiPagina/', // ¡Así debe quedar para usuario.github.io!
  build: {
    outDir: 'dist',
    assetsDir: 'assets', // Directorio donde se colocan los assets
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  }
})