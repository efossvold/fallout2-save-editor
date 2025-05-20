import { useMediaQuery } from '@chakra-ui/react'
import { breakpoints } from './breakpoints'

export const useIsLargerThanSmall = (): boolean =>
  useMediaQuery(`(min-width: ${breakpoints.sm})`).at(0) ?? false

export const useIsLargerThanMedium = (): boolean =>
  useMediaQuery(`(min-width: ${breakpoints.md})`).at(0) ?? false

export const useIsMobile = (): boolean => !useIsLargerThanSmall()
