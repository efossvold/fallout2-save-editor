import { useState } from 'octane'

import { getWindow } from '../utils'
import { useMountEffect } from './use-mount-effect'

export const useLocation = () => {
  const [location, setLocation] = useState<Location | undefined>()

  useMountEffect(() => {
    setLocation(getWindow()?.location)
  })

  return location
}
