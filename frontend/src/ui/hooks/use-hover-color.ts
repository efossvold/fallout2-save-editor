import type { ColorsValue } from '../../styled-system/types/system'

import { getColorToken } from '../utils'

const getColor = (
  isHovered: boolean,
  notHoveredColor: ColorsValue | (() => ColorsValue),
  hoveredColor?: ColorsValue,
): ColorsValue => {
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
