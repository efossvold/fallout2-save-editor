import { VStack } from '@chakra-ui/react'

import { GVARS } from '../../api/data/gvar'
import { keysOf, prefixString } from '../../api/utils'
import { ATTR_PREFIX, LINE_HEIGHT } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const GVAREditor = () => {
  const setProp = useAPIStore(s => s.setProp)
  const gvars = useAPIStore(S.getGVARs)
  const gvarKeysSorted = keysOf(GVARS).toSorted((a, b) => a.localeCompare(b))

  return (
    <VStack spacing={LINE_HEIGHT}>
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
              setProp(gvarKey, value + 1)
            }}
            onDecrease={() => {
              setProp(gvarKey, value - 1)
            }}
          />
        )
      })}
    </VStack>
  )
}
