import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/lukes-focus-app/', // must exactly match the GitHub repo name
  plugins: [react()],
  server: {
    host: true, // expose on the LAN so it's reachable from a phone on the same Wi-Fi
  },
})
