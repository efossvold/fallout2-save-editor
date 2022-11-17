import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import * as RNFS from 'react-native-fs'
import { Box, Icon, Text } from 'react-native-magnus'
import { IButton } from '../components/button'
import { Center } from '../components/center'
import { HStack, VStack } from '../components/flex'
import { Modal, ModalFooter, ModalHeader } from '../components/modal'
import { Disclosure } from '../hooks'
import { border, LINE_HEIGHT, scrollViewStyle } from '../theme'
import { DirectoryList } from './directory-list'
import { FileList } from './file-list'
import { ParentDir } from './parent-dir'
import { useFileMgrStore } from './store'
import { dirFilter, fileFilter } from './utils'

type Props = {
  disclose: Disclosure
}

export const FileManager = (p: Props) => {
  const currentDir = useFileMgrStore(s => s.currentDir)
  const setFiles = useFileMgrStore(s => s.setFiles)
  const setDirectories = useFileMgrStore(s => s.setDirectories)
  const error = useFileMgrStore(s => s.error)
  const setError = useFileMgrStore(s => s.setError)

  useEffect(() => {
    if (p.disclose.isOpen) {
      RNFS.readDir(currentDir).then(res => {
        setFiles(res.filter(fileFilter).map(f => f.path.trim()))
        setDirectories(res.filter(dirFilter).map(f => f.path.trim()))
      })
    }
  }, [currentDir, p.disclose.isOpen, setDirectories, setFiles])

  useEffect(() => {
    // Reset error when closing
    if (!p.disclose.isOpen) {
      setError(null)
    }
  }, [p.disclose.isOpen, setError])

  return (
    <Center>
      <Modal disclosure={p.disclose} w={600}>
        <ModalHeader>Load Savegame</ModalHeader>
        <VStack space={LINE_HEIGHT} mb={16}>
          <HStack alignItems="center">
            <Icon name="folder1" fontFamily="AntDesign" fontSize={14} mr={4} />
            <Text>{currentDir}</Text>
          </HStack>
          <ScrollView style={scrollViewStyle(346)}>
            <ParentDir />
            <DirectoryList />
            <FileList disclose={p.disclose} />
          </ScrollView>
        </VStack>

        {error && (
          <HStack justifyContent="center">
            <Text mt={8} mb={8} color="#f00" w="80%" textAlign="center">
              {error}
            </Text>
          </HStack>
        )}

        <ModalFooter>
          <IButton
            onPress={() => {
              p.disclose.onClose()
            }}
          >
            Cancel
          </IButton>
          <IButton
            onPress={() => {
              p.disclose.onClose()
            }}
          >
            Load
          </IButton>
        </ModalFooter>
      </Modal>
    </Center>
  )
}
