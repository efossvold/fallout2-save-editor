import type { BoxProps } from '~/types'

import type { RecipeVariantProps } from '../../styled-system/css'

import { cva, cx } from '../../styled-system/css'

const buttonStyle = cva({
  base: {
    display: 'inline-flex',
    cursor: 'pointer',
    rounded: 'md',
    px: '3',
    py: '1.5',
    fontWeight: 'semibold',
    _hover: { bg: 'gray.500' },
  },
  variants: {
    kind: {
      primary: {
        color: 'white',
        bg: 'gray.600',
      },
      secondary: {
        color: 'gray.900',
        bg: 'gray.100',
      },
    },
    isDisabled: {
      true: {
        bg: 'gray.300',
        cursor: 'default',
        _hover: {
          bg: 'gray.300',
          color: 'white',
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    kind: 'primary',
  },
})

type ModalButtonProps = RecipeVariantProps<typeof buttonStyle> & BoxProps

export const ModalButton = ({
  children,
  className = '',
  kind = 'primary',
  isDisabled = false,
  ...rest
}: ModalButtonProps) => (
  <button
    className={cx(buttonStyle({ kind, isDisabled }), className)}
    disabled={isDisabled}
    {...rest}
  >
    {children}
  </button>
)

const toolbarButtonStyle = cva({
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    rounded: 'sm',
    w: '24',
    h: '11',
    fontWeight: 'semibold',
    color: 'gray.900',
    bg: 'gray.100',
    transition: 'colors',
    cursor: 'pointer',
    _hover: {
      color: 'gray.50',
      bg: 'gray.400',
    },
    sm: { fs: 'lg' },
  },
  variants: {
    isToggled: {
      true: {
        color: 'gray.100',
        bg: 'gray.600',
        _hover: { bg: 'gray.400', color: 'gray.50' },
      },
      false: {},
    },
    isDisabled: {
      true: {
        bg: 'gray.300',
        cursor: 'default',
        _hover: { bg: 'gray.300', color: 'gray.900' },
      },
      false: {},
    },
  },
})

type ToolbarButtonProps = RecipeVariantProps<typeof toolbarButtonStyle> & BoxProps

export const ToolbarButton = ({
  children,
  className = '',
  onClick,
  isDisabled = false,
  isToggled = false,
}: ToolbarButtonProps) => (
  <button
    className={cx(toolbarButtonStyle({ isDisabled, isToggled }), className)}
    onClick={ev => {
      if (onClick) {
        onClick(ev)
      }
    }}
    disabled={isDisabled}
  >
    {children}
  </button>
)
