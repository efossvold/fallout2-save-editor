import { useLayoutEffect, useRef, useState } from 'react'

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
