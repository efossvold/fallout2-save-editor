import type { MakeOptional } from '../types/misc'
import type { Perk } from '../types/perks'

const n = ({
  id,
  name,
  desc,
  ranks = 1,
}: MakeOptional<Perk, 'ranks'>): Perk => ({
  id,
  name,
  desc,
  ranks,
})

export const PERKS = Object.freeze({
  awareness: n({
    id: 0,
    name: 'Awareness',
    desc: 'With Awareness, you are given detailed information about any critter you examine. You see their exact hit points and information about any weapon they are equipped with.',
  }),
  bonusHtHAttacks: n({
    id: 1,
    name: 'Bonus HtH Attacks',
    desc: 'You have learned the secret arts of the East, or you just punch faster. In any case, your Hand-to-Hand attacks cost 1 AP less to perform.',
  }),
  bonusHtHDamage: n({
    id: 2,
    name: 'Bonus HtH Damage',
    desc: 'Experience in unarmed combat has given you the edge when it comes to damage. You cause +2 points of damage with hand-to-hand and melee attacks for each level of this Perk.',
    ranks: 3,
  }),
  bonusMove: n({
    id: 3,
    name: 'Bonus Move',
    desc: 'For each level of Bonus Move, you get 2 free APs each turn that can only be used for movement. In other words, you can move 2 free hexes each turn for each level of this Perk.',
    ranks: 2,
  }),
  bonusRangedDamage: n({
    id: 4,
    name: 'Bonus Ranged Damage',
    desc: 'Your training in firearms and other ranged weapons has made you more deadly in ranged combat. For each level of this Perk, you do +2 points of damage with ranged weapons.',
    ranks: 2,
  }),
  bonusRateOfFire: n({
    id: 5,
    name: 'Bonus Rate of Fire',
    desc: 'This Perk allows you to pull the trigger a little faster and still remain as accurate as before. Each ranged weapon attack costs 1 AP less to perform.',
  }),
  earlierSequence: n({
    id: 6,
    name: 'Earlier Sequence',
    desc: 'You are more likely to move before your opponents in combat, since your Sequence is +2 for each level of this Perk.',
    ranks: 3,
  }),
  fasterHealing: n({
    id: 7,
    name: 'Faster Healing',
    desc: 'With each level of this Perk, you get a +2 bonus to your Healing Rate. This is in addition to your normal healing rate, thus you heal faster.',
    ranks: 3,
  }),
  moreCriticals: n({
    id: 8,
    name: 'More Criticals',
    desc: 'You are more likely to cause critical hits in combat if you have this Perk. Each level of More Criticals gets you an additional +5% chance to cause a critical hit.',
    ranks: 3,
  }),
  nightVision: n({
    id: 9,
    name: 'Night Vision',
    desc: 'With the Night Vision Perk, you can see in the dark better. This will reduce the overall darkness level by 20%.',
  }),
  presence: n({
    id: 10,
    name: 'Presence',
    desc: 'You command attention by just walking into a room. The initial reaction of another person is improved by 10% for each level of this Perk.',
    ranks: 3,
  }),
  radResistance: n({
    id: 11,
    name: 'Rad Resistance',
    desc: 'You are better able to avoid radiation and the bad effects radiation causes. Each level of this Perk improves your Radiation Resistance by 15%.',
    ranks: 2,
  }),
  toughness: n({
    id: 12,
    name: 'Toughness',
    desc: 'When you are tough, you take less damage. Each level of this Perk adds +10% to your general damage resistance.',
    ranks: 3,
  }),
  strongBack: n({
    id: 13,
    name: 'Strong Back',
    desc: 'AKA Mule. You can carry an additional 50 pounds of equipment for each level of this Perk.',
    ranks: 3,
  }),
  sharpshooter: n({
    id: 14,
    name: 'Sharpshooter',
    desc: "You have a talent for hitting things at longer distances. For each level of this Perk, you get a +2 bonus to Perception for the purposes of determining range modifiers. It's easier than ever to kill at long range!",
  }),
  silentRunning: n({
    id: 15,
    name: 'Silent Running',
    desc: 'With this Perk, you now have the ability to move quickly and still remain quiet. You can Sneak and run at the same time. Without this Perk, you would automatically stop Sneaking if you ran.',
  }),
  survivalist: n({
    id: 16,
    name: 'Survivalist',
    desc: 'You are a master of the outdoors. This Perk confers the ability to survive in hostile environments. You get a +25% bonus to Outdoorsman.',
  }),
  masterTrader: n({
    id: 17,
    name: 'Master Trader',
    desc: 'You have mastered one aspect of bartering - buying goods far more cheaply than normal. With this Perk, you get a 25% discount when purchasing items from a store or another trader.',
  }),
  educated: n({
    id: 18,
    name: 'Educated',
    desc: 'Each level of Educated adds +2 skill points when you gain a new experience level. This Perk works best when purchased early in your adventure.',
    ranks: 3,
  }),
  healer: n({
    id: 19,
    name: 'Healer',
    desc: 'The healing of bodies comes easier to you with this Perk. Each level of this Perk heals 4-10 additional hit points when using the First Aid or Doctor skills.',
    ranks: 2,
  }),
  fortuneFinder: n({
    id: 20,
    name: 'Fortune Finder',
    desc: 'You have the talent of finding money. You find additional money in random encounters in the desert.',
  }),
  betterCriticals: n({
    id: 21,
    name: 'Better Criticals',
    desc: 'The critical hits you cause in combat are more devastating. You gain a 20% bonus on the critical hit table, almost ensuring that more damage will be done. This does not affect the chance to cause a critical hit.',
  }),
  empathy: n({
    id: 22,
    name: 'Empathy',
    desc: 'You have studied other human beings, giving you inside knowledge of their emotional reaction to you. You will see the reaction level of the person you are talking to when involved in an indepth conversation.',
  }),
  slayer: n({
    id: 23,
    name: 'Slayer',
    desc: 'The Slayer walks the earth! In hand-to-hand combat all of your hits are upgraded to critical hits, causing destruction and mayhem.',
  }),
  sniper: n({
    id: 24,
    name: 'Sniper',
    desc: 'You have mastered the firearm as a source of pain. With this Perk, any successful hit in combat with a ranged weapon will be upgraded to a critical hit if you also make a Luck roll.',
  }),
  silentDeath: n({
    id: 25,
    name: 'Silent Death',
    desc: 'While Sneaking, if you hit a critter in the back, you will cause double damage using a hand-to-hand attack. Silent Death is that kind of Perk.',
  }),
  actionBoy: n({
    id: 26,
    name: 'Action Boy',
    desc: 'Each level of Action Boy (insert Girl if you wish) gives you an additional AP to spend every combat turn. You can use these generic APs on any task.',
    ranks: 2,
  }),
  mentalBlock: n({
    id: 27,
    name: 'Mental Block (FO1 Only)',
    desc: 'UNIMPLEMENTED. FO1 ONLY',
  }),
  lifegiver: n({
    id: 28,
    name: 'Lifegiver',
    desc: 'With each level of this Perk, you gain an additional 4 Hit Points every time you advance a level. This is in addition to the hit points you already gain per level based off of your endurance.',
    ranks: 2,
  }),
  dodger: n({
    id: 29,
    name: 'Dodger',
    desc: 'You are less likely to be hit in combat if you have this Perk. You gain a +5 to your Armor Class, in addition to the AC bonus from any armor worn.',
  }),
  snakeeater: n({
    id: 30,
    name: 'Snakeeater',
    desc: 'Yum! Tastes like chicken. For each level of this Perk, you gain +25% to your Poison Resistance.',
    ranks: 2,
  }),
  mrFixit: n({
    id: 31,
    name: 'Mr. Fixit',
    desc: 'This Perk will give you a one-time bonus of +10% to the Repair and Science skills. A little late night cramming never hurt anybody, especially you.',
  }),
  medic: n({
    id: 32,
    name: 'Medic',
    desc: 'The Medic Perk gives you a one-time bonus of +10% to the First Aid and Doctor skills. Healing skills are a good thing.',
  }),
  masterThief: n({
    id: 33,
    name: 'Master Thief',
    desc: 'A Master Thief is proficient at stealing and picking locks. You gain +15 to Stealing and Lockpicking. Steal from the rich, and give to you.',
  }),
  speaker: n({
    id: 34,
    name: 'Speaker',
    desc: 'Being a Speaker means you have a one-time bonus of +20% to Speech. From the mouth of babes and all that.',
  }),
  heaveHo: n({
    id: 35,
    name: 'Heave Ho!',
    desc: "Each level of the Heave Ho! Perk gives you an additional +2 to Strength (up to 10,) for purposes of determining range with thrown weapons only. This Perk will not exceed a weapon's maximum range.",
    ranks: 3,
  }),
  friendlyFoe: n({
    id: 36,
    name: 'Friendly Foe (FO1 Only)',
    desc: 'UNIMPLEMENTED. FO1 ONLY',
  }),
  pickpocket: n({
    id: 37,
    name: 'Pickpocket',
    desc: 'You are much more adept at stealing than the normal crook. You can steal with the best of them, because with this Perk, you ignore size and facing modifiers when stealing from a person.',
  }),
  ghost: n({
    id: 38,
    name: 'Ghost',
    desc: 'When the sun goes down or you are in a poorly lit area, you move like a ghost with this Perk. Your Sneak skill is enhanced +20% in dark conditions.',
  }),
  cultOfPersonality: n({
    id: 39,
    name: 'Cult of Personality',
    desc: 'Your reputation is always positive to people. Without this Perk, a large negative reputation would have a bad effect on good natured people. This works in the reverse as well. Evil people will even treat Mr. Goodie Good as one of the gang.',
  }),
  scrounger: n({
    id: 40,
    name: 'Scrounger (FO1 Only)',
    desc: 'UNIMPLEMENTED. FO1 ONLY',
  }),
  explorer: n({
    id: 41,
    name: 'Explorer',
    desc: 'The mark of the Explorer is to search out new and interesting locations. With this Perk, you have a greater chance of finding special places and people.',
  }),
  flowerChild: n({
    id: 42,
    name: 'Flower Child (FO1 Only)',
    desc: 'UNIMPLEMENTED. FO1 ONLY',
  }),
  pathfinder: n({
    id: 43,
    name: 'Pathfinder',
    desc: 'The Pathfinder is better able to find the shortest route. With this Perk, your travel time on the World Map is reduced by 25% for each level.',
    ranks: 2,
  }),
  animalFriend: n({
    id: 44,
    name: 'Animal Friend (FO1 Only)',
    desc: 'UNIMPLEMENTED. FO1 ONLY',
  }),
  scout: n({
    id: 45,
    name: 'Scout',
    desc: 'You have improved your ability to see distant locations, increasing the size of explorations on the World Map by one square in each direction. You also have a better chance of finding special encounters.',
  }),
  mysteriousStranger: n({
    id: 46,
    name: 'Mysterious Stranger',
    desc: 'With this Perk, you have gained the attention of a Mysterious Stranger, who will appear to help you from time to time. If your ally is lost in combat, do not expect him (or her) to be replaced.',
  }),
  ranger: n({
    id: 47,
    name: 'Ranger',
    desc: 'You gain a +15% toward your Outdoorsman skill. You are more likely to avoid random encounters if you choose, and tend to find those "special" encounters more than most.',
  }),
  quickPockets: n({
    id: 48,
    name: 'Quick Pockets',
    desc: 'You have learned to pack your equipment better. Accessing your inventory only costs you 2 Action Points in Combat instead of 4.',
  }),
  smoothTalker: n({
    id: 49,
    name: 'Smooth Talker',
    desc: "You have learned to increase your dialog options without understanding what you're talking about. Each level of this Perk will increase your Intelligence by one, up to 10, for purposes of dialog only.",
    ranks: 3,
  }),
  swiftLearner: n({
    id: 50,
    name: 'Swift Learner',
    desc: 'You are indeed a Swift Learner with this Perk, as each level gives you an additional +5% bonus whenever you earn experience points. This is best taken early.',
    ranks: 3,
  }),
  tag: n({
    id: 51,
    name: 'Tag!',
    desc: 'Your skills have improved to the point where you can pick an additional Tag Skill. Tag skills increase twice as fast.',
  }),
  mutate: n({
    id: 52,
    name: 'Mutate!',
    desc: 'The radiation of the wasteland has changed you! One of your Traits has mutated into something else...',
  }),
  nukaColaAddiction: n({
    id: 53,
    name: 'Nuka-Cola Addiction',
    desc: 'You crave another Nuka-Cola.',
  }),
  buffoutAddiction: n({
    id: 54,
    name: 'Buffout Addiction',
    desc: 'You\ve got the shakes',
  }),
  mentatsAddiction: n({
    id: 55,
    name: 'Mentats Addiction',
    desc: 'You feel groggy',
  }),
  psychoAddiction: n({
    id: 56,
    name: 'Psycho Addiction',
    desc: 'You feel light-headed',
  }),
  radawayAddiction: n({
    id: 57,
    name: 'Radaway Addiction',
    desc: 'You feel nauseous',
  }),
  // These are hidden perks that apply whenever the user has a particular weapon equipped, providing additional bonuses,
  // or whenever the user wears a particular armor, providing additional bonuses.
  // weaponLongRange: n({
  //   id: 58,
  //   name: 'Weapon Long Range',
  //   desc: 'Hit chance reduced for targets farther than 4* (Perception - 2) hexes (200% increase in effective range)',
  // }),
  // weaponAccurate: n({
  //   id: 59,
  //   name: 'Weapon Accurate',
  //   desc: '+20% hit chance at all ranges',
  // }),
  // weaponPenetrate: n({
  //   id: 60,
  //   name: 'Weapon Penetrate',
  //   desc: "Target's Damage Threshold reduced by 80% (divided by 5).",
  // }),
  // weaponKnockback: n({
  //   id: 61,
  //   name: 'Weapon Knockback',
  //   desc: 'Knocks back the target (1 hex per 5 points of damage)',
  // }),
  // poweredArmor: n({ id: 62, name: 'Powered Armor', desc: 'Powered Armor' }),
  // combatArmor: n({ id: 63, name: 'Combat Armor', desc: 'Combat Armor' }),
  // weaponScopeRange: n({
  //   id: 64,
  //   name: 'Weapon Scope range',
  //   desc: 'Hit chance reduced for targets farther than 5(Perception - 2) hexes (250% effective range)',
  // }),
  // weaponFastreload: n({
  //   id: 65,
  //   name: 'Weapon Fast reload',
  //   desc: 'Reduces reloading cost to 1 AP',
  // }),
  // weaponNightsight: n({
  //   id: 66,
  //   name: 'Weapon Night sight',
  //   desc: 'Removes penalties for illumination',
  // }),
  // weaponFlameboy: n({
  //   id: 67,
  //   name: 'Weapon Flameboy',
  //   desc: 'Lowers threshold for burning death animation to 15 points of damage',
  // }),
  // armorAdvanced1: n({
  //   id: 68,
  //   name: 'Armor Advanced I',
  //   desc: '+4 Strength and +60 Radiation resistance.',
  // }),
  // armorAdvanced2: n({
  //   id: 69,
  //   name: 'Armor Advanced II',
  //   desc: '+4 Strength and +75 Radiation resistance.',
  // }),
  jetAddiction: n({
    id: 70,
    name: 'Jet Addiction',
    desc: 'Everything is moving so slowly... you need to get some more Jet, right NOW!',
  }),
  tragicAddiction: n({
    id: 71,
    name: 'Tragic Addiction',
    desc: 'You feel a burning desire to open another box of Tragic cards.',
  }),
  // armorCharisma: n({ id: 72, name: 'Armor Charisma', desc: '+2 Charisma' }),
  geckoSkinning: n({
    id: 73,
    name: 'Gecko Skinning',
    desc: 'You have the knowledge of how to skin geckos properly to get their hides.',
  }),
  dermalImpactArmor: n({
    id: 74,
    name: 'Dermal Impact Armor',
    desc: 'You have inherent protection against physical attacks.',
  }),
  dermalImpactAssaultEnhancements: n({
    id: 75,
    name: 'Dermal Impact Assault Enhancements',
    desc: 'You have extra inherent protection against physical attacks.',
  }),
  phoenixArmorImplants: n({
    id: 76,
    name: 'Phoenix Armor Implants',
    desc: 'You have inherent protection against energy attacks.',
  }),
  phoenixAssaultEnhancements: n({
    id: 77,
    name: 'Phoenix Assault Enhancements',
    desc: 'You have extra inherent protection against energy attacks.',
  }),
  vaultCityInoculations: n({
    id: 78,
    name: 'Vault City Inoculations',
    desc: 'You have gained +10% resistance to both poison and radiation.',
  }),
  adrenalineRush: n({
    id: 79,
    name: 'Adrenaline Rush',
    desc: 'With this Perk, you gain +1 to your Strength when you drop below 1/2 of your max hit points.',
  }),
  cautiousNature: n({
    id: 80,
    name: 'Cautious Nature',
    desc: 'You are more alert outdoors and enemies are less likely to sneak up on you. With this Perk you get a +3 to your perception in random encounters when determining placement.',
  }),
  comprehension: n({
    id: 81,
    name: 'Comprehension',
    desc: 'You pay much closer attention to the smaller details when reading. You gain 50% more skill points when reading books.',
  }),
  demolitionExpert: n({
    id: 82,
    name: 'Demolition Expert',
    desc: "You are an expert when it comes to the fine art of handling explosives. They always go off when they're supposed to, as well as causing extra damage.",
  }),
  gambler: n({
    id: 83,
    name: 'Gambler',
    desc: 'You can roll with the best of them. You gain +20% to your gambling skill.',
  }),
  gainStrength: n({
    id: 84,
    name: 'Gain Strength',
    desc: 'With this Perk you gain +1 to your Strength.',
  }),
  gainPerception: n({
    id: 85,
    name: 'Gain Perception',
    desc: 'With this Perk you gain +1 to your Perception.',
  }),
  gainEndurance: n({
    id: 86,
    name: 'Gain Endurance',
    desc: 'With this Perk you gain +1 to your Endurance.',
  }),
  gainCharisma: n({
    id: 87,
    name: 'Gain Charisma',
    desc: 'With this Perk you gain +1 to your Charisma.',
  }),
  gainIntelligence: n({
    id: 88,
    name: 'Gain Intelligence',
    desc: 'With this Perk you gain +1 to your Intelligence.',
  }),
  gainAgility: n({
    id: 89,
    name: 'Gain Agility',
    desc: 'With this Perk you gain +1 to your Agility.',
  }),
  gainLuck: n({
    id: 90,
    name: 'Gain Luck',
    desc: 'With this Perk you gain +1 to your Luck.',
  }),
  harmless: n({
    id: 91,
    name: 'Harmless',
    desc: 'Your innocent demeanor makes stealing from people a little easier. You gain 20% to your Steal skill.',
  }),
  hereAndNow: n({
    id: 92,
    name: 'Here and Now',
    desc: 'With this Perk you immediately gain one experience level.',
  }),
  htHEvade: n({
    id: 93,
    name: 'HtH Evade',
    desc: 'If both item slots are empty, each unused action point gives you a +2 instead of +1 towards your armor class at the end of your turn, plus 1/12 of your unarmed skill.',
  }),
  kamaSutraMaster: n({
    id: 94,
    name: 'Kama Sutra Master',
    desc: 'When it comes to pleasing sexually, you wrote the book.',
  }),
  karmaBeacon: n({
    id: 95,
    name: 'Karma Beacon',
    desc: 'Your Karma shines twice as bright. Whether good or bad, your Karma is doubled for any kind of reaction or modifiers.',
  }),
  lightStep: n({
    id: 96,
    name: 'Light Step',
    desc: 'You are agile, lucky, and always careful. This perk halves your chances of setting off a trap.',
  }),
  livingAnatomy: n({
    id: 97,
    name: 'Living Anatomy',
    desc: 'You have a better understanding of living creatures and their strengths and weaknesses. You get a one-time bonus of +10% to Doctor, and you do +5 damage per attack to living creatures.',
  }),
  magneticPersonality: n({
    id: 98,
    name: 'Magnetic Personality',
    desc: "You get 1 extra slot in your companion limit, but don't forget that more than 5 is always a crowd.",
  }),
  negotiator: n({
    id: 99,
    name: 'Negotiator',
    desc: 'You are a very skilled negotiator. Not only can you barter with the best of them, but you can talk your way into or out of almost anything. With this Perk you gain +10% to both Barter and Speech.',
  }),
  packRat: n({
    id: 100,
    name: 'Pack Rat',
    desc: "You are efficient at arranging your inventory in general. This makes it much easier to carry that little extra you've always needed.",
  }),
  pyromaniac: n({
    id: 101,
    name: 'Pyromaniac',
    desc: 'You do extra damage with fire-based weapons, and enemies always seem to die in the most painful fiery fashion.',
  }),
  quickRecovery: n({
    id: 102,
    name: 'Quick Recovery',
    desc: 'You are quick at recovering from being knocked down.',
  }),
  salesman: n({
    id: 103,
    name: 'Salesman',
    desc: 'You are an adept salesperson. With this Perk you gain +20% towards your Barter skill.',
  }),
  stonewall: n({
    id: 104,
    name: 'Stonewall',
    desc: 'You are much less likely to be knocked down in combat.',
  }),
  thief: n({
    id: 105,
    name: 'Thief',
    desc: 'The blood of a thief runs through your veins. With the Thief Perk, you get a one-time bonus of +10% to your Sneak, Lockpick, Steal, and Traps skills. A well rounded thief is a live thief.',
  }),
  weaponHandling: n({
    id: 106,
    name: 'Weapon Handling',
    desc: 'You can wield weapons much larger than normally allowed. You gain a +3 to your strength for the purposes of Strength checks when trying to wield weaponry.',
  }),
  vaultCityTraining: n({
    id: 107,
    name: 'Vault City Training',
    desc: 'You have received the Vault City medical training.',
  }),
  alcoholRaisedHitPoints1: n({
    id: 108,
    name: 'Alcohol Raised Hit Points I',
    desc: 'Your hit points have been enhanced a little by repeated drunkeness.',
  }),
  alcoholRaisedHitPoints2: n({
    id: 109,
    name: 'Alcohol Raised Hit Points II',
    desc: 'Your hit points have been enhanced a little more by repeated drunkeness.',
  }),
  alcoholLoweredHitPoints1: n({
    id: 110,
    name: 'Alcohol Lowered Hit Points I',
    desc: 'Your hit points have been lowered slightly by repeated drunkeness.',
  }),
  alcoholLoweredHitPoints2: n({
    id: 111,
    name: 'Alcohol Lowered Hit Points II',
    desc: 'Your hit points have been lowered slightly by repeated drunkeness.',
  }),
  autodocRaisedHitPoints1: n({
    id: 112,
    name: 'Autodoc Raised Hit Points I',
    desc: 'Your hit points have been enhanced a little by repeated use of the autodoc.',
  }),
  autodocRaisedHitPoints2: n({
    id: 113,
    name: 'Autodoc Raised Hit Points II',
    desc: 'Your hit points have been enhanced a little more by repeated use of the autodoc.',
  }),
  autodocLoweredHitPoints1: n({
    id: 114,
    name: 'Autodoc Lowered Hit Points I',
    desc: 'Your hit points have been lowered slightly by repeated use of the autodoc.',
  }),
  autodocLoweredHitPoints2: n({
    id: 115,
    name: 'Autodoc Lowered Hit Points II',
    desc: 'Your hit points have been lowered slightly by repeated use of the autodoc.',
  }),
  expertExcrementExpeditor: n({
    id: 116,
    name: 'Expert Excrement Expeditor',
    desc: 'You can sling bull with the best of them.',
  }),
  weaponEnhancedKnockout: n({
    id: 117,
    name: 'Weapon Enhanced Knockout',
    desc: 'All critical hits cause knockout in addition to their regular effects. Characters with 9 ST have a 1% chance of causing knockout on a regular hit. Characters with 10 ST have a 2% chance of causing knockout on a regular hit.',
  }),
})
