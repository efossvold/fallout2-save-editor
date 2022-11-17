import React, { useEffect, useRef, useState } from 'react'
import { TextInput } from 'react-native'
import { Box, Button, Input, Text } from 'react-native-magnus'
import { HStack, VStack } from './components/flex'
import { Modal, ModalHeader } from './components/modal'
import { useDisclose, useToast } from './hooks'
import { Hoverable } from './hoverable'
import { useAPIStore } from './store'
import { colors } from './theme'

export const NameChanger = (p: { name: string }) => {
  const setData = useAPIStore(s => s.setData)
  const disclose = useDisclose(false)
  const [name, setName] = useState(p.name)
  const inputRef = useRef<TextInput>(null)
  const toast = useToast()

  useEffect(() => {
    if (disclose.isOpen) {
      inputRef.current?.focus()
    } else {
      setName(p.name)
    }
  }, [disclose.isOpen, p.name])

  return (
    <Box>
      <Hoverable
        onPress={() => {
          disclose.onOpen()
        }}
      >
        {({ isHovered }) => (
          <Text color={isHovered ? colors.gray50 : colors.green200} mr={11}>
            {p.name}
          </Text>
        )}
      </Hoverable>
      <Modal disclosure={disclose} w={200}>
        <VStack space={8}>
          <ModalHeader>Character Name</ModalHeader>
          <Input
            ref={inputRef}
            rounded="sm"
            fontSize={20}
            value={name}
            onChangeText={setName}
          />
          <HStack justifyContent="space-between">
            <Button w={100} bg="gray900" onPress={disclose.onClose}>
              Close
            </Button>
            <Button
              w={100}
              bg="gray400"
              onPress={() => {
                setData('characterName', name)
                disclose.onClose()
                toast.show('Named successfully changed')
              }}
            >
              Save
            </Button>
          </HStack>
        </VStack>
      </Modal>
    </Box>
  )
}
