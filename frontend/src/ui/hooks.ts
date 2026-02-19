import { clsx } from 'clsx'
import { useEffect, useRef, useState } from 'react'

import { entries } from '../api/utils'
import type { UseDisclosureReturn } from '../types/types'

type GetColor = (
  isHovered: boolean,
  notHoveredColor: string | (() => string),
  hoveredColor?: string,
) => string

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>()

  useEffect(() => {
    setLocation(globalThis.window.location)
  }, [setLocation])

  return location
}

/** Returns
 * undefined when location is not yet available,
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
  React.RefObject<ElementType | null>,
  boolean,
] => {
  const [value, setValue] = useState(false)
  const ref = useRef<ElementType>(null)

  const handlePointerOver = (): void => setValue(true)
  const handlePointerOut = (): void => setValue(false)

  // oxlint-disable-next-line typescript/consistent-return
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

  return [ref, value]
}

export const useDisclosure = (): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => setIsOpen(true)
  const onClose = () => setIsOpen(false)
  const onToggle = () => setIsOpen(!isOpen)

  return { isOpen, onOpen, onClose, onToggle }
}

type UseChangedPropsChanges = { name: string; prev: string | number; current: string | number }[]
// oxlint-disable-next-line func-style
export function useChangedProps<T extends Dict<unknown>>(
  props: T,
  name = '',
  log = false,
): UseChangedPropsChanges {
  const prev = useRef(props)
  const [changed, setChanged] = useState<UseChangedPropsChanges>([])

  useEffect(() => {
    const changes = entries(props).reduce<UseChangedPropsChanges>((acc, [key, prop]) => {
      if (prev.current[key] === prop) {
        return acc
      }
      acc.push({
        name: key as string,
        prev: prev.current[key] as string | number,
        current: prop as string | number,
      })
      return acc
    }, [])

    if (log && Object.keys(changes).length > 0) {
      if (import.meta.env.MODE === 'development') {
        console.log(`Props Changed ${name ? `[${name}]` : ''}`, changes)
      }
    }

    prev.current = props
    setChanged(changes)
  }, [props, name, log])

  return changed
}

// oxlint-disable-next-line func-style
export function useDebouncedPrevValue<T>(value: T, delay = 500): [T, T] {
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

  return [prevValue.current, debouncedValue]
}
