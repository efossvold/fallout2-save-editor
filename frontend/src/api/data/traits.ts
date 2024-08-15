import type { Trait } from '../types/traits'

const n = (perk: Trait): Trait => perk

export const TRAITS = {
  fastMetabolism: n({
    id: 0,
    name: 'Fast Metabolism',
    desc: 'Your metabolic rate is twice normal. This means that you are much less resistant to radiation and poison, but your body heals faster. Healing rate +2. Radiation and poison resistances = 0',
  }),
  bruiser: n({
    id: 1,
    name: 'Bruiser',
    desc: 'A little slower, but a little bigger. You may not hit as often, but they will feel it when you do! Your total action points are lowered, but your Strength is increased. ST +2. Action Points -2',
  }),
  smallFrame: n({
    id: 2,
    name: 'Small Frame',
    desc: "You are not quite as big as the other villagers, but that never slowed you down. You can't carry as much, but you are more agile. AG +1. Carry weight is calculated as 25 + Strength * 15",
  }),
  oneHander: n({
    id: 3,
    name: 'One Hander',
    desc: 'One of your hands is very dominant. You excel with single-handed weapons, but two-handed weapons cause a problem. Increased chance to hit with one-handed weapons (by 20%). Decreased chance to hit with two-handed weapons (by 40%)',
  }),
  finesse: n({
    id: 4,
    name: 'Finesse',
    desc: 'Your attacks show a lot of finesse. You dont do as much damage, but you cause more critical hits. Critical chance +10%, +30% DR to all attacks',
  }),
  kamikaze: n({
    id: 5,
    name: 'Kamikaze',
    desc: 'By not paying attention to any threats, you can act a lot faster in a turn. This lowers your armor class to just what you are wearing, but you sequence much faster in a combat turn. Sequence +5. Armor Class = 0.',
  }),
  heavyHanded: n({
    id: 6,
    name: 'Heavy Handed',
    desc: 'You swing harder, not better. Your attacks are very brutal, but lack finesse. You rarely cause a good critical, but you always do more melee damage. Melee damage +4. -30 penalty to critical hit table rolls.',
  }),
  fastShot: n({
    id: 7,
    name: 'Fast Shot',
    desc: "You don't have time to aim for a targeted attack, because you attack faster than normal people. It costs you one less action point for guns and thrown weapons. -1 Action Point required to fire. Aimed shots are disabled.",
  }),
  bloodyMess: n({
    id: 8,
    name: 'Bloody Mess',
    desc: 'By some strange twist of fate, people around you die violently. You always see the worst way a person can die.',
  }),
  jinxed: n({
    id: 9,
    name: 'Jinxed',
    desc: 'The good thing is that everyone around you has more critical failures in combat, the bad thing is so do you! All misses have a 50% chance to be "upgraded" to a critical failure. That includes other NPCs too.',
  }),
  goodNatured: n({
    id: 10,
    name: 'Good Natured',
    desc: 'You studied less-combative skills as you were growing up. Your combat skills start at a lower level, but First Aid, Doctor, Speech and Barter are substantially improved. +15 First Aid, Doctor, Speech and Barter. -10 Small Guns, Big Guns, Energy Weapons, Unarmed, Melee Weapons and Throwing',
  }),
  chemReliant: n({
    id: 11,
    name: 'Chem Reliant',
    desc: 'You are more easily addicted to chems. Your chance to be addicted by chem use is twice normal, but you recover faster from their ill effects. Addiction time reduced by 50%. ',
  }),
  chemResistant: n({
    id: 12,
    name: 'Chem Resistant',
    desc: 'Chems only affect you half as long as normal, but your chance to be addicted is also only 50% of normal Chem affect duration reduced by 50%. Addiction chance reduced by 50%..',
  }),
  sexAppeal: n({
    id: 13,
    name: 'Sex Appeal',
    desc: 'You\'ve got the "right" stuff. Members of the opposite sex are attracted to you, but those of the same sex tend to become quite jealous. Sex appeal value raised for NPCs of opposite gender; reduced for same gender. No obvious penalties; used in many script checks',
  }),
  skilled: n({
    id: 14,
    name: 'Skilled',
    desc: 'Since you spent more time improving your skills than a normal person, you gain 5 additional skill points per experience level. The tradeoff is that you do not gain as many extra abilities. Perk gain every 4th level instead of every 3rd.',
  }),
  gifted: n({
    id: 15,
    name: 'Gifted',
    desc: 'You have more innate abilities than most, so you have not spent as much time honing your skills. Your primary statistics are each +1, but you lose -10% on all skills to start, and receive 5 less skill points per level.',
  }),
} as const
