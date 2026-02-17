import { createSelector } from 'reselect'

import { ATTRIBUTES, BASE_ATTRIBUTES_NAMES } from '../api/data/attributes'
import { Crippled } from '../api/data/crippled'
import { GVARS } from '../api/data/gvar'
import { KILLS } from '../api/data/kills'
import { PERKS } from '../api/data/perks'
import { SKILLS, SKILL_COST } from '../api/data/skills'
import { TRAITS } from '../api/data/traits'
import type { StatNames } from '../api/save-data'
import type { AttributesValues } from '../api/types/attributes'
import type { GVARValues } from '../api/types/gvar'
import type { KillValues } from '../api/types/kill'
import type { SaveGameData } from '../api/types/map'
import type { PerkValues } from '../api/types/perks'
import type { SkillValues } from '../api/types/skills'
import type { TraitNames, TraitValues } from '../api/types/traits'
import * as U from '../api/utils'

import { ATTR_PREFIX, GAME_START_DATE } from './constants'
import type { StoreState } from './store'

const getState = (s: StoreState): StoreState => s
const getData = (s: StoreState): SaveGameData => s.data

// Calculate bonus/penalties from perks
// Adjustments from these perks are added
// to bonus value of the stat. Adjustments here are
// only for "live" view in editor, they are not saved.
export const calcValueFromPerk = createSelector(
  [getState, (_: StoreState, name: StatNames) => name],
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

    for (const [perkName, attr, adjustment] of table) {
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
    (_: StoreState, name: StatNames) => name,
    (_: StoreState, _name: StatNames, baseValue: number) => baseValue,
  ],
  (s, name, baseValue) => {
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
      ['smallFrame', 'baseCarryWeight', 25 + s.data.baseAttrStrength * 15, true],
      ['gifted', BASE_ATTRIBUTES_NAMES, 1, false],
      ['gifted', U.keysOf(SKILLS), -10, false],
      ['goodNatured', ['skillFirstAid', 'skillDoctor', 'skillSpeech', 'skillBarter'], 15, false],
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

    for (const [traitName, attr, calc, overrule] of table) {
      let attrMatch = false

      attrMatch = Array.isArray(attr) ? attr.includes(name) : attr === name

      if (attrMatch && getTrait(s, traitName)) {
        const adjustment = typeof calc === 'number' ? calc : calc(baseValue)

        if (overrule) {
          return adjustment
        }

        adjustedValues.push(adjustment)
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
  const attrs = U.entries(ATTRIBUTES).reduce<AttributesValues>((acc, [key]) => {
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
  }, {} as AttributesValues)
  return attrs
})

export const getAttributeTotal = createSelector(
  [getState, (_: StoreState, name: keyof typeof ATTRIBUTES) => name],
  (s, name) => getAttributesTotal(s)[name],
)

export const getInGameTimeText = createSelector([getData], s => {
  // inGameTime stores the time
  // the number of seconds since July 25th 2241 00:00:00 multiplied by 10 (the number of 'ticks')
  // ! the number of seconds since December 5th 2161 00:00:00 multiplied by 10 (the number of 'ticks')
  // ! Fallout 1 starts at December 5th 2161
  const dt = U.parseDate(GAME_START_DATE.valueOf() + s.inGameTime * 100)
  return `${dt.month} ${dt.day} ${dt.year} ${dt.hour}:${dt.minute}`
})

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
  U.entries(GVARS).reduce<GVARValues>((acc, [key]) => {
    const name = U.prefixString(key, ATTR_PREFIX.GVAR)
    acc[name] = s[name]
    return acc
  }, {} as GVARValues),
)

export const getHPTotal = createSelector([getState], s => getHPDerived(s) + s.data.bonusHP)

export const getIsLimbCrippled = createSelector(
  [getData, (_: StoreState, bodyPart: keyof typeof Crippled) => bodyPart],
  (s, bodyPart) => U.bitTest(s.crippled, Crippled[bodyPart]),
)

export const getKills = createSelector([getData], s =>
  U.entries(KILLS).reduce<KillValues>((acc, [key]) => {
    const name = U.prefixString(key, ATTR_PREFIX.KILL)
    acc[name] = s[name]
    return acc
  }, {} as KillValues),
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
  U.entries(PERKS).reduce<PerkValues>((acc, [key]) => {
    const name = U.prefixString(key, ATTR_PREFIX.PERK)
    acc[name] = s[name]
    return acc
  }, {} as PerkValues),
)

export const getPerk = createSelector(
  [getPerks, (_: StoreState, name: keyof PerkValues) => name],
  (perks, name) => perks[name],
)

export const getPlayerAge = createSelector([getData], s => {
  const startTime = new Date(GAME_START_DATE)
  const startYear = U.parseDate(GAME_START_DATE).year
  const nowYear = U.parseDate(startTime.valueOf() + s.inGameTime * 100).year
  const elapsedYears = parseInt(nowYear) - parseInt(startYear)
  return elapsedYears + s.baseAge + s.bonusAge
})

export const getSelectedTraits = createSelector([getData], s => [s.trait1 ?? -1, s.trait2 ?? -1])

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

export const getTaggedSkills = createSelector(
  [getData],
  s => [s.taggedSkill1, s.taggedSkill2, s.taggedSkill3, s.taggedSkill4] as const,
)

export const getSkillIsTagged = createSelector(
  [getState, (_: StoreState, name: keyof SkillValues) => name],
  (s, name) => getTaggedSkills(s).includes(SKILLS[name].id),
)

export const getSkills = createSelector([getData], s => {
  const skills = U.entries(SKILLS).reduce<SkillValues>((acc, [id]) => {
    acc[id] = s[id]
    return acc
  }, {} as SkillValues)
  return skills
})

export const getSkillTotal = createSelector(
  [getState, (_: StoreState, name: keyof SkillValues) => name],
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

    const { baseValue, multiplier, associatedAttr1, associatedAttr2 } = SKILLS[name]

    // Tagged skills receive +20 at start and additionally
    // * 2 for every point invested (until > 100)
    const isTagged = getSkillIsTagged(s, name)

    const attrValue1 = getAttributeTotal(s, associatedAttr1)
    const attrValue2 = associatedAttr2 ? getAttributeTotal(s, associatedAttr2) : 0

    let totalSkillPoints = baseValue + multiplier * (attrValue1 + attrValue2)

    // All tagged skills receive +20 points at start
    if (isTagged) {
      totalSkillPoints += 20
    }

    totalSkillPoints = calcValueFromTrait(s, name, totalSkillPoints)
    totalSkillPoints += calcValueFromPerk(s, name)

    const startValue = Math.round(totalSkillPoints)
    let skillPointsLeft = assignedPoints
    let done = false

    totalSkillPoints = Math.round(totalSkillPoints)

    const assignPoint = (costTable: number[][]): boolean => {
      let costIndex = -1
      for (const [i, range] of costTable.entries()) {
        const rangeTotal = range.at(1) ?? 0

        console.assert(rangeTotal > 0, `rangeTotal value not found in SKILL_COST`, { rangeTotal })

        if (totalSkillPoints < rangeTotal) {
          costIndex = i
          break
        }
      }

      const left = skillPointsLeft - 1

      if (left >= 0) {
        const pointsToIncrease = costTable.at(costIndex)?.at(3) ?? 0

        console.assert(pointsToIncrease > 0, `pointsToIncrease value not found in SKILL_COST`, {
          pointsToIncrease,
        })

        totalSkillPoints += pointsToIncrease
        skillPointsLeft -= 1
      }

      return skillPointsLeft < 1 || left === -1
    }

    while (!done) {
      if (isTagged) {
        if (startValue % 2 === 0) {
          // skill is tagged, starting value is odd
          done = assignPoint(SKILL_COST.TAGGED_ODD)
        } else if (startValue % 2 === 1) {
          // skill is tagged, starting value is even
          done = assignPoint(SKILL_COST.TAGGED_EVEN)
        }
      } else {
        // skill is untagged, starting value doesn't matter
        done = assignPoint(SKILL_COST.UNTAGGED)
      }
    }

    return Math.round(totalSkillPoints)
  },
)

export const getSkillsTotal = createSelector([getState], s =>
  U.keysOf(SKILLS).reduce<SkillValues>((acc, key) => {
    acc[key] = getSkillTotal(s, key)
    return acc
  }, {} as SkillValues),
)

export const getTraits = createSelector([getData], s => {
  const selectedTraits = new Set([s.trait1, s.trait2])

  const traits = U.entries(TRAITS).reduce<TraitValues>((acc, [id, value]) => {
    acc[id] = selectedTraits.has(value.id)
    return acc
  }, {} as TraitValues)

  return traits
})

export const getTrait = createSelector(
  [getTraits, (_: StoreState, name: TraitNames) => name],
  (traits, name) => traits[name],
)
