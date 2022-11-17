import React, { PropsWithChildren } from 'react'
import { BackHandler } from 'react-native'
import { Box, Text, TextProps } from 'react-native-magnus'
import { getError } from '../api/utils'
import { IButton } from './components/button'
import { HStack, VStack } from './components/flex'
import { FileManager } from './File-Manager'
import { useDisclose, useToast } from './hooks'
import { Hoverable } from './hoverable'
import { Logo } from './icons'
import * as S from './selectors'
import { useAPIStore } from './store'
import { border, colors } from './theme'

export const IText = (p: PropsWithChildren<TextProps>) => (
  <Text color={p.color || 'gray600'} fontSize={12}>
    {p.children}
  </Text>
)

const InfoItem = (p: { name: string; value: string }) => (
  <HStack justifyContent="space-between">
    <IText>{p.name}</IText>
    <IText color={colors.gray400}>{p.value}</IText>
  </HStack>
)

export const Toolbar = () => {
  const save = useAPIStore(s => s.save)
  const data = useAPIStore(s => s.data)
  const inGameTimeText = useAPIStore(S.getInGameTimeText)
  const currentSaveFile = useAPIStore(s => s.currentSaveFile)
  const fileMgrDisclose = useDisclose()
  const toast = useToast()

  return (
    <>
      <HStack justifyContent="space-between" p={8} bg="gray50" rounded="sm">
        <Box ml={3} justifyContent="center">
          <Hoverable>
            {({ isHovered }) => (
              <Logo fill={isHovered ? colors.blue400 : colors.gray200} />
            )}
          </Hoverable>
        </Box>

        {currentSaveFile ? (
          <HStack
            justifyContent="space-between"
            alignItems="center"
            w="50%"
            pl={8}
            pr={8}
          >
            <VStack w="35%">
              <InfoItem
                name="Path"
                value={`${currentSaveFile?.split('/').slice(-2).join('/')}`}
              />
              <InfoItem name="In-game time" value={inGameTimeText} />
            </VStack>
            <VStack w="22%">
              <InfoItem name="Save name" value={data.saveName} />
              <InfoItem name="Game version" value={data.gameVersion} />
            </VStack>
          </HStack>
        ) : (
          <></>
        )}

        <HStack justifyContent="space-between" space={18}>
          <IButton onPress={fileMgrDisclose.onOpen}>Open</IButton>
          <IButton
            disabled={!currentSaveFile}
            onPress={async () => {
              try {
                if (currentSaveFile) {
                  await save(currentSaveFile)
                  toast.show('Save successful')
                }
              } catch (err) {
                toast.show(getError(err).message)
              }
            }}
          >
            Save
          </IButton>
          <IButton
            onPress={() => {
              BackHandler.exitApp()
            }}
          >
            Quit
          </IButton>
        </HStack>
      </HStack>
      <FileManager disclose={fileMgrDisclose} />
    </>
  )
}
