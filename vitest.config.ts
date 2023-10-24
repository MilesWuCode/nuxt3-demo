import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [Vue(), AutoImport({ imports: ['vue'] })],
  test: {
    globals: true,
    coverage: {
      provider: 'v8', // v8,istanbul
      reporter: ['text', 'html', 'clover', 'json'],
    },
    environment: 'jsdom', // jsdom,happy-dom
  },
  resolve: {
    alias: {
      '@': '.',
    },
  },
})
