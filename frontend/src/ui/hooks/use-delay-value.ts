import { useEffect, useState } from 'react'

export const useDelayValue = (isOpen: boolean, delayTime: number) => {
  const [shouldRender, setShouldRender] = useState(isOpen)

  if (isOpen && !shouldRender) {
    setShouldRender(true)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    if (!isOpen && shouldRender) {
      timeoutId = setTimeout(() => {
        setShouldRender(false)
      }, delayTime)
    }

    return () => clearTimeout(timeoutId)
  }, [isOpen, delayTime, shouldRender])

  return shouldRender
}
