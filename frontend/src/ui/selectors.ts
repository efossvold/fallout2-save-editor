import { addSeconds, differenceInYears, format } from 'date-fns'
import { createSelector } from 'reselect'
import { GVARS } from '../api/data/gvar'
import type { GVARValues } from '../api/types/gvar'
import type { KillValues } from '../api/types/kill'
import { PERKS } from '../api/data/perks'
import { ATTRIBUTES, BASE_ATTRIBUTES_NAMES } from '../api/data/attributes'
import { SKILLS, SKILL_COST_TABLES } from '../api/data/skills'
import type { AttributesValues } from '../api/types/attributes'
import type { SkillValues } from '../api/types/skills'
import type { TraitNames, TraitValues } from '../api/types/traits'
import { Crippled } from '../api/data/crippled'
import { TRAITS } from '../api/data/traits'
import * as U from '../api/utils'
import { ATTR_PREFIX, GAME_START_DATE } from './constants'
import type { StoreState } from './store'
import type { PerkValues } from '../api/types/perks'
import type { StatNames } from '../api/save-data'
import { KILLS } from '../api/data/kills'
import type { SaveGameData } from '../api/types/map'

const getState = (s: StoreState): StoreState => s
const getData = (s: StoreState): SaveGameData => s.data

// Calculate bonus/penalties from perks
// Adjustments from these perks are added
// to bonus value of the stat. Adjustments here are
// only for "live" view in editor, they are not saved.
export const calcValueFromPerk = createSelector(
  [getState, (s: StoreState, name: StatNames) => name],
  (s, name) => {
    // [Perk name, Affected stat, value of adjustment]
    const table: [keyof PerkValues, StatNames, number][] = [
      ['perkAlcoholLoweredHitPoints1', 'bonusHP', -2],
      ['perkAlcoholLoweredHitPoints2', 'bonusHP', -4],
      ['perkAlcoholRaisedHitPoints1', 'bonusHP', 2],
      ['perkAlcoholRaisedHitPoints2', 'bonusHP', 4],
      ['perkAutodocLoweredHitPoints1', 'bonusHP', -2],
      ['perkAutodocLoweredHitPoints2', 'bonusHP', -4],
      ['perkAutodocRaisedHitPoints1', 'bonusHP', 2],
      ['perkAutodocRaisedHitPoints2', 'bonusHP', 4],
      ['perkExpertExcrementExpeditor', 'skillSpeech', 5],
      ['perkLivingAnatomy', 'skillDoctor', 10],
      ['perkGainAgility', 'bonusAttrAgility', 1],
      ['perkGainCharisma', 'bonusAttrCharisma', 1],
      ['perkGainEndurance', 'bonusAttrEndurance', 1],
      ['perkGainIntelligence', 'bonusAttrIntelligence', 1],
      ['perkGainLuck', 'bonusAttrLuck', 1],
      ['perkGainPerception', 'bonusAttrPerception', 1],
      ['perkGainStrength', 'bonusAttrStrength', 1],
      ['perkGambler', 'skillGambling', 20],
      ['perkHarmless', 'skillSteal', 20],
      ['perkMasterThief', 'skillLockpick', 15],
      ['perkMasterThief', 'skillSteal', 15],
      ['perkMedic', 'skillDoctor', 10],
      ['perkMedic', 'skillFirstAid', 10],
      ['perkMrFixit', 'skillRepair', 10],
      ['perkMrFixit', 'skillScience', 10],
      ['perkNegotiator', 'skillBarter', 10],
      ['perkNegotiator', 'skillSpeech', 10],
      ['perkRanger', 'skillOutdoorsMan', 15],
      ['perkSalesman', 'skillBarter', 20],
      ['perkSpeaker', 'skillSpeech', 20],
      ['perkSurvivalist', 'skillOutdoorsMan', 25],
      ['perkThief', 'skillLockpick', 10],
      ['perkThief', 'skillSneak', 10],
      ['perkThief', 'skillSteal', 10],
      ['perkThief', 'skillTraps', 10],
      ['perkVaultCityInoculations', 'bonusPoisonResistance', 10],
      ['perkVaultCityInoculations', 'bonusRadiationResistance', 10],
      ['perkVaultCityTraining', 'skillDoctor', 5],
      ['perkVaultCityTraining', 'skillFirstAid', 5],
    ]

    const adjustedValues: number[] = []

    for (let i = 0; i < table.length; i += 1) {
      const [perkName, attr, adjustment] = table[i]

      if (attr === name) {
        const perkLevel = getPerk(s, perkName)
        if (perkLevel > 0) {
          adjustedValues.push(perkLevel * adjustment)
        }
      }
    }

    const sum = adjustedValues.reduce((acc, v) => acc + v, 0)
    return sum
  },
)

// Calculate bonus/penalties from traits
// Adjustments from these traits are added
// to bonus value of the stat. Adjustments here are
// only for "live" view in editor, they are not saved.
export const calcValueFromTrait = createSelector(
  [
    getState,
    (s: StoreState, name: StatNames, baseValue: number) => ({
      name,
      baseValue,
    }),
  ],
  (s, { name, baseValue }) => {
    // [Trait name, Affected stat(s), new value or fn calculating value, replace original value (don't derived)]
    const table: [
      TraitNames,
      StatNames | StatNames[],
      ((v: number) => number) | number,
      boolean,
    ][] = [
      ['bruiser', 'baseAttrStrength', 2, false],
      ['bruiser', 'baseAP', -2, false],
      ['fastMetabolism', 'baseHealingRate', 2, false],
      ['fastMetabolism', 'basePoisonResistance', 0, true],
      ['fastMetabolism', 'baseRadiationResistance', 0, true],
      ['finesse', 'baseCriticalChance', 10, false],
      ['heavyHanded', 'baseMeleeDmg', 4, false],
      ['kamikaze', 'baseSequence', 5, false],
      ['kamikaze', 'baseAC', 0, true],
      ['smallFrame', 'baseAttrAgility', 1, false],
      [
        'smallFrame',
        'baseCarryWeight',
        v => 25 + s.data.baseAttrStrength * 15,
        true,
      ],
      ['gifted', BASE_ATTRIBUTES_NAMES, 1, false],
      ['gifted', U.keysOf(SKILLS), -10, false],
      [
        'goodNatured',
        ['skillFirstAid', 'skillDoctor', 'skillSpeech', 'skillBarter'],
        15,
        false,
      ],
      [
        'goodNatured',
        [
          'skillSmallGuns',
          'skillBigGuns',
          'skillEnergyWeapons',
          'skillThrowing',
          'skillMeleeWeapons',
          'skillUnarmed',
        ],
        -10,
        false,
      ],
    ]

    const adjustedValues: number[] = []

    for (let i = 0; i < table.length; i += 1) {
      const [traitName, attr, calc, overrule] = table[i]
      let attrMatch = false

      if (Array.isArray(attr)) {
        attrMatch = attr.includes(name)
      } else {
        attrMatch = attr === name
      }

      if (attrMatch) {
        if (getTrait(s, traitName)) {
          const adjustment = typeof calc === 'number' ? calc : calc(baseValue)

          if (overrule) {
            return adjustment
          }

          adjustedValues.push(adjustment)
        }
      }
    }

    return adjustedValues.reduce((acc, v) => acc + v, baseValue)
  },
)

export const getACDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Armor_Class
   * Base value: Agility value
   * */
  const AC = getAttributeTotal(s, 'agility')
  return calcValueFromTrait(s, 'baseAC', AC)
})

export const getAPDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Action_Points
   * Base value: 5 + Agility / 2
   * */
  const AG = getAttributeTotal(s, 'agility')
  const AP = Math.floor(5 + AG / 2)
  return calcValueFromTrait(s, 'baseAP', AP)
})

export const getAttributesTotal = createSelector([getState], s => {
  const attrs = U.entries(ATTRIBUTES).reduce<AttributesValues>(
    (acc, [key]) => {
      const baseValue = calcValueFromTrait(
        s,
        U.prefixString(key, ATTR_PREFIX.BASE_ATTR),
        s.data[U.prefixString(key, ATTR_PREFIX.BASE_ATTR)],
      )
      acc[key] =
        baseValue +
        s.data[U.prefixString(key, ATTR_PREFIX.BONUS_ATTR)] +
        calcValueFromPerk(s, U.prefixString(key, ATTR_PREFIX.BONUS_ATTR))
      return acc
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as AttributesValues,
  )
  return attrs
})

export const getAttributeTotal = createSelector(
  [getState, (s: StoreState, name: keyof typeof ATTRIBUTES) => name],
  (s, name) => getAttributesTotal(s)[name],
)

export const getInGameTimeText = createSelector([getData], s =>
  // inGameTime stores the time
  // the number of seconds since July 25th 2241 00:00:00 multiplied by 10 (the number of 'ticks')
  // ! the number of seconds since December 5th 2161 00:00:00 multiplied by 10 (the number of 'ticks')
  // ! Fallout 1 starts at December 5th 2161
  format(addSeconds(GAME_START_DATE, s.inGameTime / 10), 'LLL dd yyyy HH:mm'),
)

export const getCarryWeightDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Melee_Damage
   * Base value: 25 + (Strength * 25)
   * */
  const ST = getAttributeTotal(s, 'strength')
  const CW = 25 + ST * 25
  return calcValueFromTrait(s, 'baseCarryWeight', CW)
})

export const getCriticalChanceDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Critical_Chance
   * Base value: Luck * 1%
   * */
  const CC = getAttributeTotal(s, 'luck')
  return calcValueFromTrait(s, 'baseCriticalChance', CC)
})

export const getHealingRateDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Healing_Rate
   * Base value: (1/3) * Endurance (minimum 1)
   * */
  const EN = getAttributeTotal(s, 'endurance')
  const HR = Math.floor(Math.max(1, (1 / 3) * EN))
  return calcValueFromTrait(s, 'baseHealingRate', HR)
})

export const getHPDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Sequence
   * Base value: 15 + Strength + Endurance x 2
   * */
  const ST = getAttributeTotal(s, 'strength')
  const EN = getAttributeTotal(s, 'endurance')
  const HP = 15 + ST + EN * 2
  return HP + calcValueFromPerk(s, 'bonusHP')
})

export const getGVARs = createSelector([getData], s =>
  U.entries(GVARS).reduce<GVARValues>(
    (acc, [key]) => {
      const name = U.prefixString(key, ATTR_PREFIX.GVAR)
      return {
        ...acc,
        [name]: s[name],
      }
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as GVARValues,
  ),
)

export const getHPTotal = createSelector(
  [getState],
  s => getHPDerived(s) + s.data.bonusHP,
)

export const getIsLimbCrippled = createSelector(
  [getData, (s: StoreState, bodyPart: keyof typeof Crippled) => bodyPart],
  (s, bodyPart) => U.bitTest(s.crippled, Crippled[bodyPart]),
)

export const getKills = createSelector([getData], s =>
  U.entries(KILLS).reduce<KillValues>(
    (acc, [key]) => {
      const name = U.prefixString(key, ATTR_PREFIX.KILL)
      return {
        ...acc,
        [name]: s[name],
      }
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as KillValues,
  ),
)

export const getMeleeDmgDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Melee_Damage
   * Base value: Strength - 5 (minimum 1)
   * */
  const ST = getAttributeTotal(s, 'strength')
  const DMG = Math.max(1, ST - 5)
  return calcValueFromTrait(s, 'baseMeleeDmg', DMG)
})

export const getPerks = createSelector([getData], s =>
  U.entries(PERKS).reduce<PerkValues>(
    (acc, [key]) => {
      const name = U.prefixString(key, ATTR_PREFIX.PERK)
      return {
        ...acc,
        [name]: s[name],
      }
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as PerkValues,
  ),
)

export const getPerk = createSelector(
  [getPerks, (s: StoreState, name: keyof PerkValues) => name],
  (perks, name) => perks[name],
)

export const getPlayerAge = createSelector([getData], s => {
  const { inGameTime, baseAge, bonusAge } = s
  const startTime = new Date(GAME_START_DATE)
  const nowTime = addSeconds(startTime, inGameTime / 10)
  return differenceInYears(nowTime, startTime) + baseAge + bonusAge
})

export const getSelectedTraits = createSelector([getData], s => [
  s.trait1 !== null ? s.trait1 : -1,
  s.trait2 !== null ? s.trait2 : -1,
])

export const getSequenceDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Sequence
   * Base value: 2 * Perception
   * */
  const PE = getAttributeTotal(s, 'perception')
  const SQ = PE * 2
  return calcValueFromTrait(s, 'baseSequence', SQ)
})

export const getPoisonResistanceDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Poison_Resistance
   * Base value: Endurance * 5
   * */
  const EN = getAttributeTotal(s, 'endurance')
  const PR = EN * 5
  return calcValueFromTrait(s, 'basePoisonResistance', PR)
})

export const getRadiationResistanceDerived = createSelector([getState], s => {
  /**
   * https://fallout.fandom.com/wiki/Radiation_Resistance
   * Base value: Endurance * 2
   * */
  const EN = getAttributeTotal(s, 'endurance')
  const RR = EN * 2
  return calcValueFromTrait(s, 'baseRadiationResistance', RR)
})

export const getSkillIsTagged = createSelector(
  [getData, (s: StoreState, name: keyof SkillValues) => name],
  (s, name) =>
    [s.taggedSkill1, s.taggedSkill2, s.taggedSkill3, s.taggedSkill4].includes(
      SKILLS[name].id,
    ),
)

export const getSkills = createSelector([getData], s => {
  const skills = U.entries(SKILLS).reduce<SkillValues>(
    (acc, [id]) => ({
      ...acc,
      [id]: s[id],
    }),
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as SkillValues,
  )
  return skills
})

export const getSkillTotal = createSelector(
  [getState, (s: StoreState, name: keyof SkillValues) => name],
  (s, name) => {
    /*
     * Skills formula for tag
     * https://wiki.fonline2.com/Category:Skills#Skill_expanding_costs
     */

    // -10 is from Gifted
    // +20 is from skilled being tagged
    // 23 is invested skills points from leveling
    // ( (5+ (4 * 9) + 20 ) -10 ) + (23 * 2)  = 101 (round up)
    const assignedPoints = s.data[name]

    const { baseValue, multiplier, associatedAttr1, associatedAttr2 } =
      SKILLS[name]

    // Tagged skills receive +20 at start and additionally
    // * 2 for every point invested (until > 100)
    const isTagged = getSkillIsTagged(s, name)

    const attrValue1 = getAttributeTotal(s, associatedAttr1)
    const attrValue2 = associatedAttr2
      ? getAttributeTotal(s, associatedAttr2)
      : 0

    let total = baseValue + multiplier * (attrValue1 + attrValue2)

    // All tagged skills receive +20 points at start
    if (isTagged) {
      total += 20
    }

    total = calcValueFromTrait(s, name, total)
    total += calcValueFromPerk(s, name)

    const startValue = Math.round(total)
    let skillPointsLeft = assignedPoints
    let done = false

    total = Math.round(total)

    const assignPoint = (costTable: number[][]): boolean => {
      let costIndex = -1
      for (let i = 0; i < costTable.length; i += 1) {
        if (total < costTable[i][1]) {
          costIndex = i
          break
        }
      }

      const left = skillPointsLeft - 1

      if (left >= 0) {
        total += costTable[costIndex][3]
        skillPointsLeft -= 1
      }

      return skillPointsLeft < 1 || left === -1
    }

    while (!done) {
      if (isTagged) {
        if (startValue % 2 === 0) {
          done = assignPoint(SKILL_COST_TABLES[0])
        } else if (startValue % 2 === 1) {
          done = assignPoint(SKILL_COST_TABLES[1])
        } else {
          throw Error('Unknown case when assigning skill point')
        }
      } else {
        done = assignPoint(SKILL_COST_TABLES[2])
      }
    }

    return Math.round(total)
  },
)

export const getSkillsTotal = createSelector([getState], s =>
  U.keysOf(SKILLS).reduce<SkillValues>(
    (acc, key) => ({
      ...acc,
      [key]: getSkillTotal(s, key),
    }),
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as SkillValues,
  ),
)

export const getTraits = createSelector([getData], s => {
  const selectedTraits = [s.trait1, s.trait2]

  const traits = U.entries(TRAITS).reduce<TraitValues>(
    (acc, [id, value]) => ({
      ...acc,
      [id]: selectedTraits.includes(value.id),
    }),
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as TraitValues,
  )

  return traits
})

export const getTrait = createSelector(
  [getTraits, (s: StoreState, name: TraitNames) => name],
  (traits, name) => traits[name],
)
