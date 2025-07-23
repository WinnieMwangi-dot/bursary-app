import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // 👇 This fixes the refresh issue on routes like /admin
    historyApiFallback: true,
  },
});
