import { useEffect, useRef, useState } from 'react'
import type { UseDisclosureReturn } from '@chakra-ui/react'
import {
  HStack,
  Text,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { Hoverable } from './hoverable'
import { useAPIStore } from './store'
import { colors } from './theme'

export const NameChanger = (p: { name: string }) => {
  const disclosure = useDisclosure()

  return (
    <>
      <Hoverable
        onClick={() => {
          disclosure.onOpen()
        }}
      >
        {({ isHovered }) => (
          <Text
            color={isHovered ? colors.gray[50] : colors.green[200]}
            mr={11}
            cursor="pointer"
          >
            {p.name}
          </Text>
        )}
      </Hoverable>
      <NameChangerModal initialValue={p.name} disclosure={disclosure} />
    </>
  )
}

const NameChangerModal = (p: {
  initialValue: string
  disclosure: UseDisclosureReturn
}) => {
  const setProp = useAPIStore(s => s.setProp)
  const [name, setName] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const [isInitialValueSet, setIsInitialValueSet] = useState(false)

  useEffect(() => {
    if (p.disclosure.isOpen && !isInitialValueSet) {
      setIsInitialValueSet(true)
      setName(p.initialValue)
    } else if (!p.disclosure.isOpen) {
      setIsInitialValueSet(false)
    }
  }, [isInitialValueSet, p.disclosure.isOpen, p.initialValue])

  return (
    <Modal
      isOpen={p.disclosure.isOpen}
      onClose={p.disclosure.onClose}
      initialFocusRef={inputRef}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color="gray.600">Character Name</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack>
            <Input
              ref={inputRef}
              rounded="sm"
              fontSize={20}
              value={name}
              onChange={ev => setName(ev.target.value)}
            />
            <HStack justifyContent="flex-end" w="100%" spacing={4}>
              <Button w={100} bg="gray.100" onClick={p.disclosure.onClose}>
                Close
              </Button>
              <Button
                w={100}
                bg="gray.400"
                onClick={() => {
                  setProp('characterName', name)
                  p.disclosure.onClose()
                }}
              >
                Save
              </Button>
            </HStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
