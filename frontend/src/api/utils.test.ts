import { describe, expect, it } from 'vitest'

import * as U from './utils'

describe('selectors', () => {
  it('bitToggle', () => {
    expect(U.bitToggle(96, 6)).toBe(32)
    expect(U.bitToggle(96, 5)).toBe(64)
    expect(U.bitToggle(96, 4)).toBe(112)
    expect(U.bitToggle(96, 3)).toBe(104)
  })

  it('captializeFirstLetter', () => {
    expect(U.captializeFirstLetter('captializeFirstLetter')).toBe('CaptializeFirstLetter')
  })

  it('keysOf', () => {
    const dict = {
      hello: 1,
      world: 2,
    }
    expect(U.keysOf(dict)).toStrictEqual(['hello', 'world'])
  })

  it('entries', () => {
    const dict = {
      hello: 1,
      world: 2,
    }
    expect(U.entries(dict)).toStrictEqual([
      ['hello', 1],
      ['world', 2],
    ])
  })

  it('getError', () => {
    // oxlint-disable-next-line unicorn/no-null
    expect(U.getError(null)).toStrictEqual(Error('Invalid error: null'))
    expect(U.getError(Error('mock-error'))).toStrictEqual(Error('mock-error'))
    expect(U.getError('mock-error')).toStrictEqual(Error('mock-error'))
    expect(U.getError({ message: 'mock-error' })).toStrictEqual(Error('mock-error'))
    expect(U.getError({ hello: 'world' })).toStrictEqual(
      Error('getError: Unknown error type: {"hello":"world"}'),
    )
    expect(U.getError(1)).toStrictEqual(Error('getError: Unknown error type: 1'))
  })

  it('prefixString', () => {
    expect(U.prefixString('world', 'hello')).toBe('helloWorld')
  })

  it('base64toBlob', async () => {
    expect(await U.base64toBlob('aGVsbG8gd29ybGQ=').text()).toBe('hello world')
  })

  it('parseDate', () => {
    const d = U.parseDate(1_771_348_458_342)

    expect(d.day).toBe('17')
    expect(d.month).toBe('Feb')
    expect(d.year).toBe('2026')
    expect(d.hour).toBe('18')
    expect(d.minute).toBe('14')
  })
})
