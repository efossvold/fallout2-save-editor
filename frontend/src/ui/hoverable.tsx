import type { Octane } from 'octane/jsx-runtime'

import type { BoxProps, IPointerEvent } from '~/types'

import { useHover } from './hooks/use-hover'

interface HoverableProps extends Omit<BoxProps, 'children'> {
  children: Octane.JSX.Element | ((state: { isHovered: boolean }) => Octane.JSX.Element)
  className?: string
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
