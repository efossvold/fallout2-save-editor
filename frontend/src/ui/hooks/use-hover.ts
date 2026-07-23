import { useEffect, useRef, useState } from 'react'

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
