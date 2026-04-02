import type { RefObject } from 'react'

import { clsx } from 'clsx'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

import type { UseDisclosureReturn, Dict } from '~/types'

import { entries } from '../api/utils'
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

  useEffect(function setMounted() {
    if (!mounted.current) {
      mounted.current = true
      return fn()
    }

    return undefined
    // oxlint-disable-next-line eslint-plugin-react-hooks/exhaustive-deps
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
  const [height, setHeight] = useState(0)
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

  return [elementRef, height] as const
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

interface Disclosure {
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

type UseChangedPropsChanges = { name: string; prev: string | number; current: string | number }[]

export const useChangedProps = (
  props: Dict<unknown>,
  name = '',
  log = false,
): UseChangedPropsChanges => {
  const prev = useRef(props)
  const [changed, setChanged] = useState<UseChangedPropsChanges>([])

  useEffect(() => {
    const changes = entries(props).reduce<UseChangedPropsChanges>((acc, [key, prop]) => {
      if (prev.current[key] === prop) {
        return acc
      }
      acc.push({
        name: key,
        prev: prev.current[key] as string | number,
        current: prop as string | number,
      })
      return acc
    }, [])

    if (log && Object.keys(changes).length > 0) {
      if (!import.meta.env.PROD) {
        console.log(`Props Changed ${name ? `[${name}]` : ''}`, changes)
      }
    }

    prev.current = props
    setChanged(changes)
  }, [props, name, log])

  return changed
}

export const useDebouncedPrevValue = <T>(value: T, delay = 500): [RefObject<T>, T] => {
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
