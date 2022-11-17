export const XP_LEVELS = [
  0, 1000, 3000, 6000, 10000, 15000, 21000, 28000, 36000, 45000, 55000, 66000,
  78000, 91000, 105000, 120000, 136000, 153000, 171000, 190000, 210000,
]

export const getLevelXP = (level: number): number | string => {
  if (level < XP_LEVELS.length - 1) {
    return XP_LEVELS[level - 1]
  }
  if (level > 99) {
    return 'Godhood'
  }
  return ((level * (level - 1)) / 2) * 1000
}
