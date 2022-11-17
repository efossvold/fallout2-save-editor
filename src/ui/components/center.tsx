import React, { PropsWithChildren } from 'react'
import { Box, BoxProps } from 'react-native-magnus'
import { getSpacedChildren } from './utils'

interface StackProps extends BoxProps {
  space?: number
  reversed?: boolean
}

export const Center = ({ children, ...p }: StackProps) => {
  return (
    <Box justifyContent="center" alignItems="center" {...p}>
      {children}
    </Box>
  )
}
