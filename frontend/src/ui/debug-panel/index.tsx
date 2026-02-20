import { clsx } from 'clsx'
import { useState, useEffect } from 'react'

import { ATTRIBUTES } from '../../api/data/attributes'
import { SKILLS } from '../../api/data/skills'
import type { SaveGameDataExtra } from '../../api/types/map'
import * as U from '../../api/utils'
import * as S from '../selectors'
import { useAPIStore } from '../store'

import { FilterField } from './filter-field'
import { PropChangedList } from './prop-changed-list'
import { PropList } from './prop-list'
import { SimpleCheckbox } from './simple-checkbox'

const useDataExtra = (): SaveGameDataExtra => {
  const store = useAPIStore

  return {
    inGameTimeText: store(S.getInGameTimeText),
    derivedAC: store(S.getACDerived),
    derivedAP: store(S.getAPDerived),
    derivedCarryWeight: store(S.getCarryWeightDerived),
    criticalChanceDerived: store(S.getCriticalChanceDerived),
    HealingRateDerived: store(S.getHealingRateDerived),
    derivedHP: store(S.getHPDerived),
    totalHP: store(S.getHPTotal),
    isCrippledDead: store(s => S.getIsLimbCrippled(s, 'DEAD')),
    isCrippledEyes: store(s => S.getIsLimbCrippled(s, 'EYES')),
    isCrippledLeftArm: store(s => S.getIsLimbCrippled(s, 'LEFT_ARM')),
    isCrippledRightArm: store(s => S.getIsLimbCrippled(s, 'RIGHT_ARM')),
    isCrippledLeftLeg: store(s => S.getIsLimbCrippled(s, 'LEFT_LEG')),
    isCrippledRightLeg: store(s => S.getIsLimbCrippled(s, 'RIGHT_LEG')),
    derivedMeleeDmg: store(S.getMeleeDmgDerived),
    playerAge: store(S.getPlayerAge),
    derivedSequence: store(S.getSequenceDerived),
    derivedPoisonResistance: store(S.getPoisonResistanceDerived),
    derivedRadiationResistance: store(S.getRadiationResistanceDerived),

    // All skills total - i.e. "totalSkillSmallGuns"
    ...U.keysOf(SKILLS).reduce<Record<string, string | number>>((acc, key) => {
      acc[`total${U.captializeFirstLetter(key)}`] = store(s => S.getSkillTotal(s, key))
      return acc
    }, {}),

    // All attributes total - i.e. "totalStrength"
    ...U.keysOf(ATTRIBUTES).reduce<Record<string, string | number>>((acc, key) => {
      acc[`total${U.captializeFirstLetter(key)}`] = store(s => S.getAttributeTotal(s, key))
      return acc
    }, {}),
  }
}

export const StoreDebuggerPanel = () => {
  const data = useAPIStore(s => s.data)
  const dataExtra = useDataExtra()
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)
  const [showChangesOnly, setShowChangesOnly] = useState(false)
  const [search, setSearch] = useState('')
  const [appHeight, setAppHeight] = useState<number>()

  useEffect(() => {
    const height = document.querySelector('#panels')?.getClientRects()[0]?.height
    if (height !== appHeight) {
      setAppHeight(height)
    }
  }, [appHeight, setAppHeight])

  return (
    <div
      className={clsx(
        'my-1 overflow-hidden transition-[width]',
        showDebugWindow ? 'w-[320px]' : 'w-0',
      )}
      style={{ maxHeight: appHeight ? `${appHeight}px` : 'auto' }}
    >
      <div className="py-1 p-2 mr-0.5 gap-1 rounded-sm bg-gray-50 h-full flex flex-col text-xs ">
        <h1 className="text-gray-700 text-base">Data</h1>

        <FilterField
          value={search}
          handleChange={ev => {
            setSearch(ev.target.value)
          }}
          handleReset={() => {
            setSearch('')
          }}
        />

        <SimpleCheckbox
          label="Show changes only"
          value={showChangesOnly}
          handleChange={() => {
            setShowChangesOnly(!showChangesOnly)
          }}
        />

        <div className="overflow-auto">
          <PropList data={data} filter={search} showChangesOnly={showChangesOnly} />
          <PropChangedList data={data} filter={search} showChangesOnly={showChangesOnly} />
          <PropList data={dataExtra} filter={search} showChangesOnly={showChangesOnly} />
          <PropChangedList data={dataExtra} filter={search} showChangesOnly={showChangesOnly} />
        </div>
      </div>
    </div>
  )
}
