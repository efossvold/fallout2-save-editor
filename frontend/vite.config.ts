import panda from '@pandacss/vite'
import babel from '@rolldown/plugin-babel'
// import { DevTools } from '@vitejs/devtools'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer'

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
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    // unstableRolldownAdapter(
    //   analyzer({
    //     enabled: process.env.NODE_ENV === 'development',
    //     analyzerPort: 8889,
    //   }),
    // ),
  ],
  // devtools: { enabled: true },
  resolve: {
    tsconfigPaths: true,
  },
})
