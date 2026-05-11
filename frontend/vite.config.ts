import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
// import { DevTools } from '@vitejs/devtools'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import { analyzer, unstableRolldownAdapter } from 'vite-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // DevTools(),
    tailwindcss(),
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
