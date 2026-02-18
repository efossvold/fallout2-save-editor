import { beforeEach, describe, expect, it, vi } from 'bun:test'

import stats from './fixtures/slot01-stats'
import dataBase64 from './fixtures/slot01-stats.base64'
import { saveHandler } from './save-handler'
import type { SaveHandler } from './types/save-handler'

let handler: SaveHandler

describe('save-handler', () => {
  beforeEach(() => {
    handler = saveHandler({ isDebug: false }).fromBase64(dataBase64)
  })

  it('should parse a base64 save file correctly', () => {
    expect(handler.getData()).toStrictEqual(stats)
  })

  it('should parse a base64 1 save file correctly', () => {
    handler = saveHandler({ isDebug: false }).fromBase64(dataBase64, { gameVersion: '1.04' })
    expect(handler.getData()).toStrictEqual({ ...stats, gameVersion: '1.04' })
  })

  it('should export to base64 correctly', () => {
    expect(handler.toBase64()).toBe(dataBase64)
  })

  it('should set string correctly', () => {
    handler.setSaveName('s01')
    expect(handler.getData()).toStrictEqual({
      ...stats,
      saveName:
        's01\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000\u0000',
    })
  })

  it('should set integer correctly', () => {
    handler.setBaseAC(5)
    expect(handler.getData()).toStrictEqual({ ...stats, baseAC: 5 })
  })

  describe('setGameVersion', () => {
    it('should set float correctly (1.03)', () => {
      handler.setGameVersion('1.03')
      expect(handler.getData()).toStrictEqual({ ...stats, gameVersion: '1.03' })
    })

    it('should set float correctly (11.03)', () => {
      handler.setGameVersion(11.03)
      expect(handler.getData()).toStrictEqual({ ...stats, gameVersion: '11.03' })
    })

    it('should set float correctly (1)', () => {
      handler.setGameVersion(1)
      expect(handler.getData()).toStrictEqual({ ...stats, gameVersion: '1.00' })
    })

    it('should set float correctly (.03)', () => {
      handler.setGameVersion(0.03)
      expect(handler.getData()).toStrictEqual({ ...stats, gameVersion: '0.03' })
    })

    it('should set float correctly (1234)', () => {
      const consoleSpy = vi.spyOn(console, 'assert')

      handler.setGameVersion(1234)
      const data = handler.getData()

      expect(data).toStrictEqual({ ...stats, gameVersion: '12.00' })
      expect(consoleSpy).toHaveBeenCalledWith(false, 'setValue: Invalid float: 1234')
    })
  })
})
