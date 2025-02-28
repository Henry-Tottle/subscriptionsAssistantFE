import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',  // Specify the output directory, change to 'dist' if preferred
    cssCodeSplit: true,  // Ensures CSS files are split correctly
    rollupOptions: {
      input: '/src/main.jsx',  // Adjust this based on your entry point, default could be index.jsx or index.tsx
    }
  },
})
