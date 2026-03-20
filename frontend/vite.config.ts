import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
// import { DevTools } from '@vitejs/devtools'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // DevTools(),
    tailwindcss(),
    react(),
    // @ts-ignore
    babel({ presets: [reactCompilerPreset()] }),
  ],
  build: {
    target: 'baseline-widely-available',
  },
  // devtools: { enabled: true },
  resolve: {
    tsconfigPaths: true,
  },
})
