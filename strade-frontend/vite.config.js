import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['bot.aceptriana.my.id'], // ✅ tambahkan ini
    // optional: kalau kamu butuh akses lewat port atau IP tertentu
    // host: '0.0.0.0',
    // port: 5173,
  },
})
