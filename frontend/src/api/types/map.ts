/* eslint-disable @typescript-eslint/consistent-type-definitions */
import type { BaseAttributesValues, BonusAttributesValues } from './attributes'
import type { F17Preferences } from './f15-preferences'
import type { F6StatsBase, F6StatsBonus } from './f6-stats'
import type { GVARValues } from './gvar'
import type { KillValues } from './kill'
import type { PrefixedDictIndices } from './misc'
import type { PerkValues } from './perks'
import type { SkillValues } from './skills'

export type MapValueTypes = 'float' | 'int' | 'string'

export type MapKeyValueEntry = {
  name: string
  offset: number
  length: number
  kind: MapValueTypes
}

export type MapSection<T extends Record<string, any>> = {
  size: number
  offset: number
  keys: { [Key in keyof T]: MapKeyValueEntry }
}

export type MapHeaderSection = {
  gameVersion: string
  characterName: string
  saveName: string
  saveDay: number
  saveMonth: number
  saveYear: number
  inGameTime: number
}

export type MapF2Section = GVARValues

export type MapF5Section = {
  currentHP: number
  radiation: number
  poison: number
  crippled: number
  numInventoryItems: number
}

export type MapF6Section = F6StatsBase &
  F6StatsBonus &
  BaseAttributesValues &
  BonusAttributesValues &
  SkillValues

export type MapF6SkillsSection = SkillValues

export type MapF7Section = KillValues

export type MapF8Section = PrefixedDictIndices<
  '1' | '2' | '3' | '4',
  number | undefined,
  'taggedSkill'
>

export type MapF9Section = PerkValues
// export type MapF9Section = PerkValues

export type MapF13Section = {
  qtySkillPoints: number
  playerLevel: number
  playerXP: number
}

export type MapF15Section = PrefixedDictIndices<
  '1' | '2',
  number | undefined,
  'trait'
>

export type MapF17Section = F17Preferences

export interface MapInventory {
  qty: number
  id: string
  qtyContained: number
  meta: number
  ammoType: number
}

export interface SaveTypesMap {
  header: MapHeaderSection
  f2: MapF2Section
  f5: MapF5Section
  f6: MapF6Section
  f7: MapF7Section
  f8: MapF8Section
  f9: MapF9Section
  f13: MapF13Section
  f14: {}
  f15: MapF15Section
  f16: {}
  f17: MapF17Section
  // inventory: MapInventory
}

export type SaveMap = {
  [Key in keyof SaveTypesMap]: MapSection<SaveTypesMap[Key]>
}

export interface SaveGameData
  extends MapHeaderSection,
    MapF2Section,
    MapF5Section,
    MapF6Section,
    MapF7Section,
    MapF8Section,
    MapF9Section,
    MapF13Section,
    MapF15Section,
    MapF17Section {}
