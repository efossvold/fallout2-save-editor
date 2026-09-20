import type { ComponentChildren } from 'preact'

import type { BoxProps, IPointerEvent } from '~/types'

import { useHover } from './hooks/use-hover'

interface HoverableProps extends Omit<BoxProps, 'children'> {
  children: ComponentChildren | ((state: { isHovered: boolean }) => ComponentChildren)
  class?: string
  onHover?: (ev: IPointerEvent) => any
  onUnhover?: (ev: IPointerEvent) => any
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
      onPointerLeave={ev => {
        if (onUnhover) {
          onUnhover(ev)
        }
      }}
      {...rest}
    >
      {typeof children === 'function' ? children({ isHovered }) : children}
    </div>
  )
}
