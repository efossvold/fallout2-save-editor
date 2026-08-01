import { useEffect, useEffectEvent, useState } from 'octane'

export const useMountEffect = (fn: () => any) => {
  const [mounted, setMounted] = useState(false)

  const onMount = useEffectEvent(() => {
    if (!mounted) {
      setMounted(true)
      fn()
    }
  })

  useEffect(() => {
    onMount()
  }, [])
}
