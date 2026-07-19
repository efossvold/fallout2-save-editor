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
        className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in bg-gray-900/40 transition-opacity inset-0 fixed"
      />
      <div className="w-screen inset-0 fixed z-10 overflow-y-auto">
        <div className="p-4 flex min-h-full items-center justify-center">
          <DialogPanel
            transition
            className="data-closed:transform-[scale(95%)] data-closed:opacity-0 text-2xl text-gray-600 p-4 rounded-lg bg-white max-w-lg w-full duration-300 ease-out backdrop-blur-2xl sm:(text-xl max-w-md)"
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

            <div className="mt-4 flex flex-row gap-4 w-100 justify-end">
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
