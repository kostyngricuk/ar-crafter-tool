import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'src', replacement: path.resolve(__dirname, '/src') },
      { find: 'assets', replacement: path.resolve(__dirname, '/src/assets') },
      { find: 'components', replacement: path.resolve(__dirname, '/src/components') },
      { find: 'constants', replacement: path.resolve(__dirname, '/src/constants') },
      { find: 'features', replacement: path.resolve(__dirname, '/src/features') },
      { find: 'pages', replacement: path.resolve(__dirname, '/src/pages') },
      { find: 'lang', replacement: path.resolve(__dirname, '/src/lang') },
      { find: 'utils', replacement: path.resolve(__dirname, '/src/utils') },
    ],
  },
});
