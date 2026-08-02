import type { ColorToken } from '~/styled-system/tokens'
import type { IKbdEvent } from '~/types'

import { colors } from '~/style/preset/colors'

export const basename = (path: string): string => path.split('/').toReversed().at(0) ?? ''

export const dirname = (path: string): string => {
  const parts = path.split('/')
  parts.pop()
  return parts.join('/')
}

const isClient = () => typeof globalThis.window !== 'undefined'

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

export const getFileService = async () => {
  const res = await import('../../bindings/app')
  return res.FileService
}

export const getWailsRuntimeApp = async () => {
  const res = await import('@wailsio/runtime')
  return res.Application
}

type KbdKeys =
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'ArrowUp'
  | 'Space'
  | 'Enter'
  | 'Tab'
  | 'Escape'

export const matchKey = (ev: IKbdEvent, keys: KbdKeys[]) => keys.includes(ev.key as KbdKeys)

export const onMatchKey = (ev: IKbdEvent, keys: KbdKeys[], onMatch: (ev: IKbdEvent) => any) => {
  if (keys.includes(ev.code as KbdKeys)) {
    onMatch(ev)
  }
}
