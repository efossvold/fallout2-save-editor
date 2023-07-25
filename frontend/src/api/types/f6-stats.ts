import type { PrefixedDictIndices } from './misc'

export type F6StatsNames =
  | 'HP'
  | 'AP'
  | 'AC'
  | 'MeleeDmg'
  | 'CarryWeight'
  | 'Sequence'
  | 'HealingRate'
  | 'CriticalChance'
  | 'CriticalHitTableRollModifider'
  | 'DmgThresholdNormal'
  | 'DmgThresholdLaser'
  | 'DmgThresholdFire'
  | 'DmgThresholdPlasma'
  | 'DmgThresholdElectrical'
  | 'DmgThresholdEMP'
  | 'DmgThresholdExplosive'
  | 'DmgResistanceNormal'
  | 'DmgResistanceLaser'
  | 'DmgResistanceFire'
  | 'DmgResistancePlasma'
  | 'DmgResistanceElectrical'
  | 'DmgResistanceEMP'
  | 'DmgResistanceExplosive'
  | 'RadiationResistance'
  | 'PoisonResistance'
  | 'age'
  | 'gender'
// 0 = male, 1 = female

export type F6StatsBase = PrefixedDictIndices<F6StatsNames, number, 'base'>
export type F6StatsBonus = PrefixedDictIndices<F6StatsNames, number, 'bonus'>
