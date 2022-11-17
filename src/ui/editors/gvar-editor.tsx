import React from 'react'
import { ScrollView } from 'react-native'
import { GVARS } from '../../api/data/gvar'
import { keysOf, prefixString } from '../../api/utils'
import { VStack } from '../components/flex'
import { ATTR_PREFIX } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { LINE_HEIGHT, tabsScrollViewStyle } from '../theme'
import { ValueSetter } from '../value-setter'

export const GVAREditor = () => {
  const setData = useAPIStore(s => s.setData)
  const gvars = useAPIStore(S.getGVARs)
  const gvarKeysSorted = keysOf(GVARS).sort((a, b) => a.localeCompare(b))

  return (
    <ScrollView style={tabsScrollViewStyle}>
      <VStack space={LINE_HEIGHT}>
        {gvarKeysSorted.map(key => {
          const { name, maxValue, desc } = GVARS[key]
          const gvarKey = prefixString(key, ATTR_PREFIX.GVAR)
          const value = gvars[gvarKey]

          return (
            <ValueSetter
              key={key}
              name={name}
              baseValue={value}
              minValueMsg="Cannot ressurect what has not been killed yet"
              maxBaseValue={maxValue}
              helperText={desc}
              onIncrease={() => {
                setData(gvarKey, value + 1)
              }}
              onDecrease={() => {
                setData(gvarKey, value - 1)
              }}
            />
          )
        })}
      </VStack>
    </ScrollView>
  )
}
