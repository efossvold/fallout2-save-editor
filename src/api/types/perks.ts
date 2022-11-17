import { PERKS } from '../data/perks'
import type { MapKeyValueEntry } from './map'
import type { DictValues, PrefixedDictIndices } from './misc'

export interface Perk {
  id: number
  name: string
  desc: string
  ranks: number
}

export type PerkValues = PrefixedDictIndices<keyof typeof PERKS, number, 'perk'>
export type PerksMap = DictValues<PerkValues, MapKeyValueEntry<number>>
