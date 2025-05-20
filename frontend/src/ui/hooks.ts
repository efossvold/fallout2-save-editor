import { useEffect, useRef, useState } from 'react'
import type { UseToastOptions } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import type { TColor } from './theme'

type GetColor = (
  isHovered: boolean,
  notHoveredColor: TColor | (() => TColor),
  hoveredColor?: TColor,
) => TColor

const getColor: GetColor = (isHovered, notHoveredColor, hoveredColor) => {
  if (isHovered) {
    const defaultColor: TColor = 'gray.50'
    return hoveredColor ?? defaultColor
  }
  if (typeof notHoveredColor === 'function') {
    return notHoveredColor()
  }
  return notHoveredColor
}

export const useHoverColor = () => getColor

export interface Disclosure {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export const useDisclose = (initState?: boolean): Disclosure => {
  const [isOpen, setIsOpen] = useState(initState ?? false)

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

export const useHover = <ElementType extends HTMLElement>(): [
  React.RefObject<ElementType>,
  boolean,
] => {
  const [value, setValue] = useState(false)
  const ref = useRef<ElementType>(null)

  const handlePointerOver = (): void => setValue(true)
  const handlePointerOut = (): void => setValue(false)

  useEffect(() => {
    const node = ref.current
    if (node) {
      node.addEventListener('pointerenter', handlePointerOver)
      node.addEventListener('pointerleave', handlePointerOut)
      return () => {
        node.removeEventListener('pointerenter', handlePointerOver)
        node.removeEventListener('pointerleave', handlePointerOut)
      }
    }
  }, [])

  return [ref, value] as [typeof ref, typeof value]
}

interface TUseToasterReturnType {
  info: (message: string, opts?: UseToastOptions) => void
  success: (message: string, opts?: UseToastOptions) => void
  error: (message: string, opts?: UseToastOptions) => void
}

export const useToaster = (): TUseToasterReturnType => {
  const toast = useToast()
  const defaultOpts: UseToastOptions = {
    duration: 4000,
    isClosable: true,
    position: 'bottom',
  }

  return {
    info: (message: string, opts?: UseToastOptions) => {
      toast({
        title: opts?.title ?? 'Info',
        description: message,
        status: 'info',
        ...defaultOpts,
        ...opts,
      })
    },
    success: (message: string, opts?: UseToastOptions) => {
      toast({
        title: opts?.title ?? 'Success',
        description: message,
        status: 'success',
        ...defaultOpts,
        ...opts,
      })
    },
    error: (message: string, opts?: UseToastOptions) => {
      toast({
        title: opts?.title ?? 'Error',
        description: message,
        status: 'error',
        ...defaultOpts,
        ...opts,
      })
    },
  }
}
