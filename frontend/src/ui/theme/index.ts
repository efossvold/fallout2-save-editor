import type { ColorProps, Theme as DefaultTheme } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import colors from './colors'
import { breakpoints } from './breakpoints'

export { colors }

export type TColor = ColorProps['color']

export interface TTheme extends DefaultTheme {
  outline: string
  blueRGB: number[]
}

const theme = extendTheme({
  breakpoints,
  colors,
  styles: {
    global: (props: any) => ({
      body: {
        color: mode('gray.300', 'whiteAlpha.900')(props),
        bg: mode('gray.300', 'gray.800')(props),
        paddingLeft: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        fontSize: ['20px', '14px'],
      },
    }),
  },
  fonts: {
    heading: `fallouty, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `fallouty, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    mono: `SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace`,
  },
}) as TTheme & { colors: typeof colors }

export default theme
