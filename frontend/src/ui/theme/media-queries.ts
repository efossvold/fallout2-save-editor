import { useMediaQuery } from '@chakra-ui/react'
import { breakpoints } from './breakpoints'

export const useIsLargerThanSmall = (): boolean =>
  useMediaQuery(`(min-width: ${breakpoints.sm})`)[0]

export const useIsLargerThanMedium = (): boolean =>
  useMediaQuery(`(min-width: ${breakpoints.md})`)[0]

export const useIsMobile = (): boolean => !useIsLargerThanSmall()
