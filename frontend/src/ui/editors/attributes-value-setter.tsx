import { Box, Center, HStack, Text, VStack } from '@chakra-ui/react'

import type { AttributesValues } from '../../api/types/attributes'
import { prefixString } from '../../api/utils'
import { ATTR_PREFIX, MAX_ATTRIBUTE_VALUE, MIN_ATTRIBUTE_VAULE } from '../constants'
import { useToaster } from '../hooks'
import { Hoverable } from '../hoverable'
import { caretDown, caretUp } from '../icons'
import * as S from '../selectors'
import { useAPIStore } from '../store'

export const AttrValueSetter = (p: { name: keyof AttributesValues }) => {
  const toast = useToaster()
  const setProp = useAPIStore(s => s.setProp)

  const baseValue = useAPIStore(s => s.data[prefixString(p.name, ATTR_PREFIX.BASE_ATTR)])

  const totalValue = useAPIStore(s => S.getAttributeTotal(s, p.name))

  return (
    <HStack spacing={2}>
      <HStack bg="#181818" rounded={4} spacing={2} px={2}>
        {/* oxlint-disable-next-line unicorn/prefer-spread */}
        {`0${totalValue}`
          .slice(-2)
          .split('')
          .map((digit, index) => (
            <Text
              key={index.toString()}
              color="gray.50"
              fontSize={[32, 24]}
              fontFamily="falloutx"
              lineHeight={1.25}
            >
              {digit}
            </Text>
          ))}
      </HStack>
      <VStack justifyContent="center" spacing={1}>
        <Hoverable>
          {({ isHovered }) => (
            <Center>
              <Box
                as="button"
                style={caretUp({ isHovered })}
                onClick={(ev: React.SyntheticEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()

                  if (totalValue < MAX_ATTRIBUTE_VALUE) {
                    setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue + 1)
                  } else {
                    toast.info('Max attribute level reached, you rock!')
                  }
                }}
              />
            </Center>
          )}
        </Hoverable>
        <Hoverable>
          {({ isHovered }) => (
            <Center>
              <Box
                as="button"
                style={caretDown({ isHovered })}
                onClick={(ev: React.SyntheticEvent) => {
                  ev.preventDefault()
                  ev.stopPropagation()

                  if (baseValue > MIN_ATTRIBUTE_VAULE) {
                    setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue - 1)
                  } else {
                    toast.info('Minimum attribute level reached, not your strongest side is it?')
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
