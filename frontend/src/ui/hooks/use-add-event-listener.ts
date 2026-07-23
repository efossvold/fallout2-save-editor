import { useRef, useEffect } from 'react'

interface TOptions {
  register: boolean
  element?: Element
}

export const useEventListener = <Ev extends keyof WindowEventMap>(
  events: Ev,
  handler: (ev: WindowEventMap[Ev]) => any,
  opts?: TOptions,
): void => {
  const { register = true, element } = opts ?? {}
  const handlerRef = useRef<(args: any) => any>(handler)

  /*
    Update ref.current value if handler changes.
    This allows our effect below to always get latest handler
    without needing to pass it in effect deps array
    and potentially cause effect to re-run every render
  */
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    // Do not register the event listener
    if (!register) {
      return undefined
    }

    // Add listener to window unless element is specified
    const target = element ?? globalThis.window

    // Make sure element supports addEventListener
    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (!target.addEventListener) {
      return undefined
    }

    // Create event listener that calls handler function stored in ref
    const eventListener: EventListener = event => {
      handlerRef.current(event)
    }

    const domEvents = Array.isArray(events) ? events : [events]

    domEvents.forEach(event => {
      target.addEventListener(event, eventListener)
    })

    return () => {
      domEvents.forEach(event => {
        target.removeEventListener(event, eventListener)
      })
    }
  }, [events, element, register])
}
