import type React from 'react'

export type Dict<T> = Record<string, T>

export type DictValues<D extends Record<string, unknown>, T> = {
  [Key in keyof D]: T
}

export type MakeOptional<T, K> = Pick<T, Exclude<keyof T, K>> & Partial<T>

export type PrefixedDictIndices<Names extends string, ValueType, Prefix extends string = ''> = {
  [Key in Names as `${Prefix}${Capitalize<Key>}`]: ValueType
}

export type UnionToDict<Union extends string, Type, Prefix extends string> = {
  [Key in Union as `${Prefix}${Capitalize<Key>}`]: Type
}

export type Fn = <A, RT>(args: A) => RT

export interface IError {
  message: string
}
export type MayBeError = Error | string | IError

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
  isToggled?: boolean
}

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]
