import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { StorybookConfig } from '@storybook/react-vite';

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {},
  },
});
