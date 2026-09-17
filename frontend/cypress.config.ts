import { defineConfig } from 'cypress'

import viteConfig from './vite.config'

export default defineConfig({
  video: false,
  retries: {
    openMode: 0,
  },
  component: {
    specPattern: 'src/**/*.cy.tsx',
    devServer: {
      framework: 'cypress-ct-octane-js' as any,
      bundler: 'vite',
      viteConfig,
    },
  },
})
