import type React from 'react'
import type { RefObject } from 'react'

import type { RecipeVariant } from '../../styled-system/css'

import { cva, cx } from '../../styled-system/css'

const inputStyle = cva({
  base: {
    display: 'inline-block',
    mt: '3',
    px: '3',
    py: '1',
    w: 'full',
    rounded: 'sm',
    outline: 'none',
  },
  variants: {
    variant: {
      light: {
        color: 'gray.800',
        bg: 'gray.100',
        _placeholder: {
          color: 'gray.400',
        },
      },
      dark: {
        color: 'white',
        bg: 'gray.600',
        _placeholder: {
          color: 'gray.400',
        },
      },
    },
    size: {
      sm: { fs: 'xs' },
      md: { fs: 'md' },
      lg: { fs: 'xl' },
    },
  },
})

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    RecipeVariant<typeof inputStyle> {
  autoFocus?: boolean
  className?: string
  ref?: RefObject<HTMLInputElement>
}

export const InputField = ({
  autoFocus,
  ref,
  variant,
  size,
  className = '',
  ...rest
}: InputProps) => (
  <input
    ref={ref}
    // oxlint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autoFocus}
    placeholder="Enter name..."
    className={cx(inputStyle({ variant, size }), className)}
    {...rest}
  />
)
