import type React from 'react'

export type ClassName = React.HTMLProps<HTMLElement>['className']

export interface BoxProps {
  children?: React.ReactNode
  className?: ClassName
  onClick?: React.MouseEventHandler<HTMLElement>
  onKeyUp?: React.KeyboardEventHandler<HTMLElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>
  onPointerEnter?: React.PointerEventHandler<HTMLElement>
  onPointerLeave?: React.PointerEventHandler<HTMLElement>
  onAction?: (
    ev: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement> | undefined,
  ) => void
}

export interface ButtonProps extends BoxProps {
  isDisabled?: boolean
}

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}
