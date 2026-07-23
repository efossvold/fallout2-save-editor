import { useState } from 'react'

import type { UseDisclosureReturn } from './hooks/use-disclosure'

import { css } from '../styled-system/css'
import { HStack } from '../styled-system/jsx'
import { flex } from '../styled-system/patterns/flex'
import { ModalButton } from './components/buttons'
import { InputField } from './components/input-field'
import { MAX_CHARACTER_NAME_LENGTH } from './constants'
import { useDisclosure } from './hooks/use-disclosure'
import Modal from './modal'
import { useAPIStore } from './store'

const NameChangerModal = (p: { initialValue: string; disclosure: UseDisclosureReturn }) => {
  const { isOpen, onClose } = p.disclosure
  const setProp = useAPIStore(s => s.setProp)
  const characterName = useAPIStore(s => s.data.characterName)
  const [name, setName] = useState(characterName)
  const [isInitialValueSet, setIsInitialValueSet] = useState(false)

  if (!isInitialValueSet && p.initialValue.length > 0) {
    setName(p.initialValue.replaceAll('\x00', ''))
    setIsInitialValueSet(true)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <label htmlFor="character-name" className={css({ display: 'block', fs: 'xl' })}>
        Character Name
      </label>
      <InputField
        name="character-name"
        value={name}
        onChange={ev => {
          setName(ev.target.value)
        }}
        size="lg"
        variant="dark"
        maxLength={MAX_CHARACTER_NAME_LENGTH}
        // oxlint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
      />
      <HStack gap="4" justify="flex-end" className={css({ mt: '4' })}>
        <ModalButton onClick={onClose} kind="secondary">
          Close
        </ModalButton>
        <ModalButton
          kind="primary"
          onClick={() => {
            setProp('characterName', name.slice(0, MAX_CHARACTER_NAME_LENGTH))
            p.disclosure.onClose()
          }}
          isDisabled={name.length <= 0}
        >
          Save
        </ModalButton>
      </HStack>
    </Modal>
  )
}

export const NameChanger = (p: { name: string }) => {
  const disclosure = useDisclosure()

  return (
    <>
      <div
        className={flex({
          justify: 'space-between',
          mr: '2.5',
          color: { base: 'green.200', _hover: 'gray.50' },
        })}
      >
        <p>Name</p>
        <div
          className={flex({
            justify: 'space-between',
          })}
        >
          <button
            // oxlint-disable-next-line react/jsx-handler-names
            onClick={disclosure.onOpen}
            className={flex({
              cursor: 'pointer',
              _hover: { textDecoration: 'underline' },
              mr: '2',
            })}
          >
            {p.name}
          </button>
        </div>
      </div>
      <NameChangerModal initialValue={p.name} disclosure={disclosure} />
    </>
  )
}
