import bamboo from '@bamboocss/vite'
import { octane } from '@octanejs/vite-plugin'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: Number(process.env['WAILS_VITE_PORT']) || 9245,
    strictPort: true,
  },
  plugins: [bamboo(), octane()],
  resolve: {
    tsconfigPaths: true,
  },
})
