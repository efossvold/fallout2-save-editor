import type { RefObject } from 'react'

import { clsx } from 'clsx'
import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState } from 'react'

import type { Fn } from '~/types'

import { getWindow } from './utils'

type GetColor = (
  isHovered: boolean,
  notHoveredColor: string | (() => string),
  hoveredColor?: string,
) => string

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>()

  useMountEffect(() => {
    setLocation(getWindow()?.location)
  })

  return location
}

/**
 * @returns undefined when location is not yet available,
 * true when app is viewed in browser
 * false when is local app
 */
export const useIsWeb = (): boolean | undefined => {
  const location = useLocation()

  if (location === undefined) {
    return undefined
  }

  return !location.href.startsWith('wails://')
}

/**
 * Custom hook to run a mount effect only once.
 * @param {*} fn the callback function
 * @returns the hook
 */
export const useMountEffect = (fn: () => any) => {
  const mounted = useRef(false)

  const onMount = useEffectEvent(() => {
    if (!mounted.current) {
      mounted.current = true
      fn()
    }
  })

  useEffect(() => {
    onMount()
  }, [])
}

/**
 * Return an array with a element ref and the height of the element
 * The ref must be assigned to the element to be measured
 * @example
 * const [ref, height] = useHeightObserver()
 * return (<div ref={ref}>Measure height of this element</div>
 */
export const useHeightObserver = ({ onChange }: { onChange?: (height: number) => void }) => {
  const [, setHeight] = useState(0)
  const elementRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!elementRef.current) {
      return undefined
    }

    const observer = new ResizeObserver(() => {
      const newHeight = elementRef.current?.getBoundingClientRect().height ?? 0
      setHeight(newHeight)

      if (onChange) {
        onChange(newHeight)
      }
    })

    observer.observe(elementRef.current)

    return () => {
      observer.disconnect()
    }
  }, [elementRef, onChange])

  return elementRef
}

const getColor: GetColor = (isHovered, notHoveredColor, hoveredColor) => {
  if (isHovered) {
    const defaultColor = clsx('text-gray-50')
    return hoveredColor ?? defaultColor
  }
  if (typeof notHoveredColor === 'function') {
    return notHoveredColor()
  }
  return notHoveredColor
}

export const useHoverColor = () => getColor

export const useHover = <ElementType extends HTMLElement>(): [
  React.RefObject<ElementType | null>,
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

    return undefined
  }, [])

  return [ref, value]
}

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: Fn
  onClose: Fn
  onToggle: Fn
}

export const useDisclosure = (): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, onOpen, onClose, onToggle }
}

export const useDebouncedValue = <T>(value: T, delay = 500): [RefObject<T>, T] => {
  const prevValue = useRef(value)
  const isPrevValueSet = useRef(false)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      isPrevValueSet.current = false
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  useEffect(() => {
    if (!isPrevValueSet.current) {
      prevValue.current = value
      isPrevValueSet.current = true
    }
  }, [value])

  return [prevValue, debouncedValue]
}
