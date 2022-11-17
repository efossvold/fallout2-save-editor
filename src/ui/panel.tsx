import React, { PropsWithChildren } from 'react'
import { Box, BoxProps, Text } from 'react-native-magnus'
import { colors, LINE_HEIGHT } from './theme'

export const Panel = ({ children, ...props }: PropsWithChildren<BoxProps>) => (
  <Box p={12} rounded="sm" {...props}>
    {children}
  </Box>
)

interface PanelHeaderProps {
  text: string
  color?: string
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <Text color={p.color || colors.beige500} mb={LINE_HEIGHT}>
    {p.text}
  </Text>
)
