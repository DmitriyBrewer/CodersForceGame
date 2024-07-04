import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as path from 'path'

function resolveSrc(_path) {
  return path.resolve(__dirname, _path)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolveSrc('src')
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/entry-server.tsx'),
      name: 'Client',
      formats: ['cjs']
    },
    rollupOptions: {
      output: {
        dir: 'ssr-dist'
      }
    }
  }
})
