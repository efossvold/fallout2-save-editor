import { colors } from '~/style/preset/colors'

import type { ColorsValue } from '../styled-system/types/system'

export const basename = (path: string): string => path.split('/').toReversed().at(0) ?? ''

export const dirname = (path: string): string => {
  const parts = path.split('/')
  parts.pop()
  return parts.join('/')
}

export const isClient = () => typeof globalThis.window !== 'undefined'

export const getWindow = () => (isClient() ? globalThis.window : undefined)

export const getDocument = () => (isClient() ? globalThis.document : undefined)

// Could have used token() from 'styled-system/tokens'
// here, but it increase bundle size with 20k. This simple
// much more lightweight
export const getColorToken = (color: ColorsValue, fallback: ColorsValue = 'white') => {
  const [hue = '', lightness] = color.split('.')
  if (!hue || !lightness) {
    console.error(`Invalid color '${color}'`)
    return 'white'
  }
  // @ts-expect-error
  const colorStr = colors[hue]?.[lightness]?.value ?? fallback
  // console.log(color, colorStr)
  return colorStr
}

// export const iflex = (flexStyles: FlexStyles, ...cssStyles: (string | Styles)[]) => {
//   const classes: string[] = [
//     _flex(flexStyles),
//     ...cssStyles.map(style => {
//       if (typeof style === 'string') {
//         return style
//       }
//       return css(style)
//     }),
//   ]
//   return cx(...classes)
// }

// export const icss = (...cssStyles: (string | Styles)[]) => {
//   const classes: string[] = cssStyles.map(style => {
//     if (typeof style === 'string') {
//       return style
//     }
//     return css(style)
//   })
//   return cx(...classes)
// }
