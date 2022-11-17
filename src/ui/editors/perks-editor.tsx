import React from 'react'
import { ScrollView } from 'react-native'
import { PERKS } from '../../api/data/perks'
import { keysOf, prefixString } from '../../api/utils'
import { VStack } from '../components/flex'
import { PanelHeader } from '../panel'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { LINE_HEIGHT, scrollViewStyle } from '../theme'
import { ValueSetter } from '../value-setter'

export const PerksEditor = () => {
  const setData = useAPIStore(s => s.setData)
  const perks = useAPIStore(S.getPerks)
  const adjustStatsFromPerk = useAPIStore(s => s.adjustStatsFromPerk)

  const perkKeysSorted = keysOf(PERKS).sort((a, b) => a.localeCompare(b))

  return (
    <>
      <PanelHeader text="PERKS" />
      <ScrollView style={scrollViewStyle(1)}>
        <VStack space={LINE_HEIGHT}>
          {perkKeysSorted.map(key => {
            const { name, ranks, desc } = PERKS[key]
            const perkKey = prefixString(key, 'perk')
            const value = perks[perkKey]

            // Filter out Fallout 1 perks
            if (
              desc
                .toLocaleLowerCase()
                .includes('unimplemented'.toLocaleLowerCase())
            ) {
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
                  setData(perkKey, level)
                }}
                onDecrease={() => {
                  const level = value - 1
                  adjustStatsFromPerk(perkKey, level)
                  setData(perkKey, level)
                }}
              />
            )
          })}
        </VStack>
      </ScrollView>
    </>
  )
}
