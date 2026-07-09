import { produce } from 'immer'
import { defineConfig } from 'oxlint'

import baseConfig from './oxlint.config.ts'

export default defineConfig(
  produce(baseConfig, draft => {
    draft.settings.tailwindcss.entryPoint = 'src/style/base.css'
  }),
)
