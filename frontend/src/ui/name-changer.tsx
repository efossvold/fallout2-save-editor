import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { clsx } from 'cnfast'
import { useState } from 'react'
import ReactDOM from 'react-dom'

import type { UseDisclosureReturn } from './hooks'

import { ModalButton } from './components/buttons'
import { IInput } from './components/input'
import { MAX_CHARACTER_NAME_LENGTH } from './constants'
import { useDisclosure } from './hooks'
import { Hoverable } from './hoverable'
import { useAPIStore } from './store'
import { getDocument } from './utils'

const NameChangerModal = (p: {
  initialValue: string
  disclosure: UseDisclosureReturn
  isHovered: boolean
}) => {
  const { isOpen, onClose } = p.disclosure
  const setProp = useAPIStore(s => s.setProp)
  const [name, setName] = useState('')
  const [isInitialValueSet, setIsInitialValueSet] = useState(false)

  const modalRoot = getDocument()?.getElementById('name-changer')

  if (!isOpen || !modalRoot) {
    return undefined
  }

  if (!isInitialValueSet) {
    setName(p.initialValue.replaceAll('\x00', ''))
    setIsInitialValueSet(true)
  }

  return ReactDOM.createPortal(
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={onClose}>
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/40 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg rounded-lg bg-white p-4 text-2xl text-gray-600 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 sm:max-w-md sm:text-xl"
          >
            <DialogTitle as="h3">Character Name</DialogTitle>

            <IInput
              // oxlint-disable-next-line jsx_a11y/no-autofocus
              autoFocus
              value={name}
              onChange={ev => {
                setName(ev.target.value)
              }}
              maxLength={MAX_CHARACTER_NAME_LENGTH}
            />

            <div className="mt-4 flex w-100 flex-row justify-end gap-4">
              <ModalButton onClick={onClose} variant="primary" disabled={name.length <= 0}>
                Close
              </ModalButton>
              <ModalButton
                variant="secondary"
                onClick={() => {
                  setProp('characterName', name.slice(0, MAX_CHARACTER_NAME_LENGTH))
                  p.disclosure.onClose()
                }}
                disabled={name.length <= 0}
              >
                Save
              </ModalButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>,
    modalRoot,
  )
}

export const NameChanger = (p: { name: string }) => {
  const disclosure = useDisclosure()

  return (
    <>
      {/* oxlint-disable-next-line react/jsx-handler-names */}
      <Hoverable onClick={disclosure.onOpen}>
        {({ isHovered }) => (
          <div
            className={clsx(
              'mr-2.5 flex cursor-pointer justify-between',
              isHovered ? 'text-gray-50' : 'text-green-200',
            )}
          >
            <p>Name</p>
            <div className="flex justify-between">
              <p className={clsx(isHovered ? 'underline' : 'no-underline')}>{p.name}</p>
              <NameChangerModal
                initialValue={p.name}
                disclosure={disclosure}
                isHovered={isHovered}
              />
              <div className="w-2" />
            </div>
          </div>
        )}
      </Hoverable>
    </>
  )
}
