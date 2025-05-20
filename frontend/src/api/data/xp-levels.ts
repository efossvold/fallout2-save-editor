export const XP_LEVELS = [
  0, 1000, 3000, 6000, 10_000, 15_000, 21_000, 28_000, 36_000, 45_000, 55_000,
  66_000, 78_000, 91_000, 105_000, 120_000, 136_000, 153_000, 171_000, 190_000,
  210_000,
] as const

export const getLevelXP = (level: number): number | string => {
  if (level < XP_LEVELS.length - 1) {
    const xp = XP_LEVELS.at(level - 1)
    if (!xp) {
      console.error(`XP leve ${level} does not exist`)
    }
    return xp ?? 0
  }
  if (level > 99) {
    return 'Godhood'
  }
  return ((level * (level - 1)) / 2) * 1000
}
