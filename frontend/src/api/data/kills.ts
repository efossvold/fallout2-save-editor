import type { Kill } from '../types/kill'

const n = ({ id, name, desc }: Kill): Kill => ({
  id,
  name,
  desc,
})

export const KILLS = Object.freeze({
  men: n({
    id: 0,
    name: 'Men',
    desc: 'This line shows the number of male humans you have killed during the course of your adventures.',
  }),
  women: n({
    id: 1,
    name: 'Women',
    desc: 'This line shows the number of female humans you have killed during the course of your adventures.',
  }),
  children: n({
    id: 2,
    name: 'Children',
    desc: 'This line shows the number of young human children you have killed during the course of your adventures.  You cad.',
  }),
  superMutants: n({
    id: 3,
    name: 'Super Mutants',
    desc: 'The number of Super Mutants you have slain during the course of your adventures.',
  }),
  ghouls: n({
    id: 4,
    name: 'Ghouls',
    desc: 'This line shows the number of male and female ghoul mutants you have killed during the course of your adventures.',
  }),
  brahmin: n({
    id: 5,
    name: 'Brahmin',
    desc: 'This line shows the number of Brahmin (mutated cows) you have chopped up during your travels.',
  }),
  radscorpions: n({
    id: 6,
    name: 'Radscorpions',
    desc: 'The number of mutated Radscorpions that you have put to death during your adventure.',
  }),
  rats: n({
    id: 7,
    name: 'Rats',
    desc: 'The number of rats you have killed.  Includes all members of the rat family.',
  }),
  floaters: n({
    id: 8,
    name: 'Floaters',
    desc: 'This is the number of mutant Floaters that you have put to death.',
  }),
  centaurs: n({
    id: 9,
    name: 'Centaurs',
    desc: 'Your tally of dead mutant Centaurs.',
  }),
  robots: n({
    id: 10,
    name: 'Robots',
    desc: 'This is the number of robots that you have destroyed or dismantled.',
  }),
  dogs: n({
    id: 11,
    name: 'Dogs',
    desc: 'The total number of dogs that you have sent to the great kennel in the sky.',
  }),
  manti: n({
    id: 12,
    name: 'Manti',
    desc: 'This line shows the total number of dead Manti, or large mutated mantis-like insects, that you have squashed so far.',
  }),
  deathclaws: n({
    id: 13,
    name: 'Death Claws',
    desc: 'This line shows that you have slain the Deathclaw, and any of his spawn.',
  }),
  plants: n({
    id: 14,
    name: 'Plants',
    desc: 'This line shows the number of plants you have weeded out of the world.',
  }),
  geckos: n({
    id: 15,
    name: 'Geckos',
    desc: 'The number of cute lizards you have wiped off the face of the planet.',
  }),
  aliens: n({
    id: 16,
    name: 'Aliens',
    desc: 'A count of alien things slain by your hand.',
  }),
  giantAnts: n({
    id: 17,
    name: 'Giant Ants',
    desc: 'The number of insectoids that you have exterminated in the wasteland.',
  }),
  bigBadBoss: n({
    id: 18,
    name: 'Big Bad Boss',
    desc: 'The count of genetically-engineered total homicidal maniac cyborg bodyguards you have wasted.',
  }),
})
