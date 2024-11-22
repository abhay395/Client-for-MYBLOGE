import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/<repo-name>/' // Replace <repo-name> with your GitHub repo name
});