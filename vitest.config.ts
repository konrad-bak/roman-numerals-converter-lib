import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/utils/tests/setup.ts', // Optional setup file
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
