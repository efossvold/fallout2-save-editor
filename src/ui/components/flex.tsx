import React, { PropsWithChildren } from 'react'
import { Box, BoxProps } from 'react-native-magnus'
import { getSpacedChildren } from './utils'

interface StackProps extends BoxProps {
  space?: number
  reversed?: boolean
}

export const HStack = ({
  children,
  space = 0,
  reversed = false,
  ...p
}: StackProps) => {
  return (
    <Box flexDir="row" {...p}>
      {getSpacedChildren(children, space, 'X', reversed)}
    </Box>
  )
}

export const VStack = ({
  children,
  space = 0,
  reversed = false,
  ...p
}: StackProps) => {
  return (
    <Box flexDir="column" {...p}>
      {getSpacedChildren(children, space, 'Y', reversed)}
    </Box>
  )
}
