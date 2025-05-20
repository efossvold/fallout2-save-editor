import { Box, HStack } from '@chakra-ui/react'
import { TRAITS } from '../../api/data/traits'
import { entries } from '../../api/utils'
import { MAX_TRAITS, LINE_HEIGHT } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueCheckbox } from '../value-checkbox'
import { useToaster } from '../hooks'

export const TraitsEditor = () => {
  const toast = useToaster()
  const setProp = useAPIStore(s => s.setProp)
  const traits = useAPIStore(S.getSelectedTraits)

  const maxTraitId = entries(TRAITS).reduce<number>(
    (acc, [_key, t]) => Math.max(t.id, acc),
    0,
  )

  const isValidTraitId = (id: number) => id >= 0 && id <= maxTraitId

  const hasMaxTraits = () => {
    if (traits.length === 0) {
      return true
    }
    return traits.filter(trait => isValidTraitId(trait)).length >= MAX_TRAITS
  }

  return (
    <HStack
      w="100%"
      justifyContent="space-between"
      flexWrap="wrap"
      spacing={LINE_HEIGHT}
    >
      {entries(TRAITS).map(([, trait], i) => (
        <Box key={trait.name} w="49%" mb={LINE_HEIGHT}>
          <ValueCheckbox
            name={trait.name}
            value={traits.includes(trait.id)}
            helperText={trait.desc}
            checkboxProps={{ mr: i % 2 === 0 ? 6 : 1 }}
            onCheck={() => {
              if (hasMaxTraits()) {
                toast.info(
                  `Woah, hold on there. Can't have more than 2 perks. This is a game limitation.`,
                )
                return
              }

              if (isValidTraitId(traits.at(0) ?? -1)) {
                setProp('trait2', trait.id)
              } else {
                setProp('trait1', trait.id)
              }
            }}
            onUncheck={() => {
              const index = traits.indexOf(trait.id)
              if (index === 0) {
                setProp('trait1', -1)
              } else {
                setProp('trait2', -1)
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
