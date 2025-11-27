import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path set to './' ensures assets are loaded relatively, 
  // preventing 404 errors on GitHub Pages subdirectories.
  base: './',
  define: {
    // Defines 'process.env' as an empty object in the browser
    // to prevent "process is not defined" crashes when code accesses process.env.API_KEY
    'process.env': {}
  }
});