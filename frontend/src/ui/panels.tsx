import {
  Grid,
  GridItem,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { VERSION } from '../version'
import { SECTION_SPACING } from './constants'
import * as E from './editors'
import { Panel } from './panel'
import { Toolbar } from './toolbar'
import { Tabs } from './tabs'
import { HelpText } from './help-text'

export const Panels = () => {
  const maxWidth = useBreakpointValue({
    base: '520px',
    sm: '768px',
    md: '1200px',
  })
  const gridStyle = useBreakpointValue({
    base: {
      gridTemplateColumns: '100%',
      templateColumns: 'repeat(1)',
    },
    md: {
      gridTemplateColumns: '47% 1fr',
      templateColumns: 'repeat(2, 1fr)',
    },
  })

  return (
    <VStack
      w="100%"
      h="100vh"
      minW="500px"
      maxW={maxWidth}
      spacing={SECTION_SPACING}
      p={0.5}
      m="0 auto"
    >
      <Toolbar />
      <Grid {...gridStyle} gap={SECTION_SPACING} flex={1}>
        <GridItem>
          <Stack
            direction={['column', 'row']}
            h="100%"
            w="100%"
            align="stretch"
            spacing={SECTION_SPACING}
          >
            <VStack
              w={['100%', '47%']}
              align="stretch"
              spacing={SECTION_SPACING}
            >
              <Panel bg="brown.500">
                <E.AttributesEditor />
              </Panel>

              <Panel bg="gray.900" flex={1}>
                <E.PlayerXP />
              </Panel>
            </VStack>

            <VStack flex={1} align="stretch" spacing={SECTION_SPACING}>
              <Panel bg="gray.900">
                <E.HealthEditor />
              </Panel>

              <Panel bg="gray.900" flex={1}>
                <E.MiscStatsEditor />
              </Panel>
            </VStack>
          </Stack>
        </GridItem>

        <GridItem>
          <Stack
            direction={['column', 'row']}
            h="100%"
            w="100%"
            align="stretch"
            spacing={SECTION_SPACING}
          >
            <Panel bg="gray.900" w={['100%', '44%']}>
              <E.SkillsEditor />
            </Panel>
            <Panel bg="gray.900" flex={1}>
              <E.PerksEditor />
            </Panel>
          </Stack>
        </GridItem>

        <GridItem>
          <Panel bg="gray.900" h="100%">
            <Tabs />
          </Panel>
        </GridItem>
        <GridItem>
          <Panel bg="beige.500" h="100%" minHeight={['220px', 'none']}>
            <HelpText />
          </Panel>
          <Text
            fontSize={12}
            color="gray.600"
            position="absolute"
            right={3}
            bottom={1}
          >
            {VERSION}
          </Text>
        </GridItem>
      </Grid>
    </VStack>
  )
}
