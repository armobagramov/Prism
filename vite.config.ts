import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // CRITICAL: Base path set to './' ensures assets are loaded relatively.
  // This allows the app to work at https://user.github.io/repo/ without 404s.
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  },
  define: {
    // Polyfill process.env to prevent "ReferenceError: process is not defined" in the browser.
    // This allows the code to access process.env.API_KEY safely (it will be undefined if not set during build).
    'process.env': {},
    // Polyfill global for libraries that might assume a Node.js environment
    global: 'window',
  }
});