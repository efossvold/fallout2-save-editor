import { beforeEach, describe, expect, it, vi } from 'vitest'
import { saveHandler } from './save-handler'
import dataBase64 from './slot01-stats.base64'
import stats from './slot01-stats'
import type { SaveHandler } from './types/save-handler'

let handler: SaveHandler

describe('save-handler', () => {
  beforeEach(() => {
    handler = saveHandler({ isDebug: false }).fromBase64(dataBase64)
  })

  it('should parse a binary save file correctly', () => {
    const data = handler.getData()

    expect(data).toStrictEqual(stats)
  })

  it('should set string correctly', () => {
    handler.setSaveName('s01')
    const data = handler.getData()

    expect(data).toStrictEqual({
      ...stats,
      saveName:
        's01\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
    })
  })

  it('should set integer correctly', () => {
    handler.setBaseAC(5)
    const data = handler.getData()

    expect(data).toStrictEqual({ ...stats, baseAC: 5 })
  })

  it('should set float correctly (1.03)', () => {
    handler.setGameVersion(1.03)
    const data = handler.getData()

    expect(data).toStrictEqual({ ...stats, gameVersion: 1.03 })
  })

  it('should set float correctly (11.03)', () => {
    handler.setGameVersion(11.03)
    const data = handler.getData()

    expect(data).toStrictEqual({ ...stats, gameVersion: 11.03 })
  })

  it('should set float correctly (1)', () => {
    handler.setGameVersion(1)
    const data = handler.getData()

    // eslint-disable-next-line unicorn/no-zero-fractions
    expect(data).toStrictEqual({ ...stats, gameVersion: 1.0 })
  })

  it('should set float correctly (.03)', () => {
    handler.setGameVersion(0.03)
    const data = handler.getData()

    expect(data).toStrictEqual({ ...stats, gameVersion: 0.03 })
  })

  it('should set float correctly (1234)', () => {
    const consoleSpy = vi.spyOn(console, 'assert')

    handler.setGameVersion(1234)
    const data = handler.getData()

    expect(data).toStrictEqual({ ...stats, gameVersion: 12 })
    expect(consoleSpy).toHaveBeenCalledWith(
      false,
      'setValue: Invalid float: 1234',
    )
  })
})
