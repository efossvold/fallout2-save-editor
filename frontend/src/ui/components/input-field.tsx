import type { InputHTMLAttributes } from 'preact'

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

interface InputProps extends Omit<InputHTMLAttributes, 'size'>, RecipeVariant<typeof inputStyle> {
  autoFocus?: boolean
  class?: string
}

export const InputField = ({
  autoFocus,
  class: className,
  maxLength,
  name,
  onInput,
  placeholder,
  size,
  value,
  variant,
}: InputProps) => (
  <input
    // oxlint-disable-next-line jsx-a11y/no-autofocus
    autoFocus={autoFocus}
    class={cx(inputStyle({ variant, size }), className)}
    maxLength={maxLength}
    name={name}
    onInput={onInput}
    placeholder={placeholder}
    value={value}
  />
)
