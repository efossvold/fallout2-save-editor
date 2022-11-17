import { useState } from 'react'
import Toast, { ToastShowParams } from 'react-native-toast-message'
import type { Color } from './theme'

type GetColor = (
  isHovered: boolean,
  notHoveredColor: Color | (() => Color),
  hoveredColor?: Color,
) => Color

export const useHoverColor = (): GetColor => {
  const getColor: GetColor = (isHovered, notHoveredColor, hoveredColor) => {
    if (isHovered) {
      const defaultColor: Color = 'gray50'
      return hoveredColor || defaultColor
    }
    if (typeof notHoveredColor === 'string') {
      return notHoveredColor
    }
    return notHoveredColor()
  }
  return getColor
}

type ToastShow = (params: string | ToastShowParams) => void

export const useToast = (): { show: ToastShow } => {
  return {
    show: params => {
      let toast: ToastShowParams = {
        type: 'default',
        position: 'bottom',
        visibilityTime: 5000,
      }

      if (typeof params === 'string') {
        toast.text2 = params
      } else {
        toast = { ...toast, ...params }
      }

      Toast.show(toast)
    },
  }
}

export type Disclosure = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export const useDisclose = (initState?: boolean): Disclosure => {
  const [isOpen, setIsOpen] = useState(initState || false)

  const onOpen = (): void => {
    setIsOpen(true)
  }

  const onClose = (): void => {
    setIsOpen(false)
  }

  const onToggle = (): void => {
    setIsOpen(!isOpen)
  }

  return {
    isOpen,
    onOpen,
    onClose,
    onToggle,
  }
}
