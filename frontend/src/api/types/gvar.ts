import type { DictValues, PrefixedDictIndices } from '~/types'

import type { ATTR_PREFIX } from '../../ui/constants'
import type { GVARS } from '../data/gvar'
import type { MapKeyValueEntry } from './map'

export interface GVAR {
  id: number
  name: string
  desc: string
  maxValue?: number
}

export type GVARValues = PrefixedDictIndices<keyof typeof GVARS, number, ATTR_PREFIX.GVAR>
export type GVARMap = DictValues<GVARValues, MapKeyValueEntry>
