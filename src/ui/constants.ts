export const MIN_WIN_WIDTH = 1120
export const MIN_WIN_HEIGHT = 790

export const MIN_LEVEL = 1
export const MAX_LEVEL = 99

export const MIN_ATTRIBUTE_VAULE = 1
export const MAX_ATTRIBUTE_VALUE = 10

export const MIN_SKILL_VALUE = 0
export const MAX_SKILL_VALUE = 300

export const MAX_TRAITS = 2

export const SAVE_FILENAME = 'SAVE.DAT'

// Fallout 1 starts at December 5th 2161
// Fallout 2 starts at June 25th 2241
export const GAME_START_DATE = new Date(2241, 6, 25)

export enum ATTR_PREFIX {
  BASE_ATTR = 'baseAttr',
  BONUS_ATTR = 'bonusAttr',
  PERK = 'perk',
  KILL = 'kill',
  GVAR = 'gvar',
}
