import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { defineConfig as defineTestConfig, mergeConfig } from 'vitest/config'

// https://vitejs.dev/config/

const viteConfig = defineConfig({
  plugins: [
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

const vitestConfig = defineTestConfig({
  test: { environment: 'node', include: ['**/*.test.ts'] },
})

export default mergeConfig(viteConfig, vitestConfig)
