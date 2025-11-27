import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Fix: Property 'cwd' does not exist on type 'Process'
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    base: './', // Ensures relative paths for assets on GitHub Pages
    define: {
      // Safely replace process.env with a specific object containing keys we expect
      'process.env': {
        API_KEY: env.API_KEY || '',
        NODE_ENV: mode
      }
    }
  };
});