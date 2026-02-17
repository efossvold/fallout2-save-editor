import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { Crippled } from '../api/data/crippled'
import { createSaveData } from '../api/save-data'
import type { StatNames } from '../api/save-data'
import { saveHandler } from '../api/save-handler'
import type * as M from '../api/types/map'
import type { PerkValues } from '../api/types/perks'
import * as U from '../api/utils'

import { getPerk } from './selectors'

export const handler = saveHandler({ isDebug: false })

export interface StoreState {
  data: M.SaveGameData
  currentSaveFile?: string
  showDebugWindow: boolean

  adjustStatsFromPerk: (name: keyof PerkValues, level: number) => void
  load: (filename: string, base64: string) => void
  save: () => void
  getProp: <Prop extends keyof M.SaveGameData>(prop: Prop) => M.SaveGameData[Prop]
  setProp: <Prop extends keyof M.SaveGameData, Type extends M.SaveGameData[Prop]>(
    prop: Prop,
    value: Type,
  ) => void
  setCrippledLimb: (bodyPart: keyof typeof Crippled, value: boolean) => void
  toggleDebugWindow: () => void
}

export const useAPIStore = create<StoreState>()(
  immer((set, get) => ({
    data: createSaveData(),
    showDebugWindow: false,

    // Calculate permanent bonus/penalties from perks
    // Adjustments from these perks are permanently added
    // To bonus value of the stat
    adjustStatsFromPerk: (name, newLevel) =>
      set(state => {
        // oxlint-disable-next-line unicorn/consistent-function-scoping
        const f = <A extends keyof PerkValues, B extends StatNames>(
          a: A,
          b: B,
          c: number,
          //
        ): [A, B, number] => [a, b, c]

        // [Perk name, Affected stat, value of adjustment]
        const table = [
          f('perkActionBoy', 'bonusAP', 1),
          f('perkDodger', 'bonusAC', 5),
          f('perkEarlierSequence', 'bonusSequence', 2),
          f('perkFasterHealing', 'bonusHealingRate', 2),
          f('perkMoreCriticals', 'bonusCriticalChance', 5),
          f('perkPackRat', 'bonusCarryWeight', 50),
          f('perkRadResistance', 'bonusRadiationResistance', 15),
          f('perkSnakeeater', 'bonusPoisonResistance', 25),
          f('perkStrongBack', 'bonusCarryWeight', 50),
          f('perkToughness', 'bonusDmgResistanceNormal', 10),
          f('perkPhoenixAssaultEnhancements', 'bonusAttrCharisma', -1),
        ]

        for (const [perkName, attr, value] of table) {
          if (name === perkName) {
            const prevLevel = getPerk(state, perkName)
            const statValue = state.data[attr]
            const newAdjustment = newLevel > prevLevel ? value : value * -1
            state.data[attr] = statValue + newAdjustment
          }
        }
      }),

    load(filename, base64) {
      handler.fromBase64(base64)
      set({
        currentSaveFile: filename,
        data: handler.getData(),
      })
    },

    save() {
      const { currentSaveFile, data } = get()
      if (currentSaveFile) {
        handler.setData({ ...data })
      }
    },

    getProp: prop => get().data[prop],

    setProp: (prop, value) =>
      set(state => {
        state.data[prop] = value
      }),

    setCrippledLimb: (bodyPart, isCrippled) =>
      set(state => {
        const fn = isCrippled ? U.bitSet : U.bitClear
        state.data.crippled = fn(get().data.crippled, Crippled[bodyPart])
      }),

    toggleDebugWindow: () =>
      set(state => {
        state.showDebugWindow = !state.showDebugWindow
      }),
  })),
)
