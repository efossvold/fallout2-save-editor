import produce from 'immer'
import create from 'zustand'
import { PerkValues } from '../api/types/perks'
import { Crippled } from '../api/data/crippled'
import { createSaveData, StatNames } from '../api/save-data'
import { saveHandler } from '../api/save-handler'
import type * as M from '../api/types/map'
import * as U from '../api/utils'
import { getPerk } from './selectors'

export interface StoreState {
  data: M.SaveGameData
  currentSaveFile: string | null

  adjustStatsFromPerk: (name: keyof PerkValues, level: number) => void
  load: (path: string) => Promise<void>
  save: (path: string) => Promise<void>
  setData: <
    Prop extends keyof M.SaveGameData,
    Type extends M.SaveGameData[Prop],
  >(
    prop: Prop,
    value: Type,
  ) => void
  setCrippledLimb: (bodyPart: keyof typeof Crippled, value: boolean) => void
}

const handler = saveHandler()

export const useAPIStore = create<StoreState>((set, get) => ({
  ...handler,
  data: createSaveData(),
  currentSaveFile: null,

  // Calculate permanent bonus/penalties from perks
  // Adjustments from these perks are permanently added
  // to bonus value of the stat
  adjustStatsFromPerk: (name, newLevel) =>
    set(state =>
      produce(state, draft => {
        // [Perk name, Affected stat, value of adjustment]
        const table: [keyof PerkValues, StatNames, number][] = [
          ['perkDodger', 'bonusAC', 5],
          ['perkEarlierSequence', 'bonusSequence', 2],
          ['perkFasterHealing', 'bonusHealingRate', 2],
          ['perkMoreCriticals', 'bonusCriticalChance', 5],
          ['perkPackRat', 'bonusCarryWeight', 50],
          ['perkRadResistance', 'bonusRadiationResistance', 15],
          ['perkSnakeeater', 'bonusPoisonResistance', 25],
          ['perkStrongBack', 'bonusCarryWeight', 50],
          ['perkToughness', 'bonusDmgResistanceNormal', 10],
          ['perkPhoenixAssaultEnhancements', 'bonusAttrCharisma', -1],
        ]

        table.forEach(([perkName, attr, value]) => {
          if (name === perkName) {
            const prevLevel = getPerk(state, perkName)
            const statValue = state.data[attr]
            const newAdjustment = newLevel > prevLevel ? value : value * -1
            // @ts-ignore
            draft.data[attr] = statValue + newAdjustment
          }
        })
      }),
    ),

  async load(path) {
    await handler.readFile(path)
    const data = handler.getData()
    set({
      currentSaveFile: path,
      data,
    })
  },

  async save(path) {
    const { currentSaveFile, data } = get()
    if (currentSaveFile) {
      await handler.saveFile(path, data)
    }
  },
  setData(prop, value) {
    set(state =>
      produce(state, draft => {
        draft.data[prop] = value
      }),
    )
  },

  setCrippledLimb(bodyPart, isCrippled) {
    const fn = isCrippled ? U.bitSet : U.bitClear

    set(state =>
      produce(state, draft => {
        draft.data.crippled = fn(
          get().data.crippled,
          Crippled[bodyPart as keyof typeof Crippled],
        )
      }),
    )
  },
}))
