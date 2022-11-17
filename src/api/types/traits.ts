import { TRAITS } from '../data/traits'
import type { DictValues } from './misc'

export interface Trait {
  id: number
  name: string
  desc: string
}

export type TraitValues = DictValues<typeof TRAITS, boolean>
export type TraitNames = keyof TraitValues
