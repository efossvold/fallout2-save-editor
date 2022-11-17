import React from 'react'
import { Box, Text } from 'react-native-magnus'
import { TRAITS } from '../../api/data/traits'
import { entries } from '../../api/utils'
import { HStack } from '../components/flex'
import { MAX_TRAITS } from '../constants'
import { useToast } from '../hooks'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { colors, LINE_HEIGHT } from '../theme'
import { ValueCheckbox } from '../value-checkbox'

export const TraitsEditor = () => {
  const toast = useToast()
  const setData = useAPIStore(s => s.setData)
  const traits = useAPIStore(S.getSelectedTraits)

  const maxTraitId = entries(TRAITS).reduce<number>(
    (acc, [key, t]) => (t.id > acc ? t.id : acc),
    0,
  )

  const isValidTraitId = (id: number) => id >= 0 && id <= maxTraitId

  const hasMaxTraits = () => {
    if (!traits) {
      return true
    }
    return traits?.filter(isValidTraitId).length >= MAX_TRAITS
  }

  return (
    <HStack w="100%" justifyContent="space-between" flexWrap="wrap">
      {entries(TRAITS).map(([, trait]) => (
        <Box key={trait.name} w="49%" mb={LINE_HEIGHT}>
          <ValueCheckbox
            name={trait.name}
            value={traits.includes(trait.id)}
            helperText={trait.desc}
            onCheck={() => {
              if (hasMaxTraits()) {
                toast.show(
                  `Woah, hold on there. Can't have more than 2 perks. This is a game limitation.`,
                )
                return
              }

              if (!isValidTraitId(traits[0])) {
                setData('trait1', trait.id)
              } else {
                setData('trait2', trait.id)
              }
            }}
            onUncheck={() => {
              const index = traits.indexOf(trait.id)
              if (index === 0) {
                setData('trait1', -1)
              } else {
                setData('trait2', -1)
              }
            }}
          />
        </Box>
      ))}
      {/* Hack to aligned the last trait (Gifted) with the rest of the traits */}
      <Box w={12} />
    </HStack>
  )
}
