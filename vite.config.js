import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'build/',
  build: {
    outDir: 'build',  // Specify the output directory, change to 'dist' if preferred
    cssCodeSplit: true,  // Ensures CSS files are split correctly
    rollupOptions: {
      input: 'index.html',  // Make sure Vite uses the root index.html file
    },
  },
})
