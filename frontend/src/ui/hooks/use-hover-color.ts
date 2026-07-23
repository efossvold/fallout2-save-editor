import type { ColorToken } from '~/styled-system/tokens'

import { getColorToken } from '../utils'

const getColor = (
  isHovered: boolean,
  notHoveredColor: ColorToken | (() => ColorToken),
  hoveredColor?: ColorToken,
): ColorToken => {
  if (isHovered) {
    const defaultColor = getColorToken('gray.50')
    return hoveredColor ?? defaultColor
  }
  if (typeof notHoveredColor === 'function') {
    return notHoveredColor()
  }
  return notHoveredColor
}

export const useHoverColor = () => getColor
