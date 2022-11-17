import { ATTR_PREFIX } from '../../ui/constants'
import type { Attribute } from '../types/attributes'
import { keysOf, prefixString } from '../utils'

const n = (attr: Attribute): Attribute => attr

export const ATTRIBUTES = {
  strength: n({
    id: 0,
    name: 'Strength',
    short: 'ST',
    desc: 'Raw physical strength. A high strength is good for physical characters. Modifies: Hit Points, Melee Damage and Carry Weight.',
  }),
  perception: n({
    id: 1,
    name: 'Perception',
    short: 'PE',
    desc: 'The ability to see, hear, taste and notice unusual things. A high perception is important for a sharpshooter. Modifies: Sequence and ranged combat distance modifiers.',
  }),
  endurance: n({
    id: 2,
    name: 'Endurance',
    short: 'EN',
    desc: 'Stamina and physical toughness. A character with a high endurance will survive where others may not. Modifies: Hit Points, Poison and Radiation resistance, Healing Rate, and the additional hit points per level.',
  }),
  charisma: n({
    id: 3,
    name: 'Charisma',
    short: 'CH',
    desc: 'A combination of appearance and charm. A high charisma is important for characters that want to influence people with words. Modifies: NPC reactions and barter prices.',
  }),
  intelligence: n({
    id: 4,
    name: 'Intelligence',
    short: 'IN',
    desc: 'Knowledge, wisdom and the ability to think quickly. A high Intelligence is important for any character. Modifies: the number of new skill points per level, dialogue options, and many skills.',
  }),
  agility: n({
    id: 5,
    name: 'Agility',
    short: 'AG',
    desc: 'Coordination and the ability to move swiftly. A high agility is important for any active character. Modifies: Action Points, Armor Class, Sequence and many skills.',
  }),
  luck: n({
    id: 6,
    name: 'Luck',
    short: 'LK',
    desc: 'Fate. Karma. An extremely high or low Luck will affect the character - somehow. Events and situations will be changed by how lucky (or unlucky) your character is.',
  }),
}

export const BASE_ATTRIBUTES_NAMES = keysOf(ATTRIBUTES).map(n =>
  prefixString(n, ATTR_PREFIX.BASE_ATTR),
)
