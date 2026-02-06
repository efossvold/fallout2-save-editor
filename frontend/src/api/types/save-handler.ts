import type { InventoryItem } from './items'
import type * as M from './map'

export type Getters<
  T extends Record<string, unknown>,
  Prefix extends string = '',
> = {
  [Key in keyof T as `get${Prefix}${Capitalize<
    string & keyof T
  >}`]: () => T[Key]
}

export type Setters<
  T extends Record<string, unknown>,
  Prefix extends string = '',
> = {
  [Key in keyof T as `set${Prefix}${Capitalize<string & keyof T>}`]: (
    value: T[Key],
  ) => void
}

export type SaveHandler = {
  findF13Offset(): number
  findF17Offset(): number
  findF17Offset(): number
  findF6Offset(): number
  findF7Offset(): number
  findF8Offset(): number
  findF9Offset(): number
  findF10Offset(): number
  findF11Offset(): number
  getInventoryItems(): InventoryItem[]
  getPreferences(): void
  fromBase64(data: string): SaveHandler
  setData(data: M.SaveGameData): void
  toBase64(): string
  getData(): M.SaveGameData
} & Getters<M.MapHeaderSection> &
  Setters<M.MapHeaderSection> &
  // Player and inventory
  Getters<M.MapF5Section> &
  Setters<M.MapF5Section> &
  // Player stats (skills and attributes)
  Getters<M.MapF6Section> &
  Setters<M.MapF6Section> &
  // Tag skills
  Getters<M.MapF8Section> &
  Setters<M.MapF8Section> &
  // Perks
  Getters<M.MapF9Section> &
  Setters<M.MapF9Section> &
  // Combat
  Getters<M.MapF11Section> &
  Setters<M.MapF11Section> &
  // Experience and level
  Getters<M.MapF13Section> &
  Setters<M.MapF13Section> &
  // Traits
  Getters<M.MapF15Section> &
  Setters<M.MapF15Section> &
  // Preferences
  Getters<M.MapF17Section> &
  Setters<M.MapF17Section>
