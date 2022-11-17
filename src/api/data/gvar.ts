import type { GVAR } from '../types/gvar'
import { MakeOptional } from '../types/misc'

const n = ({
  id,
  name,
  desc,
  maxValue = 1,
}: MakeOptional<GVAR, 'maxValue'>): GVAR => ({
  id,
  name,
  desc,
  maxValue,
})

export const GVARS = Object.freeze({
  playerReputation: n({
    id: 0,
    name: 'Karma (Reputation)',
    desc: 'This is a ranged stat that represents your general reputation. The higher the number, the better known and respected you are. If your rep is negative, you are hated by some for your evil actions.',
    maxValue: null,
  }),
  childkiller: n({
    id: 1,
    name: 'Childkiller',
    desc: 'You have killed children, the youth of the wasteland. This is considered to be a really bad thing. You evil, evil person.',
    maxValue: null,
  }),
  champion: n({
    id: 2,
    name: 'Champion',
    desc: 'Your actions have revealed you to be a champion of the people. Your war against evil and villainy is widely known. Honorable people will respect you better.',
  }),
  berserker: n({
    id: 3,
    name: 'Berserker',
    desc: 'You have killed a large number of people. This is generally not a good thing to get known for. People from the wrong side of the track will like you a little more, however.',
  }),
  slaver: n({
    id: 11,
    name: 'Slaver',
    desc: `You have been marked as a member of the Slaver's Guild. The tattoo on your forehead makes your profession evident to everyone you meet.`,
  }),
  gravesUnearthed: n({
    id: 319,
    name: 'Grave Digger',
    desc: `"They're dead, they don't care," has become your motto. Digging up the remains of others is more than a hobby for you.`,
  }),
  sexpert: n({
    id: 588,
    name: 'Sexpert',
    desc: 'You know sex. You know foreplay. You know how to please a member of the opposite sex and leave them hungry for more.',
  }),
  gigolo: n({
    id: 589,
    name: 'Gigolo',
    desc: `Let's be honest: You sleep with anything that walks on two legs. Sometimes, you're not even that discriminating.`,
  }),
  madeManSalvatore: n({
    id: 591,
    name: 'Made Man: Salvatore',
    desc: `You are a "Made Man" of the Salvatore Family. You are well-known, well-respected, and look great in a fedora.`,
  }),
  playerMarried: n({
    id: 6,
    name: 'Married',
    desc: `You got hitched. Hey, it's your problem, not ours.`,
  }),
  newRenoPornStar: n({
    id: 232,
    name: 'Porn Star',
    desc: `You are a big, bright, shining star. Your sexual exploits are well-known throughout New Reno.`,
  }),
  dudeVirgin: n({
    id: 590,
    name: 'Virgin of the Wastes',
    desc: `You really need to get out more. Your sexual exploits have been...well, two dimensional.`,
  }),
  newRenoHasRepPrizefigther: n({
    id: 259,
    name: 'Prizefighter',
    desc: `You are the heavyweight champion of Northern California. You have gained fame, respect, the love of thousands... and a bonus to your toughness and unarmed skill.`,
  }),
  madeManBishop: n({
    id: 592,
    name: 'Made Man: Bishop',
    desc: `You are a "Made Man" of the Bishop Family. You are well-known, well-respected, and look great in a fedora.`,
  }),
  madeManMordino: n({
    id: 593,
    name: 'Made Man: Mordino',
    desc: `You are a "Made Man" of the Mordino Family. You are well-known, well-respected, and look great in a fedora.`,
  }),
  madeManWright: n({
    id: 594,
    name: 'Made Man: Wright',
    desc: `You are a "Made Man" of the Wright Family. You are well-known, well-respected, and look great in a fedora.`,
  }),
  playerWasMarried: n({
    id: 449,
    name: 'Separated',
    desc: `Your spouse is no longer with you. I hope you're happy.`,
  }),
})
