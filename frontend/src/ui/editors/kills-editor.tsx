import { VStack } from '@chakra-ui/react'

import { KILLS } from '../../api/data/kills'
import { keysOf, prefixString } from '../../api/utils'
import { ATTR_PREFIX, LINE_HEIGHT } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueSetter } from '../value-setter'

export const KillsEditor = () => {
  const setProp = useAPIStore(s => s.setProp)
  const kills = useAPIStore(S.getKills)
  const killKeysSorted = keysOf(KILLS).toSorted((a, b) => a.localeCompare(b))

  return (
    <VStack spacing={LINE_HEIGHT}>
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
              setProp(killKey, value + 1)
            }}
            onDecrease={() => {
              setProp(killKey, value - 1)
            }}
          />
        )
      })}
    </VStack>
  )
}
