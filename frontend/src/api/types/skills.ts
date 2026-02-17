import type { SKILLS } from '../data/skills'

import type { AttributesValues } from './attributes'
import type { MapKeyValueEntry } from './map'
import type { DictValues, UnionToDict } from './misc'

export type SkillNames =
  | 'smallGuns'
  | 'bigGuns'
  | 'energyWeapons'
  | 'unarmed'
  | 'meleeWeapons'
  | 'throwing'
  | 'doctor'
  | 'firstAid'
  | 'sneak'
  | 'lockpick'
  | 'steal'
  | 'traps'
  | 'science'
  | 'repair'
  | 'speech'
  | 'barter'
  | 'gambling'
  | 'outdoorsMan'

export type SkillData = UnionToDict<SkillNames, Skill, 'skill'>

export interface Skill {
  id: number
  name: string
  baseValue: number
  multiplier: number
  associatedAttr1: keyof AttributesValues
  associatedAttr2?: keyof AttributesValues
  desc: string
}

export type SkillValues = { [Key in keyof typeof SKILLS]: number }
export type SkillMap = DictValues<SkillValues, MapKeyValueEntry>
