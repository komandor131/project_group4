// vite.config.js
import { defineConfig } from 'vite';
// Імпорт glob прибираємо, бо він більше не потрібен
// import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
  
    base: '/project_group4/', 
    
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    // Коренева директорія проекту встановлена на 'src'
    root: 'src', 
    
    build: {
      sourcemap: true,
      rollupOptions: {
        // !!! ВИПРАВЛЕННЯ: Явно вказуємо єдиний вхідний HTML-файл 
        // (шлях відносно 'root: src')
        input: {
          main: './index.html', 
        },
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      injectHTML(),
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
    ],
  };
});
