import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@fds/ui-web': resolve(__dirname, '../../packages/ui-web/src/index.ts'),
    },
  },
});
