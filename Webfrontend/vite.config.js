import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify(
      process.env.VITE_API_URL || 'https://placid-digital.onrender.com'
    ),
  },
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    port: 3002,
    proxy: {
      "/sfs-app": {
        target: process.env.VITE_API_URL || "https://placid-digital.onrender.com",
        changeOrigin: true,
      },
    },
  }
})
