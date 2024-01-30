import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['lodash']
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/hin': { 
        target: 'http://localhost:5000',
        changeOrigin: false
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
