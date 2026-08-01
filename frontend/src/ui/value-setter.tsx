// import { toast } from 'react-hot-toast'

import type { ColorToken } from '~/styled-system/tokens'
import type { IInteractionEvent } from '~/types'

import { css, cx } from '../styled-system/css'
import { Flex } from './components/layout'
import { useHelpTextStore } from './help-text/store'
import { useHoverColor } from './hooks/use-hover-color'
import { Hoverable } from './hoverable'
import { caretLeft, caretRight } from './icons'
import { getColorToken } from './utils'

interface Props {
  name: string
  baseValue?: number
  bonusValue?: number
  valueText?: string
  helperTitle?: string
  helperText: string
  unit?: string
  onClick?: (ev: IInteractionEvent) => void
  onIncrease: () => void
  onDecrease: () => void
  color?: ColorToken
  hoverColor?: ColorToken
  dimOnZero?: boolean
  minValue?: number
  minBaseValue?: number
  maxBaseValue?: number
  minBonusValue?: number
  maxBonusValue?: number
  isMinValue?: boolean
  isMaxValue?: boolean
  minValueMsg?: string | boolean
  maxValueMsg?: string | boolean
  showControls?: boolean
}

export const ValueSetter = ({
  name,
  baseValue = 0,
  bonusValue = 0,
  valueText,
  helperTitle,
  helperText,
  unit = '',
  onClick,
  onIncrease,
  onDecrease,
  color,
  hoverColor,
  dimOnZero = true,
  minValue = 0,
  minBaseValue = 0,
  maxBaseValue,
  minBonusValue,
  maxBonusValue,
  isMinValue,
  isMaxValue,
  minValueMsg = 'Min level reached',
  maxValueMsg = 'Max level reached',
  showControls = true,
}: Props) => {
  const totalValue = baseValue + bonusValue
  const getHoverColor = useHoverColor()
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  const getColor = (isHovered: boolean) => {
    const defaultColor =
      dimOnZero && totalValue < 1 ? getColorToken('green.900') : getColorToken('green.200')

    return getHoverColor(isHovered, color ?? defaultColor, hoverColor)
  }

  const onIncreasePress = (ev: IInteractionEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (maxBaseValue && baseValue >= maxBaseValue) ||
      (maxBonusValue && bonusValue >= maxBonusValue) ||
      isMaxValue
    ) {
      if (maxValueMsg) {
        alert(maxValueMsg as string)
        // toast(maxValueMsg as string)
      }
      return
    }

    onIncrease()
  }

  const onDecreasePress = (ev: IInteractionEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    const totValue = baseValue + bonusValue

    if (
      totValue <= minValue ||
      (minBaseValue && baseValue <= minBaseValue) ||
      (minBonusValue && bonusValue <= minBonusValue) ||
      (minBaseValue && minBaseValue >= baseValue + bonusValue) ||
      isMinValue
    ) {
      if (minValueMsg) {
        alert(minValueMsg as string)
        // toast(minValueMsg as string)
      }
      return
    }

    onDecrease()
  }

  return (
    <Hoverable
      onHover={() => setHelpText(helperTitle ?? name, helperText)}
      onUnhover={() => clearHelpText()}
      className={css({ w: 'full' })}
    >
      {({ isHovered }) => (
        <Flex justify="space-between">
          <div
            role="button"
            tabIndex={0}
            data-hover={isHovered}
            data-onclick={Boolean(onClick)}
            data-highlight={dimOnZero && totalValue < 1}
            style={{ color: getColor(isHovered) }}
            className={css({ '&[data-onclick=true]': { cursor: 'pointer' } })}
            onClick={ev => {
              if (onClick) {
                onClick(ev)
              }
            }}
            onKeyUp={ev => {
              if (onClick) {
                onClick(ev)
              }
            }}
          >
            {name}.
          </div>

          <Flex justifyItems="center" gap="0.5">
            {showControls && (
              <Flex justifyItems="center" alignItems="center">
                <button
                  aria-label={`Decrease ${name}`}
                  data-parent-hover={isHovered}
                  className={cx(
                    caretLeft(),
                    css({
                      pos: 'relative',
                      top: { base: '0.25', sm: '0' },
                      visibility: { base: 'visible', sm: 'hidden' },
                      _parentHover: { visibility: 'visible' },
                    }),
                  )}
                  onClick={onDecreasePress}
                />
              </Flex>
            )}

            <p style={{ color: getColor(isHovered) }}>{valueText ?? `${totalValue}${unit}`}</p>

            {showControls && (
              <Flex justifyItems="center" alignItems="center" gap="0.5">
                <button
                  aria-label={`Increase ${name}`}
                  data-parent-hover={isHovered}
                  className={cx(
                    caretRight(),
                    css({
                      pos: 'relative',
                      top: { base: '0.25', sm: '0' },
                      visibility: { base: 'visible', sm: 'hidden' },
                      cursor: 'pointer',
                      _parentHover: { visibility: 'visible' },
                    }),
                  )}
                  onClick={onIncreasePress}
                />
              </Flex>
            )}
          </Flex>
        </Flex>
      )}
    </Hoverable>
  )
}
