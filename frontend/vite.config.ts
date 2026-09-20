import bamboo from '@bamboocss/vite'
import { preact } from '@preact/preset-vite'
import { defineConfig } from 'vite'
import htmlMinifier from 'vite-plugin-html-minifier'

import { fontPreloader } from './vite.plugins.ts'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: Number(process.env['WAILS_VITE_PORT']) || 9245,
    strictPort: true,
  },
  plugins: [
    bamboo(),
    preact({
      prerender: {
        enabled: false,
        renderTarget: '#root',
      },
    }),
    fontPreloader(),
    htmlMinifier(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
})
