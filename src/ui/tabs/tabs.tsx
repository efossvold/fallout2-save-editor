import React, { PropsWithChildren } from 'react'
import { Pressable } from 'react-native'
import { Box, Text } from 'react-native-magnus'
import { HStack } from '../components/flex'
import * as E from '../editors'
import { Hoverable } from '../hoverable'
import { colors, LINE_HEIGHT } from '../theme'
import { useTabsStore } from './store'

const TabButton = (p: PropsWithChildren<{ index: number }>) => {
  const store = useTabsStore()
  return (
    <Hoverable>
      {({ isHovered }) => (
        <Pressable onPress={() => store.setIndex(p.index)}>
          <Text
            color={
              isHovered || p.index === store.index
                ? colors.gray50
                : colors.beige500
            }
            mb={LINE_HEIGHT}
          >
            {p.children}
          </Text>
        </Pressable>
      )}
    </Hoverable>
  )
}

export const Tabs = () => {
  const tabIndex = useTabsStore(s => s.index)
  return (
    <Box>
      <HStack justifyContent="space-between" w="100%">
        <TabButton index={0}>TRAITS</TabButton>
        <TabButton index={1}>REPUTATION</TabButton>
        <TabButton index={2}>KILLS</TabButton>
      </HStack>
      <Box>
        {tabIndex === 0 && <E.TraitsEditor />}
        {tabIndex === 1 && <E.GVAREditor />}
        {tabIndex === 2 && <E.KillsEditor />}
      </Box>
    </Box>
  )
}
