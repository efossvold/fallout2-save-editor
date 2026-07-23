import { useState } from 'react'

import type { SaveGameDataExtra } from '../../api/types/map'

import { ATTRIBUTES } from '../../api/data/attributes'
import { SKILLS } from '../../api/data/skills'
import * as U from '../../api/utils'
import { css } from '../../styled-system/css'
import { Flex } from '../components/flex'
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
  const panelsHeight = useAPIStore(s => s.panelsHeight)

  return (
    <div
      className={css({
        display: { base: 'none', sm: 'block' },
        my: '1',
        transition: '[width]',
        transitionDuration: 'slower',
        overflow: 'hidden',
      })}
      style={{
        width: showDebugWindow ? '20rem' : '0',
      }}
    >
      <Flex
        direction="column"
        sx={css({
          py: '1',
          rounded: 'sm',
          bg: 'gray.50',
          gap: '1',
          p: '2',
          h: 'full',
          w: 'full',
          fs: 'xs',
          overflow: 'auto',
        })}
        style={{
          maxHeight: panelsHeight ? `${panelsHeight}px` : 'auto',
        }}
      >
        <h1 className={css({ color: 'gray.700', fs: 'md' })}>Data</h1>

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

        <div className={css({ overflow: 'auto' })}>
          <PropList data={data} filter={search} showChangesOnly={showChangesOnly} />
          <PropChangedList data={data} filter={search} showChangesOnly={showChangesOnly} />
          <PropList data={dataExtra} filter={search} showChangesOnly={showChangesOnly} />
          <PropChangedList data={dataExtra} filter={search} showChangesOnly={showChangesOnly} />
        </div>
      </Flex>
    </div>
  )
}
