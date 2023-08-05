import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3020,
    proxy: {
      '/hin': { 
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
