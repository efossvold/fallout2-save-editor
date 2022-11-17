import React from 'react'
import { GestureResponderEvent, Pressable } from 'react-native'
import { Box, Text } from 'react-native-magnus'
import { HStack } from './components/flex'
import { useHelpTextStore } from './help-text/store'
import { useHoverColor, useToast } from './hooks'
import { Hoverable } from './hoverable'
import { caretLeft, caretRight } from './icons'
import { Color } from './theme'

interface Props {
  name: string
  baseValue: number
  bonusValue?: number
  valueText?: string
  helperTitle?: string
  helperText: string
  unit?: string
  onIncrease: () => void
  onDecrease: () => void
  color?: Color
  hoverColor?: Color
  dimOnZero?: boolean
  minBaseValue?: number | null
  maxBaseValue?: number | null
  minBonusValue?: number | null
  maxBonusValue?: number | null
  isMinValue?: boolean
  isMaxValue?: boolean
  minValueMsg?: string | boolean
  maxValueMsg?: string | boolean
  showControls?: boolean
}

export const ValueSetter = ({
  name,
  baseValue,
  bonusValue = 0,
  valueText,
  helperTitle,
  helperText,
  unit = '',
  onIncrease,
  onDecrease,
  color,
  hoverColor,
  dimOnZero = true,
  minBaseValue = 0,
  maxBaseValue = null,
  minBonusValue = null,
  maxBonusValue = null,
  isMinValue,
  isMaxValue,
  minValueMsg = 'Min level reached',
  maxValueMsg = 'Max level reached',
  showControls = true,
}: Props) => {
  const totalValue = baseValue + bonusValue
  const toast = useToast()
  const getHoverColor = useHoverColor()
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  const getColor = (isHovered: boolean) => {
    let defaultColor: Color = 'green600'

    if (dimOnZero && totalValue < 1) {
      defaultColor = 'green900'
    } else {
      defaultColor = 'green200'
    }

    return getHoverColor(isHovered, color || defaultColor, hoverColor)
  }

  const onIncreasePress = (ev: GestureResponderEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (maxBaseValue !== null && baseValue >= maxBaseValue) ||
      (maxBonusValue !== null && bonusValue >= maxBonusValue) ||
      isMaxValue
    ) {
      if (maxValueMsg) {
        toast.show(maxValueMsg as string)
      }
      return
    }

    onIncrease()
  }

  const onDecreasePress = (ev: GestureResponderEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (minBaseValue !== null && baseValue <= minBaseValue) ||
      (minBonusValue !== null && bonusValue <= minBonusValue) ||
      isMinValue
    ) {
      if (minValueMsg) {
        toast.show(minValueMsg as string)
      }
      return
    }

    onDecrease()
  }

  return (
    <Hoverable
      onHover={() => setHelpText(helperTitle || name, helperText)}
      onUnhover={() => clearHelpText()}
    >
      {({ isHovered }) => (
        <HStack justifyContent="space-between">
          <Text color={getColor(isHovered)}>{name}</Text>
          <HStack justifyContent="space-between">
            <HStack alignItems="center">
              {showControls && isHovered && (
                <Hoverable>
                  {({ isHovered: isBtnHovered }) => (
                    <Pressable
                      style={caretLeft({ isHovered: isBtnHovered })}
                      onPress={onDecreasePress}
                    />
                  )}
                </Hoverable>
              )}

              <Text color={getColor(isHovered)}>
                {valueText || `${totalValue}${unit}`}
              </Text>
              <Box w={12}>
                {showControls && isHovered && (
                  <Box justifyContent="space-between">
                    <Hoverable>
                      {({ isHovered: isBtnHovered }) => (
                        <Pressable
                          style={caretRight({ isHovered: isBtnHovered })}
                          onPress={onIncreasePress}
                        />
                      )}
                    </Hoverable>
                  </Box>
                )}
              </Box>
            </HStack>
          </HStack>
        </HStack>
      )}
    </Hoverable>
  )
}
