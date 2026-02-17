import { ATTR_PREFIX } from "../ui/constants";

import { GVARS } from "./data/gvar";
import { KILLS } from "./data/kills";
import { PERKS } from "./data/perks";
import { SKILLS } from "./data/skills";
import type { GVARMap } from "./types/gvar";
import type { KillMap } from "./types/kill";
import type * as T from "./types/map";
import type { PerksMap } from "./types/perks";
import type { SkillMap } from "./types/skills";
import { entries, prefixString } from "./utils";

export const m = (
  name: string,
  offset: number,
  length: number,
  kind: T.MapValueTypes = "int",
): T.MapKeyValueEntry => ({
  name,
  offset,
  length,
  kind,
});

export const F5_MARKER = "\u0000\u0000\u0046\u0050";

export const INVENTORY_ALWAYS_ZERO = [
  m("", 0x0c, 0x04),
  m("", 0x10, 0x04),
  m("", 0x40, 0x04),
  m("", 0x4c, 0x04),
];

/**
 * See https://falloutmods.fandom.com/wiki/SAVE.DAT_File_Format
 * for SAVE.DAT File Format spec
 */
export const createMap = (): T.SaveMap => {
  const map: T.SaveMap = {
    header: {
      size: 0x75_63,
      offset: 0x0,
      keys: {
        gameVersion: m("Game version", 0x18, 0x04, "float"),
        characterName: m("", 0x1d, 0x20, "string"),
        saveName: m("", 0x3d, 0x1e, "string"),
        saveDay: m("", 0x5b, 0x02),
        saveMonth: m("", 0x5d, 0x02),
        saveYear: m("", 0x5f, 0x02),
        inGameTime: m("", 0x6b, 0x04),
      },
    },
    f2: {
      size: -1,
      offset: 0x75_67,
      keys: entries(GVARS).reduce<GVARMap>((acc, [key, value]) => {
        acc[prefixString(key, ATTR_PREFIX.GVAR)] = m(value.name, value.id * 0x04, 0x04);
        return acc;
      }, {} as GVARMap),
    },
    f5: {
      size: -1,
      offset: -1,
      keys: {
        numInventoryItems: m("", 0x48, 0x04),
        currentHP: m("", 0x74, 0x04),
        radiation: m("", 0x78, 0x04),
        poison: m("", 0x7c, 0x04),
        crippled: m("", 0x64, 0x04),
      },
    },
    f6: {
      size: 0x01_78,
      offset: -1,
      keys: {
        baseHP: m("", 0x24, 0x04),
        baseAP: m("", 0x28, 0x04),
        baseAC: m("", 0x2c, 0x04),
        baseMeleeDmg: m("", 0x34, 0x04),
        baseCarryWeight: m("", 0x38, 0x04),
        baseSequence: m("", 0x3c, 0x04),
        baseHealingRate: m("", 0x40, 0x04),
        baseCriticalChance: m("", 0x44, 0x04),
        baseCriticalHitTableRollModifider: m("", 0x48, 0x04),
        baseDmgThresholdNormal: m("", 0x4c, 0x04),
        baseDmgThresholdLaser: m("", 0x50, 0x04),
        baseDmgThresholdFire: m("", 0x54, 0x04),
        baseDmgThresholdPlasma: m("", 0x58, 0x04),
        baseDmgThresholdElectrical: m("", 0x5c, 0x04),
        baseDmgThresholdEMP: m("", 0x60, 0x04),
        baseDmgThresholdExplosive: m("", 0x64, 0x04),
        baseDmgResistanceNormal: m("", 0x68, 0x04),
        baseDmgResistanceLaser: m("", 0x6c, 0x04),
        baseDmgResistanceFire: m("", 0x70, 0x04),
        baseDmgResistancePlasma: m("", 0x74, 0x04),
        baseDmgResistanceElectrical: m("", 0x78, 0x04),
        baseDmgResistanceEMP: m("", 0x7c, 0x04),
        baseDmgResistanceExplosive: m("", 0x80, 0x04),
        baseRadiationResistance: m("", 0x84, 0x04),
        basePoisonResistance: m("", 0x88, 0x04),
        baseAge: m("", 0x8c, 0x04),
        baseGender: m("", 0x90, 0x04), // 0 = male, 1 = female
        bonusHP: m("", 0xb0, 0x04),
        bonusAP: m("", 0xb4, 0x04),
        bonusAC: m("", 0xb8, 0x04),
        bonusMeleeDmg: m("", 0xc0, 0x04),
        bonusCarryWeight: m("", 0xc4, 0x04),
        bonusSequence: m("", 0xc8, 0x04),
        bonusHealingRate: m("", 0xcc, 0x04),
        bonusCriticalChance: m("", 0xd0, 0x04),
        bonusCriticalHitTableRollModifider: m("", 0xd4, 0x04),
        bonusDmgThresholdNormal: m("", 0xd8, 0x04),
        bonusDmgThresholdLaser: m("", 0xdc, 0x04),
        bonusDmgThresholdFire: m("", 0xe0, 0x04),
        bonusDmgThresholdPlasma: m("", 0xe4, 0x04),
        bonusDmgThresholdElectrical: m("", 0xe8, 0x04),
        bonusDmgThresholdEMP: m("", 0xec, 0x04),
        bonusDmgThresholdExplosive: m("", 0xf0, 0x04),
        bonusDmgResistanceNormal: m("", 0xf4, 0x04),
        bonusDmgResistanceLaser: m("", 0xf8, 0x04),
        bonusDmgResistanceFire: m("", 0xfc, 0x04),
        bonusDmgResistancePlasma: m("", 0x01_00, 0x04),
        bonusDmgResistanceElectrical: m("", 0x01_04, 0x04),
        bonusDmgResistanceEMP: m("", 0x01_08, 0x04),
        bonusDmgResistanceExplosive: m("", 0x01_0c, 0x04),
        bonusRadiationResistance: m("", 0x01_10, 0x04),
        bonusPoisonResistance: m("", 0x01_14, 0x04),
        bonusAge: m("", 0x01_18, 0x04),
        bonusGender: m("", 0x01_1c, 0x04), // 0 = male, 1 = female

        baseAttrStrength: m("", 0x08, 0x04),
        baseAttrPerception: m("", 0x0c, 0x04),
        baseAttrEndurance: m("", 0x10, 0x04),
        baseAttrCharisma: m("", 0x14, 0x04),
        baseAttrIntelligence: m("", 0x18, 0x04),
        baseAttrAgility: m("", 0x1c, 0x04),
        baseAttrLuck: m("", 0x20, 0x04),

        bonusAttrStrength: m("", 0x94, 0x04),
        bonusAttrPerception: m("", 0x98, 0x04),
        bonusAttrEndurance: m("", 0x9c, 0x04),
        bonusAttrCharisma: m("", 0xa0, 0x04),
        bonusAttrIntelligence: m("", 0xa4, 0x04),
        bonusAttrAgility: m("", 0xa8, 0x04),
        bonusAttrLuck: m("", 0xac, 0x04),

        ...entries(SKILLS).reduce<SkillMap>((acc, [key, value]) => {
          acc[key] = m(value.name, 0x01_20 + value.id * 0x04, 0x04);
          return acc;
        }, {} as SkillMap),
      },
    },
    f7: {
      size: 0x4c,
      offset: -1,
      keys: entries(KILLS).reduce<KillMap>((acc, [key, value]) => {
        acc[prefixString(key, ATTR_PREFIX.KILL)] = m(value.name, value.id * 0x04, 0x04);
        return acc;
      }, {} as KillMap),
    },
    f8: {
      size: 0x10,
      offset: -1,
      keys: {
        taggedSkill1: m("", 0x00, 0x04),
        taggedSkill2: m("", 0x04, 0x04),
        taggedSkill3: m("", 0x08, 0x04),
        taggedSkill4: m("", 0x0c, 0x04),
      },
    },
    f9: {
      size: 0x02_c8,
      offset: -1,
      keys: entries(PERKS).reduce<PerksMap>((acc, [key, value]) => {
        acc[prefixString(key, ATTR_PREFIX.PERK)] = m(value.name, value.id * 0x04, 0x04);
        return acc;
      }, {} as PerksMap),
    },
    f10: {
      // In Fallout 2 v1.02d it is 0x3058 (decimal 12376) bytes.
      // Contains 119 (0x77) values for each party member (26 in Fallout 2)
      // 26 * 119 * 4 = 12376 bytes
      // https://fallout.wiki/wiki/Party.txt
      // Other version may have more: https://github.com/BGforgeNet/Fallout2_Restoration_Project/blob/master/data/data/party.txt
      size: 0x30_58,
      offset: -1,
      keys: {},
    },

    f11: {
      size: 0x04,
      offset: -1,
      keys: {
        combatStatus: m("", 0x00, 0x04),
        combatUnknown1: m("", 0x04, 0x10),
        combatUnknown2: m("", 0x14, 0x04),
        combatNumNPCs: m("", 0x18, 0x04),
        combatPlayerID: m("", 0x1c, 0x04),
        combatTurnOrder: m("", 0x20, 0x04),
        combatUnknown3: m("", 0x00, 0x10),
      },
    },

    f13: {
      size: 0x14,
      offset: -1,
      keys: {
        qtySkillPoints: m("", 0x00, 0x04),
        playerLevel: m("", 0x04, 0x04),
        playerXP: m("", 0x08, 0x04),
      },
    },
    f14: {
      size: 0x00,
      offset: -1,
      keys: {},
    },
    f15: {
      size: 0x08,
      offset: -1,
      keys: {
        trait1: m("", 0x00, 0x04),
        trait2: m("", 0x04, 0x04),
      },
    },
    f16: {
      size: 0x04,
      offset: -1,
      keys: {},
    },
    f17: {
      size: 0x50,
      offset: -1,
      keys: {
        prefGameDifficulty: m("", 0x00, 0x04),
        prefCombatDifficulty: m("", 0x04, 0x04),
        prefViolenceLevel: m("", 0x08, 0x04),
        prefTargetHighlight: m("", 0x0c, 0x04),
        prefCombatLooks: m("", 0x10, 0x04),
        prefCombatMessages: m("", 0x14, 0x04),
        prefCombatTaunts: m("", 0x18, 0x04),
        prefLanguageFilter: m("", 0x1c, 0x04),
        prefRunning: m("", 0x20, 0x04),
        prefSubtitles: m("", 0x24, 0x04),
        prefItemHighlight: m("", 0x28, 0x04),
        prefCombatSpeed: m("", 0x2c, 0x04),
        prefPlayerSpeedup: m("", 0x30, 0x04),
        prefTextBaseDelay: m("", 0x34, 0x04),
        prefMasterVolume: m("", 0x38, 0x04),
        prefMusicVolume: m("", 0x3c, 0x04),
        prefSndFxVolume: m("", 0x40, 0x04),
        prefSpeechVolume: m("", 0x44, 0x04),
        prefBrightness: m("", 0x48, 0x04),
        prefMouseSensitivity: m("", 0x4c, 0x04),
      },
    },
  };

  // Name all unnamed specs
  for (const section of Object.values(map)) {
    for (const [key, _value] of Object.entries(section)) {
      if (key === "keys") {
        for (const [name, spec] of Object.entries(section.keys)) {
          if (typeof spec === "object" && spec.name === "") {
            spec.name = name;
          }
        }
      }
    }
  }

  return map;
};

export const inventoryKeys = {
  qty: m("", 0x0, 0x04),
  id: m("", 0x30, 0x04),
  qtyContained: m("", 0x4c, 0x04),
  meta: m("", 0x5c, 0x04),
  ammoType: m("", 0x60, 0x04),
};
