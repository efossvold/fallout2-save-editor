import type { PropsWithChildren } from 'react'
import type { BoxProps } from '@chakra-ui/react'
import { Box, Text } from '@chakra-ui/react'
import { colors } from './theme'
import { LINE_HEIGHT } from './constants'

export const Panel = ({ children, ...props }: PropsWithChildren<BoxProps>) => (
  <Box pt={2} pb={1} px={2} rounded={4} {...props}>
    {children}
  </Box>
)

interface PanelHeaderProps {
  text: string
  color?: string
}

export const PanelHeader = (p: PanelHeaderProps) => (
  <Text color={p.color ?? colors.beige[500]} mb={LINE_HEIGHT} textAlign="left">
    {p.text}
  </Text>
)
