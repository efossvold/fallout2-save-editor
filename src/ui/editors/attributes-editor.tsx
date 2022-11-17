import React from 'react'
import { Text } from 'react-native-magnus'
import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { HStack, VStack } from '../components/flex'
import { useHelpTextStore } from '../help-text/store'
import { Hoverable } from '../hoverable'
import { colors } from '../theme'
import { AttrValueSetter } from './attributes-value-setter'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <VStack space={8}>
      {entries(ATTRIBUTES).map(([name, attr]) => (
        <Hoverable
          key={name}
          onHover={() =>
            setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)
          }
          onUnhover={() => clearHelpText()}
        >
          {({ isHovered }) => (
            <HStack justifyContent="space-between">
              <Text
                flex={1}
                color={isHovered ? colors.gray50 : colors.gold400}
                fontSize={24}
                fontWeight="bold"
                fontFamily="fallouty"
              >
                {attr.name}
              </Text>
              <AttrValueSetter name={name} />
            </HStack>
          )}
        </Hoverable>
      ))}
    </VStack>
  )
}
