import { HStack, Text, Box, Center, Tooltip } from '@chakra-ui/react'
import { useHelpTextStore } from './help-text/store'
import { useHoverColor, useToaster } from './hooks'
import { Hoverable } from './hoverable'
import { caretLeft, caretRight } from './icons'
import type { TColor } from './theme'
import { colors } from './theme'
import { useIsMobile } from './theme/media-queries'
import { TOOLTIP_PROPS } from './constants'

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
  color?: string
  hoverColor?: string
  dimOnZero?: boolean
  minBaseValue?: number | undefined
  maxBaseValue?: number | undefined
  minBonusValue?: number | undefined
  maxBonusValue?: number | undefined
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
  maxBaseValue,
  minBonusValue,
  maxBonusValue,
  isMinValue,
  isMaxValue,
  minValueMsg = 'Min level reached',
  maxValueMsg = 'Max level reached',
  showControls = true,
}: Props) => {
  const isMobile = useIsMobile()
  const totalValue = baseValue + bonusValue
  const toast = useToaster()
  const getHoverColor = useHoverColor()
  const setHelpText = useHelpTextStore(s => s.setHelpText)

  const getColor = (isHovered: boolean) => {
    // eslint-disable-next-line prefer-destructuring
    let defaultColor: TColor = colors.green[600]

    defaultColor = dimOnZero && totalValue < 1 ? 'green.900' : 'green.200'

    return getHoverColor(isHovered, color ?? defaultColor, hoverColor)
  }

  const onIncreasePress = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (maxBaseValue && baseValue >= maxBaseValue) ||
      (maxBonusValue && bonusValue >= maxBonusValue) ||
      isMaxValue
    ) {
      if (maxValueMsg) {
        toast.info(maxValueMsg as string)
      }
      return
    }

    onIncrease()
  }

  const onDecreasePress = (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (
      (minBaseValue && baseValue <= minBaseValue) ||
      (minBonusValue && bonusValue <= minBonusValue) ||
      isMinValue
    ) {
      if (minValueMsg) {
        toast.info(minValueMsg as string)
      }
      return
    }

    onDecrease()
  }

  return (
    <Hoverable
      onHover={() => setHelpText(helperTitle ?? name, helperText)}
      // onUnhover={() => clearHelpText()}
      w="100%"
    >
      {({ isHovered }) => (
        <HStack justify="space-between">
          <Tooltip {...TOOLTIP_PROPS} label={helperText} isDisabled={!isMobile}>
            <Text color={getColor(isHovered)}>{name}</Text>
          </Tooltip>
          <HStack>
            {showControls && (
              <Hoverable>
                {({ isHovered: isBtnHovered }) => (
                  <Center>
                    {isHovered || isMobile ? (
                      <Box
                        as="button"
                        style={caretLeft({ isHovered: isBtnHovered })}
                        onClick={onDecreasePress}
                        position="relative"
                        top="1px"
                      />
                    ) : (
                      <Box w="11px" />
                    )}
                  </Center>
                )}
              </Hoverable>
            )}

            <Text color={getColor(isHovered)}>
              {valueText ?? `${totalValue}${unit}`}
            </Text>
            {showControls && (
              <Hoverable>
                {({ isHovered: isBtnHovered }) => (
                  <Center>
                    {isHovered || isMobile ? (
                      <Box
                        as="button"
                        style={caretRight({ isHovered: isBtnHovered })}
                        onClick={onIncreasePress}
                        position="relative"
                        top="1px"
                      />
                    ) : (
                      <Box w="11px" />
                    )}
                  </Center>
                )}
              </Hoverable>
            )}
          </HStack>
        </HStack>
      )}
    </Hoverable>
  )
}
