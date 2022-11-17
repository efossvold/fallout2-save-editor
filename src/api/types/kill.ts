import type { ATTR_PREFIX } from '../../ui/constants'
import { KILLS } from '../data/kills'
import type { MapKeyValueEntry } from './map'
import type { DictValues, PrefixedDictIndices } from './misc'

export interface Kill {
  id: number
  name: string
  desc: string
}

export type KillValues = PrefixedDictIndices<
  keyof typeof KILLS,
  number,
  ATTR_PREFIX.KILL
>
export type KillMap = DictValues<KillValues, MapKeyValueEntry<number>>
