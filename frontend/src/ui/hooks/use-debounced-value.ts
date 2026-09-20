import { useEffect, useRef, useState } from 'preact/hooks'

const DEFAULT_DELAY = 250

export const useDebounce = <T>(value: T, delay: number = DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState(() => value)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    if (timerRef.current != undefined) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      timerRef.current = undefined
      setDebouncedValue(() => value)
    }, delay)
  }, [value, delay])

  return debouncedValue
}
