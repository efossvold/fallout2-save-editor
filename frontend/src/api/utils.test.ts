import { describe, expect, it, vi } from 'bun:test'

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
    const consoleSpy = vi.spyOn(console, 'error')

    // Disable console.error logging
    consoleSpy.mockReturnValue()

    // oxlint-disable-next-line unicorn/no-null
    expect(U.getError(null)).toStrictEqual(Error('Invalid error: null'))
    expect(consoleSpy).toHaveBeenCalledWith('Invalid error: null')

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
    const d = U.parseDate(1_771_369_889_666)

    expect(d.day).toBe('17')
    expect(d.month).toBe('Feb')
    expect(d.year).toBe('2026')
    expect(d.hour).toBe('23')
    expect(d.minute).toBe('11')
  })

  describe('indexOf', () => {
    it('indexOf - sequence found in the middle', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      const sequence = [0x78, 0x90]
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array(sequence))).toBe(3)
    })

    it('indexOf - sequence found at the end', () => {
      const fixture2 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab] //
      const sequence2 = [0x90, 0xab] //
      expect(U.indexOf(new Uint8Array(fixture2), new Uint8Array(sequence2))).toBe(4)
    })

    it('indexOf - sequence not found', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array([0x00, 0x01]))).toBe(-1)
    })

    it('indexOf - sequence found at the beginning', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      const sequence3 = [0x12, 0x34]
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array(sequence3))).toBe(0)
    })

    it('indexOf - sequence is the entire array', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      const sequence4 = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array(sequence4))).toBe(0)
    })

    it('indexOf - empty array as sequence', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      const emptyArray: [] = []
      expect(U.indexOf(new Uint8Array(emptyArray), new Uint8Array([0x78, 0x90]))).toBe(-1)
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array(emptyArray))).toBe(-1)
    })

    it('indexOf - single element found', () => {
      const fixture = [0x12, 0x34, 0x56, 0x78, 0x90, 0xab, 0xcd, 0xef] //
      const singleElement = [0x56]
      expect(U.indexOf(new Uint8Array(fixture), new Uint8Array(singleElement))).toBe(2)
    })
  })
})
