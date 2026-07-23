import { toast } from 'react-hot-toast'

import { TRAITS } from '../../api/data/traits'
import { entries } from '../../api/utils'
import { css } from '../../styled-system/css'
import { Flex } from '../components/flex'
import { MAX_TRAITS } from '../constants'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { ValueCheckbox } from '../value-checkbox'

export const TraitsEditor = () => {
  const setProp = useAPIStore(s => s.setProp)
  const traits = useAPIStore(S.getSelectedTraits)

  const maxTraitId = entries(TRAITS).reduce((acc, [_key, t]) => Math.max(t.id, acc), 0)

  const isValidTraitId = (id: number) => id >= 0 && id <= maxTraitId

  const hasMaxTraits = () => {
    if (traits.length === 0) {
      return true
    }
    return traits.filter(trait => isValidTraitId(trait)).length >= MAX_TRAITS
  }

  return (
    <Flex justify="space-between" wrap="wrap" sx={css({ w: 'full' })}>
      {entries(TRAITS).map(([, trait]) => (
        <div key={trait.name} className={css({ w: { base: 'full', md: '[45%]' } })}>
          <ValueCheckbox
            name={trait.name}
            value={traits.includes(trait.id)}
            helperText={trait.desc}
            onCheck={() => {
              if (hasMaxTraits()) {
                toast(
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
        </div>
      ))}
    </Flex>
  )
}
