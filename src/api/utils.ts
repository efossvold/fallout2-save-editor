import { Dict, IError, MayBeError } from './types/misc'

export const bitTest = (num: number, bit: number): boolean =>
  (num >> bit) % 2 !== 0
export const bitSet = (num: number, bit: number): number => num | (1 << bit)
export const bitClear = (num: number, bit: number): number => num & ~(1 << bit)
export const bitToggle = (num: number, bit: number): number =>
  bitTest(num, bit) ? bitClear(num, bit) : bitSet(num, bit)

export const ucFirstChar = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1)

export const keysOf = <T extends Dict<unknown>>(obj: T): Array<keyof T> =>
  Array.from(Object.keys(obj))

type Entries<T> = {
  [K in keyof T]: [K, T[K]]
}[keyof T][]

export const entries = <T extends Dict<unknown>>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>

export const sortObjByKey = <Type>(
  dict: Dict<Type | undefined>,
  key: keyof Type,
): Type[] => {
  const items = entries(dict).map<[keyof Type, Type]>(entry => [
    entry[0] as keyof Type,
    entry[1] as Type,
  ])

  items.sort((a, b) => {
    if (a[1][key] > b[1][key]) return 1
    if (a[1][key] < b[1][key]) return -1
    return 0
  })

  return items.map(e => e[1])
}

export const loop = (
  times: number,
  callback: (count: number) => void,
): void => {
  Array(times)
    .fill(0)
    .forEach((item, i) => callback(i))
}

export const getError = <Err extends MayBeError>(
  error: Err,
  log = true,
): Error => {
  let errObj: Error

  if (error instanceof Error) {
    errObj = error
  } else if (typeof error === 'string') {
    errObj = Error(error)
  } else if (typeof error === 'object' && (error as IError).message) {
    errObj = error as Error
  } else {
    const message = `getError: Unknown error type: ${error as string}`
    console.error(message)
    return Error(message)
  }

  if (log) console.error(errObj.message)

  return errObj
}

export const captializeFirstLetter = <Value extends string>(
  s: Value,
): `${Capitalize<Value>}` =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as `${Capitalize<Value>}`

export const prefixString = <Value extends string, Prefix extends string>(
  s: Value,
  prefix: Prefix,
): `${Prefix}${Capitalize<Value>}` =>
  `${prefix}${captializeFirstLetter(s)}` as `${Prefix}${Capitalize<Value>}`
