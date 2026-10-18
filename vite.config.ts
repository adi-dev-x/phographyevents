import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Keep PostCSS isolated from any config files in parent folders.
  css: { postcss: { plugins: [] } },
});
