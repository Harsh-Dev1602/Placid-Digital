import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 3002,
    proxy: {
      "/sfs-app": {
        target: process.env.VITE_BACKEND_URL || "https://placid-digital.onrender.com",
        changeOrigin: true,
      },
    },
  }
})
