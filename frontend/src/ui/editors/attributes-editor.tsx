import { HStack, Text, Tooltip, VStack } from '@chakra-ui/react'
import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { useHelpTextStore } from '../help-text/store'
import { Hoverable } from '../hoverable'
import { AttrValueSetter } from './attributes-value-setter'
import { colors } from '../theme'
import { useIsMobile } from '../theme/media-queries'
import { TOOLTIP_PROPS } from '../constants'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)
  const isMobile = useIsMobile()

  return (
    <VStack spacing={1} align="flex-start">
      {entries(ATTRIBUTES).map(([name, attr]) => (
        <Hoverable
          key={name}
          onHover={() =>
            setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)
          }
          onUnhover={() => clearHelpText()}
          w="100%"
        >
          {({ isHovered }) => (
            <HStack justifyContent="space-between">
              <Text
                flex={1}
                color={isHovered ? colors.gray[50] : colors.gold[400]}
                fontSize={[24, 20]}
                fontFamily="fallouty"
                textAlign="left"
                position="relative"
                top="-1px"
              >
                <Tooltip
                  {...TOOLTIP_PROPS}
                  label={ATTRIBUTES[name].desc}
                  isDisabled={!isMobile}
                >
                  {attr.name}
                </Tooltip>
              </Text>
              <AttrValueSetter name={name} />
            </HStack>
          )}
        </Hoverable>
      ))}
    </VStack>
  )
}
