// oxlint-disable jsx-a11y/control-has-associated-label
// import { toast } from 'react-hot-toast'

import type { IInteractionEvent } from '~/types'

import type { AttributesValues } from '../../api/types/attributes'

import { prefixString } from '../../api/utils'
import { css, cx } from '../../styled-system/css'
import { Flex, Grid } from '../components/layout'
import { ATTR_PREFIX, MAX_ATTRIBUTE_VALUE, MIN_ATTRIBUTE_VAULE } from '../constants'
import { caretDown, caretUp } from '../icons'
import * as S from '../selectors'
import { useAPIStore } from '../store'

export const AttrValueSetter = (p: { name: keyof AttributesValues }) => {
  const setProp = useAPIStore(s => s.setProp)

  const baseValue = useAPIStore(s => s.data[prefixString(p.name, ATTR_PREFIX.BASE_ATTR)])

  const totalValue = useAPIStore(s => S.getAttributeTotal(s, p.name))

  const onValueUp = (ev: IInteractionEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (totalValue < MAX_ATTRIBUTE_VALUE) {
      setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue + 1)
    } else {
      alert('Max attribute level reached, you rock!')
      // toast('Max attribute level reached, you rock!')
    }
  }

  const onValueDown = (ev: IInteractionEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (totalValue > MIN_ATTRIBUTE_VAULE) {
      setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue - 1)
    } else {
      alert('Minimum attribute level reached, not your strongest side is it?')
      // toast('Minimum attribute level reached, not your strongest side is it?')
    }
  }

  return (
    <Flex gap="2" alignItems="center">
      <Flex
        gap="2"
        sx={css({
          px: '2',
          rounded: 'sm',
          bg: 'gray.800',
        })}
      >
        {/* oxlint-disable-next-line unicorn/prefer-spread */}
        {`0${totalValue}`
          .slice(-2)
          .split('')
          .map((digit, index) => (
            <div
              className={css({
                color: 'gray.50',
                fs: { base: '[32px]', sm: '2xl' },
                lineHeight: 'tight',
                fontFamily: 'falloutx',
              })}
              // oxlint-disable-next-line react/no-array-index-key
              key={index.toString()}
            >
              {digit}
            </div>
          ))}
      </Flex>
      <Grid gap="2">
        <div
          role="button"
          tabIndex={0}
          className={cx(caretUp(), css({ cursor: 'pointer' }))}
          onClick={onValueUp}
          onKeyUp={onValueUp}
        />
        <div
          role="button"
          tabIndex={0}
          className={cx(caretDown(), css({ cursor: 'pointer' }))}
          onClick={onValueDown}
          onKeyUp={onValueDown}
        />
      </Grid>
    </Flex>
  )
}
