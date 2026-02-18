import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
// import { analyzer,unstableRolldownAdapter } from 'vite-bundle-analyzer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // unstableRolldownAdapter(analyzer({ analyzerPort: 9002 })),
    tailwindcss(),
    react({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
  ],
  build: {
    target: 'baseline-widely-available',
  },
  resolve: {
    tsconfigPaths: true,
  },
})
