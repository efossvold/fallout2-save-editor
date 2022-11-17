import React from 'react'
import { ScrollView, StyleProp, ViewStyle } from 'react-native'
import { KILLS } from '../../api/data/kills'
import { keysOf, prefixString } from '../../api/utils'
import { VStack } from '../components/flex'
import { ATTR_PREFIX } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { LINE_HEIGHT, tabsScrollViewStyle } from '../theme'
import { ValueSetter } from '../value-setter'

export const KillsEditor = () => {
  const setData = useAPIStore(s => s.setData)
  const kills = useAPIStore(S.getKills)
  const killKeysSorted = keysOf(KILLS).sort((a, b) => a.localeCompare(b))

  return (
    <ScrollView style={tabsScrollViewStyle}>
      <VStack space={LINE_HEIGHT}>
        {killKeysSorted.map(key => {
          const { name, desc } = KILLS[key]
          const killKey = prefixString(key, ATTR_PREFIX.KILL)
          const value = kills[killKey]

          return (
            <ValueSetter
              key={key}
              name={name}
              baseValue={value}
              helperText={desc}
              minValueMsg="Cannot ressurect what has not been killed yet"
              onIncrease={() => {
                setData(killKey, value + 1)
              }}
              onDecrease={() => {
                setData(killKey, value - 1)
              }}
            />
          )
        })}
      </VStack>
    </ScrollView>
  )
}
