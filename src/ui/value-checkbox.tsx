import React from 'react'
import { Pressable } from 'react-native'
import { Icon, Text } from 'react-native-magnus'
import { HStack } from './components/flex'
import { useHelpTextStore } from './help-text/store'
import { useHoverColor } from './hooks'
import { Hoverable } from './hoverable'

interface Props {
  name: string
  value: boolean
  helperText: string
  onCheck: () => void
  onUncheck: () => void
}

export const ValueCheckbox = (p: Props) => {
  const getColor = useHoverColor()
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <Hoverable
      onHover={() => setHelpText(p.name, p.helperText)}
      onUnhover={() => clearHelpText()}
    >
      {({ isHovered }) => (
        <HStack justifyContent="space-between">
          <Text color={getColor(isHovered, p.value ? 'green200' : 'green900')}>
            {p.name}
          </Text>
          <HStack alignItems="center">
            <Hoverable>
              {({ isHovered: isCheckboxHovered }) => (
                <Pressable
                  onPress={ev => {
                    ev.preventDefault()
                    ev.stopPropagation()

                    if (p.value) {
                      p.onUncheck()
                    } else {
                      p.onCheck()
                    }
                  }}
                >
                  <Icon
                    name={
                      p.value
                        ? 'checkbox-intermediate'
                        : 'checkbox-blank-outline'
                    }
                    fontFamily="MaterialCommunityIcons"
                    fontSize={14}
                    color={getColor(
                      isCheckboxHovered,
                      p.value || isHovered ? 'green200' : 'green900',
                      'gold400',
                    )}
                    rounded="md"
                    mt={1}
                    mr={10}
                  />
                </Pressable>
              )}
            </Hoverable>
          </HStack>
        </HStack>
      )}
    </Hoverable>
  )
}
