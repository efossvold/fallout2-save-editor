import { Skill, SkillData } from '../types/skills'

const n = (skill: {
  id: Skill['id']
  n: Skill['name']
  val: Skill['baseValue']
  m: Skill['multiplier']
  attr1: Skill['associatedAttr1']
  attr2?: Skill['associatedAttr2']
  dsc: Skill['desc']
}): Skill => ({
  id: skill.id,
  name: skill.n,
  baseValue: skill.val,
  multiplier: skill.m,
  associatedAttr1: skill.attr1,
  associatedAttr2: skill.attr2,
  desc: skill.dsc,
})

export const SKILLS: SkillData = Object.freeze({
  skillSmallGuns: n({
    id: 0,
    n: 'Small Guns',
    val: 5,
    m: 4,
    attr1: 'agility',
    dsc: 'The use, care and general knowledge of small firearms - pistols, SMGs and rifles.',
  }),
  skillBigGuns: n({
    id: 1,
    n: 'Big Guns',
    val: 0,
    m: 2,
    attr1: 'agility',
    dsc: 'The operation and maintenance of really big guns - miniguns, rocket launchers, flamethrowers and such.',
  }),
  skillEnergyWeapons: n({
    id: 2,
    n: 'Energy Weapons',
    val: 0,
    m: 2,
    attr1: 'agility',
    dsc: 'The care and feeding of energy-based weapons. How to arm and operate weapons that use laser or plasma technology.',
  }),
  skillUnarmed: n({
    id: 3,
    n: 'Unarmed',
    val: 30,
    m: 2,
    attr1: 'agility',
    attr2: 'strength',
    dsc: 'A combination of martial arts, boxing and other hand-to-hand martial arts. Combat with your hands and feet.',
  }),
  skillMeleeWeapons: n({
    id: 4,
    n: 'Melee Weapons',
    val: 20,
    m: 2,
    attr1: 'agility',
    attr2: 'strength',
    dsc: 'Using non-ranged weapons in hand-to-hand or melee combat - knives, sledgehammers, spears, clubs and so on.',
  }),
  skillThrowing: n({
    id: 5,
    n: 'Throwing',
    val: 0,
    m: 4,
    attr1: 'agility',
    dsc: 'The skill of muscle-propelled ranged weapons, such as throwing knives, spears and grenades.',
  }),
  skillFirstAid: n({
    id: 6,
    n: 'First Aid',
    val: 0,
    m: 2,
    attr1: 'perception',
    attr2: 'intelligence',
    dsc: 'General healing skill. Used to heal small cuts, abrasions and other minor ills. In game terms, the use of first aid can heal more hit points over time than just rest.',
  }),
  skillDoctor: n({
    id: 7,
    n: 'Doctor',
    val: 5,
    m: 1,
    attr1: 'perception',
    attr2: 'intelligence',
    dsc: 'The healing of major wounds and crippled limbs. Without this skill, it will take a much longer period of time to restore crippled limbs to use.',
  }),
  skillSneak: n({
    id: 8,
    n: 'Sneak',
    val: 5,
    m: 3,
    attr1: 'agility',
    dsc: 'Quiet movement, and the ability to remain unnoticed. If successful, you will be much harder to locate. You cannot run and sneak at the same time.',
  }),
  skillLockpick: n({
    id: 9,
    n: 'Lockpick',
    val: 10,
    m: 1,
    attr1: 'agility',
    attr2: 'perception',
    dsc: 'The skill of opening locks without the proper key. The use of lockpicks or electronic lockpicks will greatly enhance this skill.',
  }),
  skillSteal: n({
    id: 10,
    n: 'Steal',
    val: 0,
    m: 3,
    attr1: 'agility',
    dsc: 'The ability to make things of others your own. Can be used to steal from people or places.',
  }),
  skillTraps: n({
    id: 11,
    n: 'Traps',
    val: 10,
    m: 1,
    attr1: 'agility',
    attr2: 'perception',
    dsc: 'The finding and removal of traps. Also the setting of explosives for demolition purposes.',
  }),
  skillScience: n({
    id: 12,
    n: 'Science',
    val: 0,
    m: 4,
    attr1: 'intelligence',
    dsc: 'Covers a variety of high-technology skills, such as computers, biology, physics, and geology.',
  }),
  skillRepair: n({
    id: 13,
    n: 'Repair',
    val: 0,
    m: 3,
    attr1: 'intelligence',
    dsc: 'The practical application of the Science skill, for fixing of broken equipment, machinery and electronics.',
  }),
  skillSpeech: n({
    id: 14,
    n: 'Speech',
    val: 0,
    m: 5,
    attr1: 'charisma',
    dsc: 'The ability to communicate in a practical and efficient manner. The skill of convincing others that your position is correct. The ability to lie and not get caught.',
  }),
  skillBarter: n({
    id: 15,
    n: 'Barter',
    val: 0,
    m: 4,
    attr1: 'charisma',
    dsc: 'Trading and trade-related tasks. The ability to get better prices for items you sell, and lower prices for items you buy.',
  }),
  skillGambling: n({
    id: 16,
    n: 'Gambling',
    val: 0,
    m: 5,
    attr1: 'luck',
    dsc: 'The knowledge and practical skills related to wagering. The skill at cards, dice and other games.',
  }),
  skillOutdoorsMan: n({
    id: 17,
    n: 'Outdoors Man',
    val: 0,
    m: 2,
    attr1: 'endurance',
    attr2: 'intelligence',
    dsc: 'Practical knowledge of the outdoors, and the ability to live off the land. The knowledge of plants and animals.',
  }),
})

// https://wiki.fonline2.com/Category:Skills#Skill_expanding_costs
export const SKILL_COST_TABLES = [
  // Case A (skill is tagged, starting value is odd)
  [
    [1, 100, 1, 2],
    [101, 127, 2, 2],
    [127, 151, 3, 2],
    [151, 177, 4, 2],
    [177, 201, 5, 2],
    [201, 300, 6, 2],
  ],
  // Case B (skill is tagged, starting value is even)
  [
    [1, 102, 1, 2],
    [102, 126, 2, 2],
    [126, 152, 3, 2],
    [152, 176, 4, 2],
    [176, 202, 5, 2],
    [202, 300, 6, 2],
  ],
  // Case C (skill is untagged, starting value doesn't matter)
  [
    [1, 101, 1, 1],
    [101, 126, 2, 1],
    [126, 151, 3, 1],
    [151, 176, 4, 1],
    [176, 201, 5, 1],
    [201, 300, 6, 1],
  ],
]
