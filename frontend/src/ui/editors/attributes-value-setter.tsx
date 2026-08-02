// import { toast } from 'react-hot-toast'

import { useState } from 'octane'

import type { IInteractionEvent } from '~/types'

import { flex } from '~/styled-system/patterns'

import type { AttributesValues } from '../../api/types/attributes'

import { captializeFirstLetter, prefixString } from '../../api/utils'
import { css } from '../../styled-system/css'
import { Flex, Grid } from '../components/layout'
import { ATTR_PREFIX, MAX_ATTRIBUTE_VALUE, MIN_ATTRIBUTE_VAULE } from '../constants'
import { caretStyle } from '../icons'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { onMatchKey } from '../utils'

export const AttrValueSetter = (p: { name: keyof AttributesValues }) => {
  const setProp = useAPIStore(s => s.setProp)
  const baseValue = useAPIStore(s => s.data[prefixString(p.name, ATTR_PREFIX.BASE_ATTR)])
  const totalValue = useAPIStore(s => S.getAttributeTotal(s, p.name))
  const [isArrowUpKeyPressed, setIsArrowUpKeyPressed] = useState(false)
  const [isArrowDownKeyPressed, setIsArrowDownKeyPressed] = useState(false)

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
    <div
      className={flex({
        justify: 'space-between',
        alignItems: 'center',
      })}
      role="button"
      tabIndex={0}
      aria-label={p.name}
      onKeyDown={ev => {
        onMatchKey(ev, ['ArrowUp', 'ArrowRight'], () => {
          setIsArrowUpKeyPressed(true)
        })
        onMatchKey(ev, ['ArrowDown', 'ArrowLeft'], () => {
          setIsArrowDownKeyPressed(true)
        })
      }}
      onKeyUp={ev => {
        onMatchKey(ev, ['ArrowUp', 'ArrowRight'], () => {
          setIsArrowUpKeyPressed(false)
          onValueUp(ev)
        })
        onMatchKey(ev, ['ArrowDown', 'ArrowLeft'], () => {
          setIsArrowDownKeyPressed(false)
          onValueDown(ev)
        })
      }}
    >
      <div
        className={flex({
          fs: { base: '2xl', sm: 'xl' },
          textAlign: 'left',
          color: { base: 'gold.400', _hover: 'gray.50' },
        })}
      >
        {captializeFirstLetter(p.name)}
      </div>

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
            aria-label={`Increase ${p.name}`}
            tabIndex={0}
            data-active={isArrowUpKeyPressed}
            className={caretStyle({ size: 'large', direction: 'up' })}
            onClick={onValueUp}
            onKeyUp={ev => {
              onMatchKey(ev, ['ArrowUp', 'ArrowRight', 'Space', 'Enter'], onValueUp)
            }}
          />
          <div
            role="button"
            aria-label={`Decrease ${p.name}`}
            tabIndex={0}
            data-active={isArrowDownKeyPressed}
            className={caretStyle({ size: 'large', direction: 'down' })}
            onClick={onValueDown}
            onKeyUp={ev => {
              onMatchKey(ev, ['ArrowDown', 'ArrowLeft', 'Space', 'Enter'], onValueUp)
            }}
          />
        </Grid>
      </Flex>
    </div>
  )
}
