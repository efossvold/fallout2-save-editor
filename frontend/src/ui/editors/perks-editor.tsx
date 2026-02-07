import { Box, VStack } from '@chakra-ui/react'
import React from 'react'

import { PERKS } from '../../api/data/perks'
import { keysOf, prefixString } from '../../api/utils'
import { LINE_HEIGHT } from '../constants'
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
      <PanelHeader text="PERKS" />
      <Box overflowY="auto" maxH={['none', '420px']} className="styled-scrollbar">
        <VStack spacing={LINE_HEIGHT}>
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
                name={`${name} `.concat(ranks > 1 ? ` [${ranks}]` : '')}
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
        </VStack>
      </Box>
    </>
  )
}
