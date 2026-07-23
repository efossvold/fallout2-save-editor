import React from 'react'

import { PERKS } from '../../api/data/perks'
import { keysOf, prefixString } from '../../api/utils'
import { css, cx } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns/flex'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const PerksEditor = () => {
  const setProp = useAPIStore(s => s.setProp)
  const perks = useAPIStore(S.getPerks)
  const adjustStatsFromPerk = useAPIStore(s => s.adjustStatsFromPerk)

  const perkKeysSorted = keysOf(PERKS).toSorted((a, b) => a.localeCompare(b))

  return (
    <>
      <PanelHeader title="PERKS" />
      <div
        className={cx(
          css({
            maxH: { base: 'auto', sm: '[420px]' },
            overflowY: 'auto',
          }),
          'styled-scrollbar',
        )}
      >
        <div className={flex({ direction: 'column' })}>
          {perkKeysSorted.map(key => {
            const { name, ranks, desc } = PERKS[key]
            const perkKey = prefixString(key, 'perk')
            const value = perks[perkKey]

            // Filter out Fallout 1 perks
            if (desc.toLocaleLowerCase().includes('unimplemented'.toLocaleLowerCase())) {
              return <React.Fragment key={name} />
            }

            return (
              <ValueSetter
                key={key}
                name={`${name} ${ranks > 1 ? ` [${ranks}]` : ''}`}
                baseValue={value}
                maxBaseValue={ranks}
                helperText={desc}
                minValueMsg="You've already hit bottom in this perk"
                maxValueMsg="You're already acing this perk"
                onIncrease={() => {
                  const level = value + 1
                  adjustStatsFromPerk(perkKey, level)
                  setProp(perkKey, level)
                }}
                onDecrease={() => {
                  const level = value - 1
                  adjustStatsFromPerk(perkKey, level)
                  setProp(perkKey, level)
                }}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
