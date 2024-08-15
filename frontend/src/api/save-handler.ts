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
  let buffer: Buffer
  const isDebug = args?.isDebug ?? false
  const map = M.createMap()
  const saveData = createSaveData()

  const logger = (...text: any[]): void => {
    if (isDebug) {
      console.log(...text)
    }
  }

  // const gameStartDate = new Date(2241, 6, 25)

  const getOffset = (
    sectionName: keyof MT.SaveMap,
    errMsg?: string,
  ): number => {
    const { offset } = map[sectionName]
    if (offset === null || offset < 0) {
      throw Error(errMsg || `Could not find '${sectionName}' offset`)
    }
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
    return Object.entries(section.keys).reduce<SectionGetters>(
      (getters, [key, entry]) => {
        // @ts-ignore
        getters[`get${prefix}${U.ucFirstChar(key)}`] = () =>
          getValue(
            getOffset(sectionName),
            // @ts-ignore
            section.keys[key],
          )
        return getters
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as SectionGetters,
    )
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
    return Object.entries(section.keys).reduce<SectionSetters>(
      (setters, [key, entry]) => {
        // @ts-ignore
        setters[`set${prefix}${U.ucFirstChar(key)}`] = (value: any) =>
          setValue(
            getOffset(sectionName),
            // @ts-ignore
            section.keys[key],
            value,
          )
        return setters
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as SectionSetters,
    )
  }

  const getValue = <
    Entry extends MT.MapKeyValueEntry<any>,
    ReturnValue = Entry['type'],
  >(
    sectionOffset: number | keyof MT.SaveMap,
    entry: Entry,
  ): ReturnValue => {
    if (typeof sectionOffset === 'string') {
      sectionOffset = getOffset(sectionOffset)
    }

    const { kind, length } = entry
    const offset = sectionOffset + entry.offset

    if (!buffer) {
      throw Error('Buffer not initialized.')
    }

    if (kind === 'float') {
      // Can only read game version
      const n1 = buffer.readUInt8(offset)
      const n2 = buffer.readUInt8(offset + 0x01)
      const e1 = buffer.readUInt8(offset + 0x02)
      const e2 = buffer.readUInt8(offset + 0x03)
      return parseFloat(`${n1}${n2}.${e1}${e2}`) as any
    }

    if (kind === 'int') {
      return buffer.readIntBE(offset, length) as any
    }

    if (kind === 'string') {
      return [...new Array(length)]
        .map((_, i) => String.fromCharCode(buffer[offset + i]))
        .join('') as any
    }
    throw Error(`No read handler defined for kind ${kind}`)
  }

  const setValue = <
    Entry extends MT.MapKeyValueEntry<any>,
    ValueType = Entry['type'],
  >(
    sectionOffset: number,
    entry: Entry,
    value: ValueType,
  ): void => {
    const { kind, length } = entry
    const offset = sectionOffset + entry.offset

    if (!buffer) {
      throw Error('Buffer not initialized.')
    }

    if (kind === 'float') {
      // console.log(`Float write not implemented (${entry.name})`)
    } else if (kind === 'int') {
      if (+value < 0) {
        buffer.writeIntBE(+value, offset, length)
      } else {
        buffer.writeUIntBE(+value, offset, length)
      }
    } else if (kind === 'string') {
      const strValue = String(value)
      for (let i = 0; i < length; i += 1) {
        const char = i < strValue.length ? strValue.at(i)?.charCodeAt(0) : 0
        buffer.writeUInt8(char || 0, offset + i)
      }
    } else {
      throw Error(`No write handler defined for type ${kind}`)
    }
  }

  const getSectionData = <
    SectionName extends keyof MT.SaveMap,
    ReturnType = MT.SaveTypesMap[SectionName],
  >(
    sectionName: SectionName,
    customOffset?: number,
  ): ReturnType => {
    // logger('getSectionData', sectionName)

    const offset = customOffset || getOffset(sectionName)
    return Object.entries(map[sectionName].keys).reduce(
      (acc: ReturnType, [key, entry]) => {
        const value = getValue(offset, entry as any)

        // @ts-ignore
        saveData[key] = value

        // @ts-ignore
        acc[key] = value
        return acc
      },
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      {} as ReturnType,
    )
  }

  const setSectionData = <SectionName extends keyof MT.SaveMap>(
    sectionName: SectionName,
    data: MT.SaveGameData,
  ): void => {
    logger('setSectionData', sectionName)
    const offset = getOffset(sectionName)
    U.entries(map[sectionName].keys).forEach(([key, spec]) => {
      // @ts-ignore
      const value = data[key]
      setValue(offset, spec, value)
    })
  }

  const readInventoryItem = (offset: number): [InventoryItem, number] => {
    // number of fields * field size
    const itemSize = 0x58 + 0x04
    const itemId = getValue(offset, M.inventoryKeys.id)
    const item = ITEMS[itemId.toString()]

    if (!item) {
      throw Error(
        `Found unknown item id (${itemId}). Editing this file will corrupt it.`,
      )
    }

    const qty = getValue(offset, M.inventoryKeys.qty)
    const qtyContained = getValue(offset, M.inventoryKeys.qtyContained)
    const category = getCategory(item)

    let nextOffset = offset + itemSize

    if (category === ItemCategory.WEAPON) {
      // 0x5c (loaded rounds)
      nextOffset += 0x04
      // 0x60 (ammo type)
      nextOffset += 0x04
    } else if (category === ItemCategory.AMMO) {
      // 0x5c (amount of rounds)
      nextOffset += 0x04
    } else if (category === ItemCategory.MISC) {
      // 0x5c (meta info)
      nextOffset += 0x04
    }

    for (let i = 0; i < M.INVENTORY_ALWAYS_ZERO.length; i += 1) {
      const value = getValue(offset, M.INVENTORY_ALWAYS_ZERO[i])
      if (value !== 0) {
        throw Error(`Possible invalid/corrupt item with ID '${itemId}'. `)
      }
    }

    return [
      {
        id: itemId.toString(),
        qty,
        desc: ITEMS[itemId].desc,
        category: ItemCategory[category].toLocaleLowerCase(),
        qtyContained,
      },
      nextOffset,
    ]
  }

  return {
    ...createGetters('header'),
    ...createSetters('header'),
    // Player and inventory
    ...createGetters('f5'),
    ...createSetters('f5'),
    // Player stats
    ...createGetters('f6'),
    ...createSetters('f6'),
    // Tag skills
    ...createGetters('f8'),
    ...createSetters('f8'),
    // Perks
    ...createGetters('f9', 'Perk'),
    ...createSetters('f9', 'Perk'),
    // Experience and level
    ...createGetters('f13'),
    ...createSetters('f13'),
    // Traits
    ...createGetters('f15'),
    ...createSetters('f15'),
    // Preferences
    ...createGetters('f17'),
    ...createSetters('f17'),

    fromBase64(base64: string) {
      buffer = Buffer.from(base64, 'base64')

      map.f5.offset = buffer.indexOf(M.F5_MARKER)
      map.f6.offset = null
      map.f7.offset = null
      map.f8.offset = null
      map.f9.offset = null
      map.f17.offset = null

      this.findF6Offset()
      this.findF7Offset()
      this.findF8Offset()
      this.findF9Offset()
      this.findF17Offset()

      getSectionData('header')
      getSectionData('f2')
      getSectionData('f5')
      getSectionData('f6')
      getSectionData('f7')
      getSectionData('f8')
      getSectionData('f9')
      getSectionData('f13')
      getSectionData('f15')
      getSectionData('f17')
    },

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

    // /**
    //  * Section: F17 (Preferences)
    //  * This function extracts preference settings.
    //  * It's mainly used to identify the offset of F17 as so to use that
    //  * offset to calculate other offsets such as F13 (player level & XP)
    //  * and F15 (traits).
    //  */
    getPreferences() {
      if (map.f17.offset) {
        return getSectionData('f17')
      }

      map.f17.offset = getOffset('f9') + map.f17.size

      let offsetFound = false
      let searchOffset = getOffset('f9') + map.f9.size
      let prefs: MT.MapF17Section

      const verifyValue = (value: number, min: number, max: number): boolean =>
        value >= min && value <= max

      /* Scan the save file to look for the pattern of F17 by looking for
       * sequentual integers within in the specified range. The preferences settings
       * will each be within a certain range so using this search pattern is very
       * efficient to identifying the F17 offset.
       */
      while (
        !offsetFound &&
        searchOffset < buffer.byteLength - map.f17.size - 0x04
      ) {
        prefs = getSectionData('f17', searchOffset)

        if (
          verifyValue(prefs.prefGameDifficulty, 1, 1) &&
          verifyValue(prefs.prefCombatDifficulty, 1, 1) &&
          verifyValue(prefs.prefViolenceLevel, 3, 3) &&
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
          // verifyValue(data.textBaseDelay, 0.0, 6.0) &&
          verifyValue(prefs.prefTextBaseDelay, 0.0, Number.MAX_SAFE_INTEGER) &&
          verifyValue(prefs.prefMasterVolume, 0, 32767) &&
          verifyValue(prefs.prefMusicVolume, 0, 32767) &&
          verifyValue(prefs.prefSndFxVolume, 0, 32767) &&
          verifyValue(prefs.prefSpeechVolume, 0, 32767) &&
          // verifyValue(data.brightness, 0, 1.18) &&
          verifyValue(prefs.prefBrightness, 0, Number.MAX_SAFE_INTEGER) &&
          // verifyValue(data.mouseSensitivity, 0, 2.5)
          verifyValue(prefs.prefMouseSensitivity, 0, Number.MAX_SAFE_INTEGER)
        ) {
          const nonZeroValues = Object.values(prefs).filter(v => v !== 0)

          //  brightness: 63132.8049,
          if (nonZeroValues.length !== 0) {
            offsetFound = true
          }
        }

        if (!offsetFound) {
          searchOffset += 0x01
        }
      }

      if (!offsetFound || !saveData) {
        throw Error('f17.offset not found.')
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

      this.fromBase64(buffer.toString('base64'))
    },

    toBase64() {
      return buffer.toString('base64')
    },

    getData() {
      return { ...saveData }
    },
  }
}
