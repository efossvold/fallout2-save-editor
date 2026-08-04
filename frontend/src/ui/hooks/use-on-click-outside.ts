import type { Octane } from 'octane/jsx-runtime'

import { useEffect } from 'octane'

type IEvent = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement>(
  ref: Octane.Ref<T> | Element | null,
  handler: (event: IEvent) => void,
): void => {
  useEffect(() => {
    const listener = (ev: IEvent): void => {
      const refs = Array.isArray(ref) ? ref : [ref]
      const isClickInside = refs.some(r => {
        const el = r && 'current' in r ? r.current : r

        // Do nothing if clickΩing ref's element or descendent elements
        if (!el || el.contains(ev.target)) {
          return true
        }

        return false
      })

      if (!isClickInside) {
        handler(ev)
      }
    }

    // no ref provided, do not add listener
    if (!ref) {
      return undefined
    }

    document.addEventListener('click', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('click', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
