import type { TRAITS } from '../data/traits'

export interface Trait {
  id: number
  name: string
  desc: string
}

export type TraitValues = { -readonly [Key in keyof typeof TRAITS]: boolean }
export type TraitNames = keyof TraitValues
