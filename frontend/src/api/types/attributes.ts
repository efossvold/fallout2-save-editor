import type { ATTR_PREFIX } from '../../ui/constants'
import type { ATTRIBUTES } from '../data/attributes'
import type { DictValues, PrefixedDictIndices } from './misc'

export type AttributesNames =
  | 'strength'
  | 'perception'
  | 'endurance'
  | 'charisma'
  | 'intelligence'
  | 'agility'
  | 'luck'

export interface Attribute {
  id: number
  name: string
  short: string
  desc: string
}

export type AttributesValues = DictValues<typeof ATTRIBUTES, number>

export type BaseAttributesValues = PrefixedDictIndices<
  keyof typeof ATTRIBUTES,
  number,
  ATTR_PREFIX.BASE_ATTR
>

export type BonusAttributesValues = PrefixedDictIndices<
  keyof typeof ATTRIBUTES,
  number,
  ATTR_PREFIX.BONUS_ATTR
>
