import { create } from '@octanejs/zustand';

import type { StatNames } from '../api/save-data'
import type * as M from '../api/types/map'
import type { PerkValues } from '../api/types/perks'

import { Crippled } from '../api/data/crippled'
import { createSaveData } from '../api/save-data'
import { saveHandler } from '../api/save-handler'
import * as U from '../api/utils'
import { getPerk } from './selectors'

export const handler = saveHandler({ isDebug: false })

export type StoreState = Readonly<{
  data: M.SaveGameData
  currentSaveFile?: string
  showDebugWindow: boolean
  panelsHeight: number // Height of <Panels />. Used set <DebugPanel /> to same height

  adjustStatsFromPerk: (name: keyof PerkValues, level: number) => void
  load: (filename: string, base64: string) => void
  save: () => void
  getProp: <Prop extends keyof M.SaveGameData>(prop: Prop) => M.SaveGameData[Prop]
  setProp: <Prop extends keyof M.SaveGameData>(prop: Prop, value: M.SaveGameData[Prop]) => void
  setCrippledLimb: (bodyPart: keyof typeof Crippled, value: boolean) => void
  setPanelsHeight: (height: number) => void
  toggleDebugWindow: () => void
}>

export const useAPIStore = create<StoreState>((set, get) => ({
  data: createSaveData(),
  showDebugWindow: false,
  // showDebugWindow: !import.meta.env.PROD,
  panelsHeight: 733,

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
      const perkAdjustments = [
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

      const data = { ...state.data }

      for (const [perkName, attr, value] of perkAdjustments) {
        if (name === perkName) {
          const prevLevel = getPerk(state, perkName)
          const statValue = state.data[attr]
          const newAdjustment = newLevel > prevLevel ? value : value * -1
          data[attr] = statValue + newAdjustment
        }
      }

      return { data }
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
    set(state => ({
      data: {
        ...state.data,
        [prop]: value,
      },
    })),

  setCrippledLimb: (bodyPart, isCrippled) =>
    set(state => {
      const fn = isCrippled ? U.bitSet : U.bitClear
      return {
        data: {
          ...state.data,
          crippled: fn(state.data.crippled, Crippled[bodyPart]),
        },
      }
    }),

  setPanelsHeight: height =>
    set(() => ({
      panelsHeight: height,
    })),

  // inc: () => set((state) => ({ count: state.count + 1 })),

  toggleDebugWindow: () =>
    set(state => ({
      showDebugWindow: !state.showDebugWindow,
    })),
}))
