import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { useHover } from './hooks'

export type HoverableProps = {
  children:
    | React.ReactNode
    | ((state: { isHovered: boolean }) => React.ReactNode)
  onHover?: (ev: PointerEvent) => any
  onUnhover?: (ev: React.SyntheticEvent) => any
} & Omit<BoxProps, 'children'>

export const Hoverable = ({
  children,
  onHover,
  onUnhover,
  ...rest
}: HoverableProps) => {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <Box
      ref={ref}
      onPointerEnter={onHover}
      onPointerLeave={onUnhover}
      {...rest}
    >
      {typeof children === 'function' ? children({ isHovered }) : children}
    </Box>
  )
}
