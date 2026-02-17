import { Button } from '@headlessui/react'
import { clsx } from 'clsx'
import { toast } from 'react-hot-toast'

import { useHelpTextStore } from './help-text/store'
import { useHoverColor } from './hooks'
import { Hoverable } from './hoverable'
import { caretLeft, caretRight } from './icons'

interface Props {
  name: string
  baseValue?: number
  bonusValue?: number
  valueText?: string
  helperTitle?: string
  helperText: string
  unit?: string
  onClick?: (ev: React.SyntheticEvent) => void
  onIncrease: () => void
  onDecrease: () => void
  color?: string
  hoverColor?: string
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

  const getColor = (isHovered: boolean) => {
    let defaultColor = clsx('text-green-600')

    defaultColor = dimOnZero && totalValue < 1 ? clsx('text-green-900') : clsx('text-green-200')

    return getHoverColor(isHovered, color ?? defaultColor, hoverColor)
  }

  const onIncreasePress = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (maxBaseValue && baseValue >= maxBaseValue) ||
      (maxBonusValue && bonusValue >= maxBonusValue) ||
      isMaxValue
    ) {
      if (maxValueMsg) {
        toast(maxValueMsg as string)
      }
      return
    }

    onIncrease()
  }

  const onDecreasePress = (ev: React.SyntheticEvent) => {
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
        toast(minValueMsg as string)
      }
      return
    }

    onDecrease()
  }

  return (
    <Hoverable
      onHover={() => setHelpText(helperTitle ?? name, helperText)}
      // onUnhover={() => clearHelpText()}
      className="w-full"
    >
      {({ isHovered }) => (
        <div className="flex justify-between">
          <p
            role="button"
            className={clsx(getColor(isHovered), onClick ? 'cursor-pointer' : 'cursor-default')}
            onClick={onClick}
            onKeyUp={onClick}
          >
            {name}.
          </p>
          <div className="flex flex-row items-center gap-0.5">
            {showControls && (
              <Hoverable>
                {({ isHovered: isBtnHovered }) => (
                  <div className="flex items-center">
                    <Button
                      className={clsx(
                        caretLeft({ isHovered: isBtnHovered }),
                        isHovered ? 'visible' : 'sm:invisible',
                        'relative top-px',
                      )}
                      onClick={onDecreasePress}
                    />
                  </div>
                )}
              </Hoverable>
            )}

            <p className={getColor(isHovered)}>{valueText ?? `${totalValue}${unit}`}</p>
            {showControls && (
              <Hoverable>
                {({ isHovered: isBtnHovered }) => (
                  <div className="flex flex-row items-center gap-0.5">
                    <Button
                      className={clsx(
                        caretRight({ isHovered: isBtnHovered }),
                        isHovered ? 'visible' : 'sm:invisible',
                        'relative top-px',
                      )}
                      onClick={onIncreasePress}
                    />
                  </div>
                )}
              </Hoverable>
            )}
          </div>
        </div>
      )}
    </Hoverable>
  )
}
