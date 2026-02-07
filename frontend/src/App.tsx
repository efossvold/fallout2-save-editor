import './ui/theme/fonts.css'
import './ui/theme/scrollbar.css'

import { ChakraProvider } from '@chakra-ui/react'

import { Panels } from './ui/panels'
import theme from './ui/theme'

const App = () => (
  // window.runtime.WindowSetSize(WIN_START_WIDTH, MIN_WIN_HEIGHT)
  <ChakraProvider theme={theme} resetCSS>
    <Panels />
  </ChakraProvider>
)

export default App
