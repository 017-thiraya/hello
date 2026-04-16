import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // --- เพิ่มส่วนนี้เข้าไป ---
  server: {
    proxy: {
      '/api': {
        target: 'https://hw26.sit.kmutt.ac.th',
        changeOrigin: true, 
      }
    }
  }
  // ----------------------
})