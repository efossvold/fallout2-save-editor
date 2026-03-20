import type { DictValues, PrefixedDictIndices } from '~/types'

import type { PERKS } from '../data/perks'
import type { MapKeyValueEntry } from './map'

export interface Perk {
  id: number
  name: string
  desc: string
  ranks: number
}

export type PerkValues = PrefixedDictIndices<keyof typeof PERKS, number, 'perk'>
export type PerksMap = DictValues<PerkValues, MapKeyValueEntry>
