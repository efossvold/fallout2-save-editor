import { useEffect, useEffectEvent, useRef } from 'react'

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
