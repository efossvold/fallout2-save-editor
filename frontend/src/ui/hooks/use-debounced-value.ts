import type { Octane } from 'octane/jsx-runtime'

import { useEffect, useRef, useState } from 'octane'

/* Deprecated over native useDeferredValue */
export const useDebouncedValue = <T>(value: T, delay = 500): [Octane.Ref<T>, T] => {
  const prevValue = useRef(value)
  const isPrevValueSet = useRef(false)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    let handler: NodeJS.Timeout | undefined

    if (!isPrevValueSet.current) {
      handler = setTimeout(() => {
        setDebouncedValue(value)
        isPrevValueSet.current = false
        prevValue.current = value
        isPrevValueSet.current = true
      }, delay)
    }

    return () => {
      if (handler) {
        clearTimeout(handler)
      }
    }
  }, [value, delay, prevValue])

  return [prevValue, debouncedValue]
}
