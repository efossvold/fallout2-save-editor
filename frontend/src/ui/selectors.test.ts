import { describe, expect, it } from "vitest";
import * as S from "./selectors";
import { STORE_STATE_FIXTURE as STORE_STATE } from "./fixtures/state-fixture";

describe("selectors", () => {
  it("getACDerived", () => {
    expect(S.getACDerived(STORE_STATE)).toBe(10);
  });

  it("getAPDerived", () => {
    expect(S.getAPDerived(STORE_STATE)).toBe(10);
  });

  it("getAttributesTotal", () => {
    expect(S.getAttributesTotal(STORE_STATE)).toStrictEqual({
      agility: 10,
      charisma: 6,
      endurance: 4,
      intelligence: 10,
      luck: 8,
      perception: 9,
      strength: 7,
    });
  });

  it("getAttributeTotal", () => {
    expect(S.getAttributeTotal(STORE_STATE, "agility")).toBe(10);
    expect(S.getAttributeTotal(STORE_STATE, "charisma")).toBe(6);
    expect(S.getAttributeTotal(STORE_STATE, "endurance")).toBe(4);
    expect(S.getAttributeTotal(STORE_STATE, "intelligence")).toBe(10);
    expect(S.getAttributeTotal(STORE_STATE, "luck")).toBe(8);
    expect(S.getAttributeTotal(STORE_STATE, "perception")).toBe(9);
    expect(S.getAttributeTotal(STORE_STATE, "strength")).toBe(7);
  });

  it("getInGameTimeText", () => {
    //  format(addSeconds(GAME_START_DATE, s.inGameTime / 10), "LLL dd yyyy HH:mm"),
    expect(S.getInGameTimeText(STORE_STATE)).toBe("Oct 21 2242 08:44");
  });

  it("getCarryWeightDerived", () => {
    expect(S.getCarryWeightDerived(STORE_STATE)).toBe(200);
  });

  it("getCriticalChanceDerived", () => {
    expect(S.getCriticalChanceDerived(STORE_STATE)).toBe(8);
  });

  it("getHealingRateDerived", () => {
    expect(S.getHealingRateDerived(STORE_STATE)).toBe(1);
  });

  it("getHPDerived", () => {
    expect(S.getHPDerived(STORE_STATE)).toBe(30);
  });

  it("getGVARs", () => {
    expect(S.getGVARs(STORE_STATE)).toStrictEqual({
      gvarBerserker: 0,
      gvarChampion: 1,
      gvarChildkiller: 0,
      gvarDudeVirgin: 0,
      gvarGigolo: 0,
      gvarGravesUnearthed: 0,
      gvarMadeManBishop: 0,
      gvarMadeManMordino: 0,
      gvarMadeManSalvatore: 0,
      gvarMadeManWright: 1,
      gvarNewRenoHasRepPrizefigther: 0,
      gvarNewRenoPornStar: 0,
      gvarPlayerMarried: 0,
      gvarPlayerReputation: 1390,
      gvarPlayerWasMarried: 0,
      gvarSexpert: 0,
      gvarSlaver: 0,
    });
  });

  it("getIsLimbCrippled", () => {
    expect(S.getIsLimbCrippled(STORE_STATE, "DEAD")).toBeFalsy();
    expect(S.getIsLimbCrippled(STORE_STATE, "EYES")).toBeFalsy();
    expect(S.getIsLimbCrippled(STORE_STATE, "LEFT_ARM")).toBeFalsy();
    expect(S.getIsLimbCrippled(STORE_STATE, "LEFT_LEG")).toBeFalsy();
    expect(S.getIsLimbCrippled(STORE_STATE, "RIGHT_ARM")).toBeTruthy();
    expect(S.getIsLimbCrippled(STORE_STATE, "RIGHT_LEG")).toBeFalsy();
  });

  it("getKills", () => {
    expect(S.getKills(STORE_STATE)).toStrictEqual({
      killAliens: 38,
      killBigBadBoss: 0,
      killBrahmin: 0,
      killCentaurs: 3,
      killChildren: 0,
      killDeathclaws: 1,
      killDogs: 21,
      killFloaters: 5,
      killGeckos: 30,
      killGhouls: 0,
      killGiantAnts: 68,
      killManti: 0,
      killMen: 126,
      killPlants: 3,
      killRadscorpions: 20,
      killRats: 128,
      killRobots: 7,
      killSuperMutants: 30,
      killWomen: 17,
    });
  });

  it("getMeleeDmgDerived", () => {
    expect(S.getMeleeDmgDerived(STORE_STATE)).toBe(2);
  });

  it("getPerks", () => {
    expect(S.getPerks(STORE_STATE)).toStrictEqual({
      perkActionBoy: 2,
      perkAdrenalineRush: 0,
      perkAlcoholLoweredHitPoints1: 0,
      perkAlcoholLoweredHitPoints2: 0,
      perkAlcoholRaisedHitPoints1: 0,
      perkAlcoholRaisedHitPoints2: 0,
      perkAnimalFriend: 0,
      perkAutodocLoweredHitPoints1: 0,
      perkAutodocLoweredHitPoints2: 0,
      perkAutodocRaisedHitPoints1: 0,
      perkAutodocRaisedHitPoints2: 0,
      perkAwareness: 0,
      perkBetterCriticals: 0,
      perkBonusHtHAttacks: 0,
      perkBonusHtHDamage: 0,
      perkBonusMove: 2,
      perkBonusRangedDamage: 0,
      perkBonusRateOfFire: 1,
      perkBuffoutAddiction: 0,
      perkCautiousNature: 0,
      perkComprehension: 0,
      perkCultOfPersonality: 0,
      perkDemolitionExpert: 0,
      perkDermalImpactArmor: 0,
      perkDermalImpactAssaultEnhancements: 0,
      perkDodger: 0,
      perkEarlierSequence: 0,
      perkEducated: 0,
      perkEmpathy: 0,
      perkExpertExcrementExpeditor: 0,
      perkExplorer: 0,
      perkFasterHealing: 0,
      perkFlowerChild: 0,
      perkFortuneFinder: 0,
      perkFriendlyFoe: 0,
      perkGainAgility: 0,
      perkGainCharisma: 0,
      perkGainEndurance: 0,
      perkGainIntelligence: 0,
      perkGainLuck: 0,
      perkGainPerception: 0,
      perkGainStrength: 0,
      perkGambler: 0,
      perkGeckoSkinning: 1,
      perkGhost: 0,
      perkHarmless: 0,
      perkHealer: 0,
      perkHeaveHo: 0,
      perkHereAndNow: 0,
      perkHtHEvade: 0,
      perkJetAddiction: 0,
      perkKamaSutraMaster: 0,
      perkKarmaBeacon: 0,
      perkLifegiver: 0,
      perkLightStep: 0,
      perkLivingAnatomy: 0,
      perkMagneticPersonality: 0,
      perkMasterThief: 0,
      perkMasterTrader: 0,
      perkMedic: 0,
      perkMentalBlock: 0,
      perkMentatsAddiction: 0,
      perkMoreCriticals: 0,
      perkMrFixit: 0,
      perkMutate: 0,
      perkMysteriousStranger: 0,
      perkNegotiator: 0,
      perkNightVision: 0,
      perkNukaColaAddiction: 0,
      perkPackRat: 0,
      perkPathfinder: 0,
      perkPhoenixArmorImplants: 0,
      perkPhoenixAssaultEnhancements: 0,
      perkPickpocket: 0,
      perkPresence: 0,
      perkPsychoAddiction: 0,
      perkPyromaniac: 0,
      perkQuickPockets: 1,
      perkQuickRecovery: 0,
      perkRadResistance: 0,
      perkRadawayAddiction: 0,
      perkRanger: 0,
      perkSalesman: 0,
      perkScout: 0,
      perkScrounger: 0,
      perkSharpshooter: 1,
      perkSilentDeath: 0,
      perkSilentRunning: 0,
      perkSlayer: 0,
      perkSmoothTalker: 0,
      perkSnakeeater: 0,
      perkSniper: 0,
      perkSpeaker: 0,
      perkStonewall: 0,
      perkStrongBack: 0,
      perkSurvivalist: 0,
      perkSwiftLearner: 0,
      perkTag: 0,
      perkThief: 0,
      perkToughness: 0,
      perkTragicAddiction: 0,
      perkVaultCityInoculations: 0,
      perkVaultCityTraining: 0,
      perkWeaponEnhancedKnockout: 0,
      perkWeaponHandling: 0,
    });
  });

  it("getPerk", () => {
    expect(S.getPerk(STORE_STATE, "perkActionBoy")).toBe(2);
    expect(S.getPerk(STORE_STATE, "perkAdrenalineRush")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAlcoholLoweredHitPoints1")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAlcoholLoweredHitPoints2")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAlcoholRaisedHitPoints1")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAlcoholRaisedHitPoints2")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAnimalFriend")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAutodocLoweredHitPoints1")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAutodocLoweredHitPoints2")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAutodocRaisedHitPoints1")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAutodocRaisedHitPoints2")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkAwareness")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkBetterCriticals")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkBonusHtHAttacks")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkBonusHtHDamage")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkBonusMove")).toBe(2);
    expect(S.getPerk(STORE_STATE, "perkBonusRangedDamage")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkBonusRateOfFire")).toBe(1);
    expect(S.getPerk(STORE_STATE, "perkBuffoutAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkCautiousNature")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkComprehension")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkCultOfPersonality")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkDemolitionExpert")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkDermalImpactArmor")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkDermalImpactAssaultEnhancements")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkDodger")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkEarlierSequence")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkEducated")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkEmpathy")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkExpertExcrementExpeditor")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkExplorer")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkFasterHealing")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkFlowerChild")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkFortuneFinder")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkFriendlyFoe")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainAgility")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainCharisma")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainEndurance")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainIntelligence")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainLuck")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainPerception")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGainStrength")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGambler")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkGeckoSkinning")).toBe(1);
    expect(S.getPerk(STORE_STATE, "perkGhost")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkHarmless")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkHealer")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkHeaveHo")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkHereAndNow")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkHtHEvade")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkJetAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkKamaSutraMaster")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkKarmaBeacon")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkLifegiver")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkLightStep")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkLivingAnatomy")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMagneticPersonality")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMasterThief")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMasterTrader")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMedic")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMentalBlock")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMentatsAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMoreCriticals")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMrFixit")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMutate")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkMysteriousStranger")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkNegotiator")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkNightVision")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkNukaColaAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPackRat")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPathfinder")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPhoenixArmorImplants")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPhoenixAssaultEnhancements")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPickpocket")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPresence")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPsychoAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkPyromaniac")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkQuickPockets")).toBe(1);
    expect(S.getPerk(STORE_STATE, "perkQuickRecovery")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkRadResistance")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkRadawayAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkRanger")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSalesman")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkScout")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkScrounger")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSharpshooter")).toBe(1);
    expect(S.getPerk(STORE_STATE, "perkSilentDeath")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSilentRunning")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSlayer")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSmoothTalker")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSnakeeater")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSniper")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSpeaker")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkStonewall")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkStrongBack")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSurvivalist")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkSwiftLearner")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkTag")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkThief")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkToughness")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkTragicAddiction")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkVaultCityInoculations")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkVaultCityTraining")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkWeaponEnhancedKnockout")).toBe(0);
    expect(S.getPerk(STORE_STATE, "perkWeaponHandling")).toBe(0);
  });

  it("getPlayerAge", () => {
    expect(S.getPlayerAge(STORE_STATE)).toBe(22);
  });

  it("getSelectedTraits", () => {
    expect(S.getSelectedTraits(STORE_STATE)).toStrictEqual([15, 8]);
  });

  it("getSequenceDerived", () => {
    expect(S.getSequenceDerived(STORE_STATE)).toBe(18);
  });

  it("getPoisonResistanceDerived", () => {
    expect(S.getPoisonResistanceDerived(STORE_STATE)).toBe(20);
  });

  it("getRadiationResistanceDerived", () => {
    expect(S.getRadiationResistanceDerived(STORE_STATE)).toBe(8);
  });

  it("getTaggedSkills", () => {
    expect(S.getTaggedSkills(STORE_STATE)).toStrictEqual([0, 14, 9, -1]);
  });

  it("getSkillIsTagged", () => {
    expect(S.getSkillIsTagged(STORE_STATE, "skillBarter")).toBeFalsy();
    expect(S.getSkillIsTagged(STORE_STATE, "skillSmallGuns")).toBeTruthy();
  });

  it("getSkills", () => {
    expect(S.getSkills(STORE_STATE)).toStrictEqual({
      skillBarter: 0,
      skillBigGuns: 0,
      skillDoctor: 0,
      skillEnergyWeapons: 115,
      skillFirstAid: 40,
      skillGambling: 0,
      skillLockpick: 31,
      skillMeleeWeapons: 26,
      skillOutdoorsMan: 46,
      skillRepair: 80,
      skillScience: 70,
      skillSmallGuns: 23,
      skillSneak: 0,
      skillSpeech: 33,
      skillSteal: 0,
      skillThrowing: 0,
      skillTraps: 0,
      skillUnarmed: 72,
    });
  });

  it("getSkillTotal", () => {
    expect(S.getSkillTotal(STORE_STATE, "skillBarter")).toBe(14);
    expect(S.getSkillTotal(STORE_STATE, "skillBigGuns")).toBe(10);
    expect(S.getSkillTotal(STORE_STATE, "skillDoctor")).toBe(14);
    expect(S.getSkillTotal(STORE_STATE, "skillEnergyWeapons")).toBe(125);
    expect(S.getSkillTotal(STORE_STATE, "skillFirstAid")).toBe(68);
    expect(S.getSkillTotal(STORE_STATE, "skillGambling")).toBe(30);
    expect(S.getSkillTotal(STORE_STATE, "skillLockpick")).toBe(101);
    expect(S.getSkillTotal(STORE_STATE, "skillMeleeWeapons")).toBe(70);
    expect(S.getSkillTotal(STORE_STATE, "skillOutdoorsMan")).toBe(64);
    expect(S.getSkillTotal(STORE_STATE, "skillRepair")).toBe(100);
    expect(S.getSkillTotal(STORE_STATE, "skillScience")).toBe(100);
    expect(S.getSkillTotal(STORE_STATE, "skillSmallGuns")).toBe(101);
    expect(S.getSkillTotal(STORE_STATE, "skillSneak")).toBe(25);
    expect(S.getSkillTotal(STORE_STATE, "skillSpeech")).toBe(106);
    expect(S.getSkillTotal(STORE_STATE, "skillSteal")).toBe(20);
    expect(S.getSkillTotal(STORE_STATE, "skillThrowing")).toBe(30);
    expect(S.getSkillTotal(STORE_STATE, "skillTraps")).toBe(19);
    expect(S.getSkillTotal(STORE_STATE, "skillUnarmed")).toBe(126);
  });

  it("getTraits", () => {
    expect(S.getTraits(STORE_STATE)).toStrictEqual({
      bloodyMess: true,
      bruiser: false,
      chemReliant: false,
      chemResistant: false,
      fastMetabolism: false,
      fastShot: false,
      finesse: false,
      gifted: true,
      goodNatured: false,
      heavyHanded: false,
      jinxed: false,
      kamikaze: false,
      oneHander: false,
      sexAppeal: false,
      skilled: false,
      smallFrame: false,
    });
  });

  it("getTrait", () => {
    expect(S.getTrait(STORE_STATE, "bloodyMess")).toBeTruthy();
    expect(S.getTrait(STORE_STATE, "bruiser")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "chemReliant")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "chemResistant")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "fastMetabolism")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "fastShot")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "finesse")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "gifted")).toBeTruthy();
    expect(S.getTrait(STORE_STATE, "goodNatured")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "heavyHanded")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "jinxed")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "kamikaze")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "oneHander")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "sexAppeal")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "skilled")).toBeFalsy();
    expect(S.getTrait(STORE_STATE, "smallFrame")).toBeFalsy();
  });
});
