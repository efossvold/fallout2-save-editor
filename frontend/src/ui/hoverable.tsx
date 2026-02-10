import type { ClassName, BoxProps } from '../types/types'

import { useHover } from './hooks'

export interface HoverableProps extends Omit<BoxProps, 'children'> {
  children: React.ReactNode | ((state: { isHovered: boolean }) => React.ReactNode)
  className?: ClassName
  onHover?: (ev: React.PointerEvent<HTMLDivElement>) => any
  onUnhover?: (ev: React.SyntheticEvent) => any
}

export const Hoverable = ({ children, onHover, onUnhover, ...rest }: HoverableProps) => {
  const [ref, isHovered] = useHover<HTMLDivElement>()

  return (
    <div
      ref={ref}
      onPointerEnter={ev => {
        if (onHover) {
          onHover(ev)
        }
      }}
      onPointerLeave={onUnhover}
      {...rest}
    >
      {typeof children === 'function' ? children({ isHovered }) : children}
    </div>
  )
}
