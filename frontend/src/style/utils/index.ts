import type { PandaPlugin } from '@pandacss/types'

import { removeUnusedCssVars } from './remove-unused-css-vars'
import { removeUnusedKeyframes } from './remove-unused-keyframes'

export const pluginRemoveUnusedCSS = (): PandaPlugin => ({
  name: 'remove-unused-css',
  hooks: {
    'cssgen:done': ({ artifact, content }) => {
      if (artifact === 'styles.css') {
        const trimmed = removeUnusedCssVars(removeUnusedKeyframes(content))
        console.log('remove-unused-css: trimmed', content.length - trimmed.length, 'bytes')
        return trimmed
      }
      return ''
    },
  },
})
