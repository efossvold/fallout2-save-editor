import type { BoxProps } from '@chakra-ui/react'
import { colors } from './theme'

interface CaretProps {
  isHovered?: boolean
  color?: string
  hoverColor?: string
  size?: number
}

export const caretRight = (p: CaretProps): BoxProps['style'] => ({
  borderWidth: p.size ?? 5,
  borderStyle: 'solid',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderLeftColor: p.isHovered
    ? (p.color ?? colors.gold[400])
    : (p.hoverColor ?? colors.green[200]),
  borderRightColor: 'transparent',
  marginTop: 1,
  marginLeft: 1,
})

export const caretLeft = (p: CaretProps): BoxProps['style'] => ({
  borderWidth: p.size ?? 5,
  borderStyle: 'solid',
  borderTopColor: 'transparent',
  borderLeftColor: 'transparent',
  borderBottomColor: 'transparent',
  borderRightColor: p.isHovered
    ? (p.color ?? colors.gold[400])
    : (p.hoverColor ?? colors.green[200]),
  marginTop: 0.5,
  marginRight: 1,
})

export const caretUp = (p: CaretProps): BoxProps['style'] => ({
  borderWidth: 7,
  borderStyle: 'solid',
  borderTopColor: 'transparent',
  borderBottomColor: p.isHovered
    ? (p.color ?? colors.gold[400])
    : (p.hoverColor ?? colors.gray[900]),
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
  marginBottom: 4,
})

export const caretDown = (p: CaretProps): BoxProps['style'] => ({
  borderWidth: 7,
  borderStyle: 'solid',
  borderTopColor: p.isHovered
    ? (p.color ?? colors.gold[400])
    : (p.hoverColor ?? colors.gray[900]),
  borderBottomColor: 'transparent',
  borderLeftColor: 'transparent',
  borderRightColor: 'transparent',
})
