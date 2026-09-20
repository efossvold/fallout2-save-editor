import { useState } from 'preact/hooks'

export const useMountEffect = (fn: () => any) => {
  const [mounted, setMounted] = useState(false)

  if (!mounted) {
    setMounted(true)
    fn()
  }
}
