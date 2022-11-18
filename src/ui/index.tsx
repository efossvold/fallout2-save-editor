import React, { useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { HStack, VStack } from './components/flex'
import { MIN_WIN_HEIGHT, MIN_WIN_WIDTH } from './constants'
import * as E from './editors'
import { getSaveDir, useFileMgrStore } from './File-Manager/store'
import { HelpText } from './help-text'
import { Panel } from './panel'
import { Tabs } from './tabs'
import { LINE_HEIGHT, toastConfig } from './theme'
import { Toolbar } from './toolbar'

const SPACE = 4

export const App = () => {
  const { setCurrentDir, currentDir } = useFileMgrStore()

  useEffect(() => {
    const fn = async () => {
      setCurrentDir(await getSaveDir())
    }
    fn()
  }, [setCurrentDir])

  return (
    <VStack
      bg="gray200"
      justifyContent="space-between"
      w={MIN_WIN_WIDTH}
      h={MIN_WIN_HEIGHT}
      space={LINE_HEIGHT}
      p={4}
    >
      <Toolbar />

      <HStack justifyContent="space-between" w="100%">
        <VStack w="23.5%" space={SPACE} alignItems="stretch">
          <Panel bg="brown500">
            <E.AttributesEditor />
          </Panel>

          <Panel bg="gray900">
            <E.PlayerXP />
          </Panel>
        </VStack>

        <VStack w="23.5%" space={SPACE} alignItems="stretch">
          <Panel bg="gray900">
            <E.HealthEditor />
          </Panel>

          <Panel bg="gray900" flex={1}>
            <E.MiscStatsEditor />
          </Panel>
        </VStack>

        <Panel bg="gray900" w="23.5%">
          <E.SkillsEditor />
        </Panel>

        <Panel bg="gray900" w="28%">
          <E.PerksEditor />
        </Panel>
      </HStack>

      <HStack justifyContent="space-between" w="100%" space={6}>
        <Panel bg="gray900" w="47.5%">
          <Tabs />
        </Panel>

        <Panel bg="beige500" flex={1}>
          <HelpText />
        </Panel>
      </HStack>

      <Toast config={toastConfig} />
    </VStack>
  )
}
