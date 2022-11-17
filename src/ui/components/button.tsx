import React from 'react'
import { Button, ButtonProps } from 'react-native-magnus'
import { Hoverable } from '../hoverable'
import { colors } from '../theme'

export const IButton = ({ children, ...rest }: ButtonProps) => (
  <Hoverable>
    {({ isHovered }) => (
      <Button minW={100} bg={isHovered ? 'gray500' : 'gray200'} {...rest}>
        {children}
      </Button>
    )}
  </Hoverable>
)
