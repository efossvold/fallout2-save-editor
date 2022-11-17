import React from 'react'
import { OverlayProvider } from '@react-native-aria/overlays'
import { ThemeProvider } from 'react-native-magnus'

import { App } from './src/ui'
import { theme } from './src/ui/theme'

export default () => (
  <ThemeProvider theme={theme}>
    <OverlayProvider>
      <App />
    </OverlayProvider>
  </ThemeProvider>
)
