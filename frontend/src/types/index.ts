import type { ComponentChildren, HTMLAttributes, InputHTMLAttributes, Ref } from 'preact'

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

export type Fn = () => void

export type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

// export interface IError {
//   message: string
// }

// export type MayBeError = Error | string | IError

/*
 * Events
 */
export type IMouseEvent = MouseEvent & {
  currentTarget: (HTMLDivElement | HTMLButtonElement) & EventTarget
}

export type IMouseEventHandler = (ev: IMouseEvent) => void

export type IPointerEvent = PointerEvent & {
  currentTarget: (HTMLDivElement | HTMLButtonElement) & EventTarget
}

export type IPointerEventHandler = (ev: IPointerEvent) => void

export type IKbdEvent = Parameters<IKbdEventHandler>[0]

export type IKbdEventHandler = Exclude<
  InputHTMLAttributes<HTMLDivElement | HTMLButtonElement | HTMLSpanElement>['onKeyPress'],
  undefined
>

export type IInputEventHandler = Exclude<InputHTMLAttributes['onInput'], undefined>

export type IInteractionEvent = IMouseEvent | IPointerEvent | IKbdEvent
export type IInteractionEventHandler = IMouseEventHandler | IPointerEventHandler | IKbdEventHandler

/*
 * JSX
 */
export interface BoxProps {
  children?: ComponentChildren
  class?: string
  onClick?: IMouseEventHandler
  onKeyUp?: IKbdEventHandler
  onKeyDown?: IKbdEventHandler
  onPointerEnter?: IPointerEventHandler
  onPointerLeave?: IPointerEventHandler
  onAction?: (ev: IInteractionEvent | undefined) => void
}

export type CSSProperties = Exclude<HTMLAttributes<HTMLDivElement>['style'], undefined | string>

export interface StyleElementProps {
  class?: string
  children?: ComponentChildren
  id?: string
  ref?: Ref<HTMLDivElement>
  style?: CSSProperties
  sx?: string
}
