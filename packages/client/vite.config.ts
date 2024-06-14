import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

import { copyFileSync } from 'fs'
import path from 'path'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: Number(process.env.CLIENT_PORT) || 3000
  },
  define: {
    __SERVER_PORT__: process.env.SERVER_PORT
  },
  plugins: [
    react(),
    {
      name: 'copy-service-worker',
      writeBundle() {
        copyFileSync('src/app/service-worker/serviceWorker.ts', 'dist/serviceWorker.js')
      }
    }
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
})
