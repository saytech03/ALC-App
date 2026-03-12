import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['2847-223-185-34-205.ngrok-free.app'],
    // --- NEW: This connects React to Python ---
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000', // Points to where Python runs
        changeOrigin: true,
        secure: false,
      },
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.[jt]sx?$/,
    exclude: [],
  }
});