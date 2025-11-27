import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path set to './' ensures assets are loaded relatively.
  // This is CRITICAL for GitHub Pages where the app might live at https://user.github.io/repo-name/
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
  },
  define: {
    // Polyfill process.env to prevent "process is not defined" crashes in the browser
    'process.env': {},
    // Polyfill global for some older libraries that might assume Node.js environment
    global: 'window',
  }
});