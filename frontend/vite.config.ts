import { octane } from '@octanejs/vite-plugin'
import panda from '@pandacss/vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: Number(process.env['WAILS_VITE_PORT']) || 9245,
    strictPort: true,
  },
  plugins: [
    // DevTools(),
    panda(),
    octane(),
    {
      name: 'async-css-links',
      transformIndexHtml(html) {
        // Rewrites the link tag to async
        // https://scottjehl.com/posts/async-css-already/
        return html.replace(
          // oxlint-disable-next-line prefer-named-capture-group
          /<link rel="stylesheet" crossorigin href="(.*?)">/g,
          '<link rel="stylesheet" crossorigin href="$1" media="print" onload="this.media=\'all\'">',
        )
      },
    },
  ],
  build: {
    rolldownOptions: {
      external: ['@wailsio/runtime'],
    },
  },
  // devtools: { enabled: true },
  resolve: {
    tsconfigPaths: true,
  },
})
