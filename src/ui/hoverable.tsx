import React, { useState } from 'react'
import { Pressable, PressableProps } from 'react-native'

export interface HoverableProps extends PressableProps {
  children:
    | React.ReactNode
    | ((state: { isHovered: boolean }) => React.ReactNode)
  onHover?: () => void
  onUnhover?: () => void
}

export const Hoverable = ({
  children,
  onHover,
  onUnhover,
  ...rest
}: HoverableProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Pressable
      // @ts-ignore
      onHoverIn={ev => {
        setIsHovered(true)
        if (onHover) {
          onHover()
        }
      }}
      // @ts-ignore
      onHoverOut={() => {
        setIsHovered(false)
        if (onUnhover) {
          onUnhover()
        }
      }}
      {...rest}
    >
      {typeof children === 'function' ? children({ isHovered }) : children}
    </Pressable>
  )
}
