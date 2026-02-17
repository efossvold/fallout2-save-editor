import { ATTR_PREFIX } from "../ui/constants";

import { ATTRIBUTES } from "./data/attributes";
import { GVARS } from "./data/gvar";
import { KILLS } from "./data/kills";
import { PERKS } from "./data/perks";
import { SKILLS } from "./data/skills";
import { createMap } from "./map";
import type { BaseAttributesValues, BonusAttributesValues } from "./types/attributes";
import type { F17Preferences } from "./types/f17-preferences";
import type { GVARValues } from "./types/gvar";
import type { KillValues } from "./types/kill";
import type { SaveGameData } from "./types/map";
import type { PerkValues } from "./types/perks";
import type { SkillValues } from "./types/skills";
import { entries, prefixString } from "./utils";

const map = createMap();

export type StatNames = keyof ReturnType<typeof createSaveData>;

export const createSaveData = (): SaveGameData => ({
  // Header
  gameVersion: "",
  characterName: "",
  saveName: "",
  saveDay: 0,
  saveMonth: 0,
  saveYear: 0,
  inGameTime: 0,

  // F2 GVARs
  ...entries(GVARS).reduce<GVARValues>((acc, [key]) => {
    acc[prefixString(key, ATTR_PREFIX.GVAR)] = 0;
    return acc;
  }, {} as GVARValues),

  // F5
  currentHP: 0,
  radiation: 0,
  poison: 0,
  crippled: 0,
  numInventoryItems: 0,

  // F6
  baseHP: 0,
  baseAP: 0,
  baseAC: 0,
  baseMeleeDmg: 0,
  baseCarryWeight: 0,
  baseSequence: 0,
  baseHealingRate: 0,
  baseCriticalChance: 0,
  baseCriticalHitTableRollModifider: 0,
  baseDmgThresholdNormal: 0,
  baseDmgThresholdLaser: 0,
  baseDmgThresholdFire: 0,
  baseDmgThresholdPlasma: 0,
  baseDmgThresholdElectrical: 0,
  baseDmgThresholdEMP: 0,
  baseDmgThresholdExplosive: 0,
  baseDmgResistanceNormal: 0,
  baseDmgResistanceLaser: 0,
  baseDmgResistanceFire: 0,
  baseDmgResistancePlasma: 0,
  baseDmgResistanceElectrical: 0,
  baseDmgResistanceEMP: 0,
  baseDmgResistanceExplosive: 0,
  baseRadiationResistance: 0,
  basePoisonResistance: 0,
  baseAge: 0,
  baseGender: 0, // 0 = male, 1 = female
  bonusHP: 0,
  bonusAP: 0,
  bonusAC: 0,
  bonusMeleeDmg: 0,
  bonusCarryWeight: 0,
  bonusSequence: 0,
  bonusHealingRate: 0,
  bonusCriticalChance: 0,
  bonusCriticalHitTableRollModifider: 0,
  bonusDmgThresholdNormal: 0,
  bonusDmgThresholdLaser: 0,
  bonusDmgThresholdFire: 0,
  bonusDmgThresholdPlasma: 0,
  bonusDmgThresholdElectrical: 0,
  bonusDmgThresholdEMP: 0,
  bonusDmgThresholdExplosive: 0,
  bonusDmgResistanceNormal: 0,
  bonusDmgResistanceLaser: 0,
  bonusDmgResistanceFire: 0,
  bonusDmgResistancePlasma: 0,
  bonusDmgResistanceElectrical: 0,
  bonusDmgResistanceEMP: 0,
  bonusDmgResistanceExplosive: 0,
  bonusRadiationResistance: 0,
  bonusPoisonResistance: 0,
  bonusAge: 0,
  bonusGender: 0, // 0 = male, 1 = female

  ...entries(ATTRIBUTES).reduce<BaseAttributesValues>((acc, [key]) => {
    acc[prefixString(key, ATTR_PREFIX.BASE_ATTR)] = 0;
    return acc;
  }, {} as BaseAttributesValues),

  ...entries(ATTRIBUTES).reduce<BonusAttributesValues>((acc, [key]) => {
    acc[prefixString(key, ATTR_PREFIX.BONUS_ATTR)] = 0;
    return acc;
  }, {} as BonusAttributesValues),

  ...entries(SKILLS).reduce<SkillValues>((acc, [key]) => {
    acc[key] = 0;
    return acc;
  }, {} as SkillValues),

  // F7 Kills
  ...entries(KILLS).reduce<KillValues>((acc, [key]) => {
    acc[prefixString(key, ATTR_PREFIX.KILL)] = 0;
    return acc;
  }, {} as KillValues),

  // F8 Tags
  taggedSkill1: -1,
  taggedSkill2: -1,
  taggedSkill3: -1,
  taggedSkill4: -1,

  /**
   * F9 Perks
   */
  ...entries(PERKS).reduce<PerkValues>((acc, [key]) => {
    acc[prefixString(key, ATTR_PREFIX.PERK)] = 0;
    return acc;
  }, {} as PerkValues),

  // F11 Combat
  combatStatus: -1,
  combatUnknown1: 0,
  combatUnknown2: 10,
  combatNumNPCs: 10,
  combatPlayerID: 1,
  combatTurnOrder: 124,
  combatUnknown3: 0,

  // F13 Player/level/XP
  qtySkillPoints: 0,
  playerLevel: 0,
  playerXP: 0,

  // F15 Traits
  trait1: -1,
  trait2: -1,

  /**
   * F17 Preferences
   */
  ...entries(map.f17.keys).reduce<F17Preferences>((acc, [key]) => {
    acc[key] = 0;
    return acc;
  }, {} as F17Preferences),
});
