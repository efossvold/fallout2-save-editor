import { Buffer } from 'buffer'

import { getCategory, ItemCategory, ITEMS } from './data/items'
import * as M from './map'
import { createSaveData } from './save-data'
import type { InventoryItem } from './types/items'
import type * as MT from './types/map'
import type { Getters, SaveHandler, Setters } from './types/save-handler'
import * as U from './utils'

interface SaveHandlerArgs {
  isDebug?: boolean
}

export const saveHandler = (args?: SaveHandlerArgs): SaveHandler => {
  let buffer: Buffer | undefined
  let saveData = createSaveData()
  let map = M.createMap()
  const isDebug = args?.isDebug ?? false

  const logger = (...text: (string | number | object)[]): void => {
    if (isDebug) {
      console.log(...text)
    }
  }

  // Const gameStartDate = new Date(2241, 6, 25)

  const getBuffer = (): Buffer => {
    if (!buffer) {
      throw new Error('Buffer not initialized.')
    }
    return buffer
  }

  const getOffset = (sectionName: keyof MT.SaveMap, errMsg?: string): number => {
    const { offset } = map[sectionName]
    if (offset < 0) {
      throw new Error(errMsg ?? `Could not find '${sectionName}' offset`)
    }
    logger(`${sectionName} offset found at 0x${offset.toString(16)}`)
    return offset
  }

  const createGetters = <
    SectionName extends keyof MT.SaveMap,
    Section extends MT.SaveMap[SectionName]['keys'],
    SectionGetters = Getters<Section>,
  >(
    sectionName: SectionName,
    prefix = '',
  ): SectionGetters => {
    const section = map[sectionName]
    return Object.entries(section.keys).reduce<SectionGetters>((getters, [key, _entry]) => {
      // @ts-expect-error literal cannot be used to index type unknown
      getters[`get${prefix}${U.captializeFirstLetter(key)}`] = () =>
        getValue(
          getOffset(sectionName),
          // @ts-expect-error Element implicitly has an 'any' type because expression of type 'string' can't be used to index section.keys
          section.keys[key],
        )
      return getters
    }, {} as SectionGetters)
  }

  const createSetters = <
    SectionName extends keyof MT.SaveMap,
    Section extends MT.SaveMap[SectionName]['keys'],
    SectionSetters = Setters<Section>,
  >(
    sectionName: SectionName,
    prefix = '',
  ): SectionSetters => {
    const section = map[sectionName]
    return U.entries(section.keys).reduce<SectionSetters>((setters, [key, _entry]) => {
      // @ts-expect-error key is string and cannot be used to index element
      setters[`set${prefix}${U.captializeFirstLetter(key)}`] = (value: string | number) => {
        setValue(getOffset(sectionName), section.keys[key], value)
      }
      return setters
    }, {} as SectionSetters)
  }

  const getValue = <Entry extends MT.MapKeyValueEntry>(
    sectionOffset: number | keyof MT.SaveMap,
    entry: Entry,
  ): number | string => {
    // TODO: Remove (not used)
    if (typeof sectionOffset === 'string') {
      sectionOffset = getOffset(sectionOffset)
    }

    buffer = getBuffer()

    const { kind, length } = entry
    const offset = sectionOffset + entry.offset

    switch (kind) {
      case 'float': {
        // Can only read 4 byte floats (2B.2B)
        const n1 = buffer.readUInt8(offset)
        const n2 = buffer.readUInt8(offset + 0x01)
        const d1 = buffer.readUInt8(offset + 0x02)
        const d2 = buffer.readUInt8(offset + 0x03)

        return Number.parseFloat(`${n1}${n2}.${d1}${d2}`)
      }

      case 'int': {
        return buffer.readIntBE(offset, length)
      }

      case 'string': {
        return Array.from({ length })
          .map((_, i) => {
            const code = getBuffer().at(offset + i)
            if (code === undefined) {
              console.error(`getValue (${entry.name}): Buffer out of range' `)
            }
            return String.fromCodePoint(code ?? 0)
          })
          .join('')
      }

      default: {
        throw new Error(`No read handler defined for kind ${entry.kind}`)
      }
    }
  }

  const setValue = <Entry extends MT.MapKeyValueEntry>(
    sectionOffset: number,
    entry: Entry,
    value: string | number,
  ): void => {
    logger('setValue', entry, value)
    buffer = getBuffer()
    const { kind, length } = entry
    const offset = sectionOffset + entry.offset

    switch (kind) {
      case 'float': {
        // Can only write 4 byte floats (2B.2B)

        console.assert(Number(value) < 99, `setValue: Invalid float: ${value}`)

        const [integral = '', fractional = ''] = value.toString().split('.')
        const [n1 = '0', n2 = '0'] = String(integral).padStart(2, '0')
        const [d1 = '0', d2 = '0'] = String(fractional).padStart(2, '0')

        buffer.writeUInt8(Number(n1), offset)
        buffer.writeUInt8(Number(n2), offset + 0x01)
        buffer.writeUInt8(Number(d1), offset + 0x02)
        buffer.writeUInt8(Number(d2), offset + 0x03)

        break
      }
      case 'int': {
        if (Number(value) < 0) {
          buffer.writeIntBE(Number(value), offset, length)
        } else {
          buffer.writeUIntBE(Number(value), offset, length)
        }

        break
      }
      case 'string': {
        const strValue = String(value)
        for (let i = 0; i < length; i += 1) {
          const char = i < strValue.length ? strValue.at(i)?.charCodeAt(0) : 0
          buffer.writeUInt8(char ?? 0, offset + i)
        }

        break
      }
      default: {
        throw new Error(`No write handler defined for type ${entry.kind}`)
      }
    }
  }

  const getSectionData = <
    SectionName extends keyof MT.SaveMap,
    ReturnType = MT.SaveTypesMap[SectionName],
  >(
    sectionName: SectionName,
    customOffset?: number,
  ): ReturnType => {
    // Logger('getSectionData', sectionName)
    const offset = customOffset ?? getOffset(sectionName)

    return Object.entries(map[sectionName].keys).reduce((acc: ReturnType, [key, entry]) => {
      const value = getValue(offset, entry as any)

      // @ts-expect-error value is any
      saveData[key] = value

      // @ts-expect-error value is any
      acc[key] = value
      return acc
    }, {} as ReturnType)
  }

  const setSectionData = <SectionName extends keyof MT.SaveMap>(
    sectionName: SectionName,
    data: MT.SaveGameData,
  ): void => {
    logger('setSectionData', sectionName)
    const offset = getOffset(sectionName)
    for (const [key, spec] of U.entries(map[sectionName].keys)) {
      // @ts-expect-error shite
      const value = data[key]

      console.assert(value !== undefined, `setSectionData: Not value found for '${key.toString()}'`)

      setValue(offset, spec, value as string | number)

      if (sectionName === 'f8') {
        console.log([data.taggedSkill1, data.taggedSkill2, data.taggedSkill3, data.taggedSkill4], {
          offset,
          spec,
          value,
        })
      }
    }
  }

  const readInventoryItem = (offset: number): [InventoryItem, number] => {
    // Number of fields * field size
    const itemSize = 0x58 + 0x04
    const itemId = getValue(offset, M.inventoryKeys.id).toString()
    const item = ITEMS[itemId.toString()]

    if (!item) {
      throw new Error(`Found unknown item id (${itemId}). Editing this file will corrupt it.`)
    }

    const qty = getValue(offset, M.inventoryKeys.qty) as number
    const qtyContained = getValue(offset, M.inventoryKeys.qtyContained) as number
    const category = getCategory(item)

    let nextOffset = offset + itemSize

    switch (category) {
      case ItemCategory.WEAPON: {
        // 0x5c (loaded rounds)
        nextOffset += 0x04
        // 0x60 (ammo type)
        nextOffset += 0x04

        break
      }
      case ItemCategory.AMMO: {
        // 0x5c (amount of rounds)
        nextOffset += 0x04

        break
      }
      case ItemCategory.MISC: {
        // 0x5c (meta info)
        nextOffset += 0x04

        break
      }
      // No default
    }

    for (const entry of M.INVENTORY_ALWAYS_ZERO) {
      const value = getValue(offset, entry)
      if (value !== 0) {
        throw new Error(`Possible invalid/corrupt item with ID '${itemId}'. `)
      }
    }

    return [
      {
        id: itemId,
        qty,
        desc: item.desc,
        category: ItemCategory[category].toLocaleLowerCase(),
        qtyContained,
      },
      nextOffset,
    ]
  }

  return {
    ...createGetters('header'),
    ...createGetters('f5'),
    ...createGetters('f6'),
    ...createGetters('f8'),
    ...createGetters('f9', 'Perk'),
    ...createGetters('f11'),
    ...createGetters('f13'),
    ...createGetters('f15'),
    ...createGetters('f17'),

    ...createSetters('header'),
    ...createSetters('f5'),
    ...createSetters('f6'),
    ...createSetters('f8'),
    ...createSetters('f9', 'Perk'),
    ...createSetters('f11'),
    ...createSetters('f13'),
    ...createSetters('f15'),
    ...createSetters('f17'),

    findF6Offset() {
      this.getInventoryItems()
      return getOffset('f6')
    },

    findF7Offset() {
      map.f7.offset = getOffset('f6') + map.f6.size
      return getOffset('f7')
    },

    findF8Offset() {
      map.f8.offset = getOffset('f6') + map.f6.size + map.f7.size
      return getOffset('f8')
    },

    findF9Offset() {
      map.f9.offset = getOffset('f8') + map.f8.size
      return getOffset('f9')
    },

    findF10Offset() {
      map.f10.offset = getOffset('f9') + map.f9.size
      return getOffset('f10')
    },

    findF11Offset() {
      map.f11.offset = getOffset('f10') + map.f10.size
      return getOffset('f11')
    },

    findF13Offset() {
      // Sets F13 offset
      this.getPreferences()
      return getOffset('f13')
    },

    findF17Offset() {
      // Sets F17 offset
      this.getPreferences()
      return getOffset('f17')
    },

    getInventoryItems() {
      buffer = getBuffer()
      const numInventoryItems = this.getNumInventoryItems()
      const itemsStart = buffer.indexOf(M.F5_MARKER) + 0x80
      let currentOffset = itemsStart
      const items = []

      for (let i = 0; i < numInventoryItems; i += 1) {
        const [item, nextOffset] = readInventoryItem(currentOffset)
        currentOffset = nextOffset
        items.push(item)
      }

      map.f6.offset = currentOffset + 0x04

      return items
    },

    /**
     * Section: F17 (Preferences)
     * This function extracts preference settings.
     * It's mainly used to identify the offset of F17 as so to use that
     * offset to calculate other offsets such as F13 (player level & XP)
     * and F15 (traits).
     */
    getPreferences() {
      if (map.f17.offset > -1) {
        return getSectionData('f17')
      }

      buffer = getBuffer()
      map.f17.offset = map.f11.offset

      let offsetFound = false
      let searchOffset = map.f11.offset
      // Let searchOffset = 54_078 // F14
      let prefs: MT.MapF17Section

      // oxlint-disable-next-line unicorn/consistent-function-scoping
      const verifyValue = (value: number, min: number, max: number): boolean =>
        value >= min && value <= max

      /* Scan the save file to look for the pattern of F17 by looking for
       * sequentual integers within in the specified range. The preferences settings
       * will each be within a certain range so using this search pattern is very
       * efficient to identifying the F17 offset.
       */
      while (!offsetFound && searchOffset < buffer.byteLength - map.f17.size - 0x04) {
        prefs = getSectionData('f17', searchOffset)

        if (
          verifyValue(prefs.prefGameDifficulty, 0, 2) &&
          verifyValue(prefs.prefCombatDifficulty, 0, 2) &&
          verifyValue(prefs.prefViolenceLevel, 0, 3) &&
          verifyValue(prefs.prefTargetHighlight, 0, 2) &&
          verifyValue(prefs.prefCombatLooks, 0, 1) &&
          verifyValue(prefs.prefCombatMessages, 0, 1) &&
          verifyValue(prefs.prefCombatTaunts, 0, 1) &&
          verifyValue(prefs.prefLanguageFilter, 0, 1) &&
          verifyValue(prefs.prefRunning, 0, 1) &&
          verifyValue(prefs.prefSubtitles, 0, 1) &&
          verifyValue(prefs.prefItemHighlight, 0, 1) &&
          verifyValue(prefs.prefCombatSpeed, 0, 50) &&
          verifyValue(prefs.prefPlayerSpeedup, 0, 1) &&
          verifyValue(prefs.prefTextBaseDelay, 0, Number.MAX_SAFE_INTEGER) &&
          verifyValue(prefs.prefMasterVolume, 0, 32_767) &&
          verifyValue(prefs.prefMusicVolume, 0, 32_767) &&
          verifyValue(prefs.prefSndFxVolume, 0, 32_767) &&
          verifyValue(prefs.prefSpeechVolume, 0, 32_767) &&
          verifyValue(prefs.prefBrightness, 0, Number.MAX_SAFE_INTEGER) &&
          verifyValue(prefs.prefMouseSensitivity, 0, Number.MAX_SAFE_INTEGER)
        ) {
          const nonZeroValues = Object.values(prefs).filter(v => v !== 0)

          //  Brightness: 63132.8049,
          if (nonZeroValues.length > 0) {
            offsetFound = true
          }
        }

        if (!offsetFound) {
          searchOffset += 0x01
        }
      }

      if (!offsetFound) {
        throw new Error('f17.offset not found.')
      }

      map.f16.offset = searchOffset - map.f16.size
      map.f15.offset = map.f16.offset - map.f15.size
      map.f14.offset = map.f15.offset - map.f14.size
      map.f13.offset = map.f14.offset - map.f13.size
      map.f17.offset = searchOffset
    },

    setData(data) {
      setSectionData('header', data)
      setSectionData('f2', data)
      setSectionData('f5', data)
      setSectionData('f6', data)
      setSectionData('f7', data)
      setSectionData('f8', data)
      setSectionData('f9', data)
      setSectionData('f13', data)
      setSectionData('f15', data)
      setSectionData('f17', data)

      this.fromBase64(getBuffer().toString('base64'))
    },

    fromBase64(base64) {
      buffer = Buffer.from(base64, 'base64')
      saveData = createSaveData()
      map = M.createMap()

      map.f5.offset = buffer.indexOf(M.F5_MARKER)

      this.findF6Offset()
      this.findF7Offset()
      this.findF8Offset()
      this.findF9Offset()
      this.findF10Offset()
      this.findF11Offset()
      this.findF17Offset()

      getSectionData('header')
      getSectionData('f2')
      getSectionData('f5')
      getSectionData('f6')
      getSectionData('f7')
      getSectionData('f8')
      getSectionData('f9')
      getSectionData('f11')
      getSectionData('f13')
      getSectionData('f15')
      getSectionData('f17')

      return this
    },

    toBase64() {
      return getBuffer().toString('base64')
    },

    getData() {
      this.fromBase64(this.toBase64())
      return saveData
    },
  }
}
