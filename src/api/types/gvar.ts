import type { ATTR_PREFIX } from '../../ui/constants'
import { GVARS } from '../data/gvar'
import type { MapKeyValueEntry } from './map'
import type { DictValues, PrefixedDictIndices } from './misc'

export interface GVAR {
  id: number
  name: string
  desc: string
  maxValue: number | null
}

export type GVARValues = PrefixedDictIndices<
  keyof typeof GVARS,
  number,
  ATTR_PREFIX.GVAR
>
export type GVARMap = DictValues<GVARValues, MapKeyValueEntry<number>>
