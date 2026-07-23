import type { RefObject } from 'react'

import { useEffect, useRef, useState } from 'react'

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
