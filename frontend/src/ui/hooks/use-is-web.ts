import { useLocation } from './use-location'

/**
 * @returns undefined when location is not yet available,
 * true when app is viewed in browser
 * false when is local app
 */
export const useIsWeb = (): boolean | undefined => {
  const location = useLocation()

  if (location === undefined) {
    return undefined
  }

  return !location.href.startsWith('wails://')
}
