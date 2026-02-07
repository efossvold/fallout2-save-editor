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

export interface IError {
  message: string
}
export type MayBeError = Error | string | IError
