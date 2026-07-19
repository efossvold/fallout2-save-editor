import babel from '@rolldown/plugin-babel'
// import { DevTools } from '@vitejs/devtools'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
import unoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

// import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer'
import unoCSSConfig from './uno.config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // DevTools(),
    // tailwindcss(),
    unoCSS(unoCSSConfig),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    // unstableRolldownAdapter(
    //   analyzer({
    //     enabled: process.env.NODE_ENV === 'development',
    //     analyzerPort: 8889,
    //   }),
    // ),
  ],
  build: {
    target: 'baseline-widely-available',
  },
  // devtools: { enabled: true },
  resolve: {
    tsconfigPaths: true,
  },
})
