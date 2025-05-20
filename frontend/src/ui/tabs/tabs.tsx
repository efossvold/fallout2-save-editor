import type { PropsWithChildren } from 'react'
import { Box, HStack } from '@chakra-ui/react'
import { Hoverable } from '../hoverable'
import { colors } from '../theme'
import * as E from '../editors'
import { LINE_HEIGHT } from '../constants'
import { useTabsStore } from './store'

const TabButton = (p: PropsWithChildren<{ index: number }>) => {
  const store = useTabsStore()
  return (
    <Hoverable>
      {({ isHovered }) => (
        <Box
          as="button"
          onClick={() => store.setIndex(p.index)}
          color={
            isHovered || p.index === store.index
              ? colors.gray[50]
              : colors.beige[500]
          }
          mb={LINE_HEIGHT}
        >
          {p.children}
        </Box>
      )}
    </Hoverable>
  )
}

export const Tabs = () => {
  const tabIndex = useTabsStore(s => s.index)

  return (
    <>
      <HStack justifyContent="space-between" w="100%">
        <TabButton index={0}>TRAITS</TabButton>
        <TabButton index={1}>REPUTATION</TabButton>
        <TabButton index={2}>KILLS</TabButton>
      </HStack>
      <Box
        maxH={['none', '168px']}
        overflowY="auto"
        className="styled-scrollbar"
      >
        {tabIndex === 0 && <E.TraitsEditor />}
        {tabIndex === 1 && <E.GVAREditor />}
        {tabIndex === 2 && <E.KillsEditor />}
      </Box>
    </>
  )
}
