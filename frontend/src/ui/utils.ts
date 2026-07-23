import type { ColorToken } from '~/styled-system/tokens'

import { colors } from '~/style/preset/colors'

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
export const getColorToken = (color: ColorToken, fallback: ColorToken = 'white') => {
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
