import React from 'react'
import { Pressable } from 'react-native'
import { Text } from 'react-native-magnus'
import type { AttributesValues } from '../../api/types/attributes'
import { prefixString } from '../../api/utils'
import { Center } from '../components/center'
import { HStack, VStack } from '../components/flex'
import {
  ATTR_PREFIX,
  MAX_ATTRIBUTE_VALUE,
  MIN_ATTRIBUTE_VAULE,
} from '../constants'
import Toast from 'react-native-toast-message'
import { Hoverable } from '../hoverable'
import { caretDown, caretUp } from '../icons'
import * as S from '../selectors'
import { useAPIStore } from '../store'
import { colors } from '../theme'
import { useToast } from '../hooks'

export const AttrValueSetter = (p: { name: keyof AttributesValues }) => {
  const toast = useToast()
  const setData = useAPIStore(s => s.setData)

  const baseValue = useAPIStore(
    s => s.data[`${prefixString(p.name, ATTR_PREFIX.BASE_ATTR)}`],
  )

  const totalValue = useAPIStore(s => S.getAttributeTotal(s, p.name))

  return (
    <HStack space={8}>
      <HStack bg="#181818" rounded="sm" space={4} pl={8} pr={8}>
        {`0${totalValue}`
          .slice(-2)
          .split('')
          .map((digit, index) => (
            <Text
              key={index.toString()}
              color={colors.gray50}
              fontSize={28}
              fontFamily="falloutx"
            >
              {digit}
            </Text>
          ))}
      </HStack>
      <VStack justifyContent="center" space={2}>
        <Hoverable>
          {({ isHovered }) => (
            <Center>
              <Pressable
                style={caretUp({ isHovered })}
                onPress={ev => {
                  ev.preventDefault()
                  ev.stopPropagation()

                  if (totalValue < MAX_ATTRIBUTE_VALUE) {
                    setData(
                      prefixString(p.name, ATTR_PREFIX.BASE_ATTR),
                      baseValue + 1,
                    )
                  } else {
                    toast.show('Max attribute level reached, you rock!')
                  }
                }}
              />
            </Center>
          )}
        </Hoverable>
        <Hoverable>
          {({ isHovered }) => (
            <Center>
              <Pressable
                style={caretDown({ isHovered })}
                onPress={ev => {
                  ev.preventDefault()
                  ev.stopPropagation()

                  if (baseValue > MIN_ATTRIBUTE_VAULE) {
                    setData(
                      prefixString(p.name, ATTR_PREFIX.BASE_ATTR),
                      baseValue - 1,
                    )
                  } else {
                    toast.show(
                      'Minimum attribute level reached, not your strongest side is it?',
                    )
                  }
                }}
              />
            </Center>
          )}
        </Hoverable>
      </VStack>
    </HStack>
  )
}
