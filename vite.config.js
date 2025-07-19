import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: process.cwd(),
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});