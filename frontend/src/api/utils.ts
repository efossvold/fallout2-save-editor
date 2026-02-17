import type { Entries } from '../types/types'

import type { Dict } from './types/misc'

export const bitTest = (num: number, bit: number): boolean => (num >> bit) % 2 !== 0
export const bitSet = (num: number, bit: number): number => num | (1 << bit)
export const bitClear = (num: number, bit: number): number => num & ~(1 << bit)

export const bitToggle = (num: number, bit: number): number =>
  bitTest(num, bit) ? bitClear(num, bit) : bitSet(num, bit)

export const captializeFirstLetter = <Value extends string>(s: Value): Capitalize<Value> =>
  (s.charAt(0).toUpperCase() + s.slice(1)) as Capitalize<Value>

export const keysOf = <T extends Dict<unknown>>(obj: T): (keyof T)[] => Object.keys(obj)

export const entries = <T extends Dict<unknown>>(obj: T): Entries<T> =>
  Object.entries(obj) as Entries<T>

export const getError = (error: unknown, log = true): Error => {
  let errObj: Error

  if (error === null) {
    errObj = new Error('Invalid error: null')
  } else if (error instanceof Error) {
    errObj = error
  } else if (typeof error === 'string') {
    errObj = new Error(error)
  } else if (typeof error === 'object' && 'message' in error) {
    // Object.prototype.hasOwnProperty('message')
    if (typeof error.message === 'string') {
      errObj = new Error(error.message)
    } else {
      errObj = new Error('MESSAGE_NOT_STRING')
    }
  } else {
    let errorMsg = ''
    try {
      errorMsg = JSON.stringify(error)
    } catch {
      errorMsg = 'INVALID_ERROR_OBJECT'
    }
    const message = `getError: Unknown error type: ${errorMsg}`
    errObj = new Error(message)
  }

  if (log) {
    console.error(errObj.message)
  }

  return errObj
}

export const prefixString = <Value extends string, Prefix extends string>(
  s: Value,
  prefix: Prefix,
): `${Prefix}${Capitalize<Value>}` => `${prefix}${captializeFirstLetter(s)}`

export const base64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data)
  const byteArrays = []

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = Array.from<number>({ length: slice.length })
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return blob
}

export const parseDate = (date: number | Date) => {
  const f = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat('en-US', opts).formatToParts(date)[0]

  return {
    year: f({ year: 'numeric' })?.value ?? '',
    month: f({ month: 'short' })?.value ?? '',
    day: f({ day: '2-digit' })?.value ?? '',
    hour: f({ hour: '2-digit', hour12: false })?.value ?? '',
    minute: f({ minute: 'numeric' })?.value ?? '',
  }
}

/*
 * Credit: Sindre Sorhos
 * https://github.com/sindresorhus/uint8array-extras
 */
export const indexOf = (array: Uint8Array, value: Uint8Array): number => {
  const arrayLength = array.length
  const valueLength = value.length

  if (valueLength === 0) {
    return -1
  }

  if (valueLength > arrayLength) {
    return -1
  }

  const validOffsetLength = arrayLength - valueLength

  for (let index = 0; index <= validOffsetLength; index++) {
    let isMatch = true
    for (let index2 = 0; index2 < valueLength; index2++) {
      if (array[index + index2] !== value[index2]) {
        isMatch = false
        break
      }
    }

    if (isMatch) {
      return index
    }
  }

  return -1
}
