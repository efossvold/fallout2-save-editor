import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { clsx } from 'clsx'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import type { UseDisclosureReturn } from '../types/types'

import { IButton } from './components/buttons'
import { IInput } from './components/input'
import { MAX_CHARACTER_NAME_LENGTH } from './constants'
import { useDisclosure } from './hooks'
import { Hoverable } from './hoverable'
import { useAPIStore } from './store'

const NameChangerModal = (p: {
  initialValue: string
  disclosure: UseDisclosureReturn
  isHovered: boolean
}) => {
  const { isOpen, onClose } = p.disclosure
  const setProp = useAPIStore(s => s.setProp)
  const [name, setName] = useState('')
  const [isInitialValueSet, setIsInitialValueSet] = useState(false)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>()

  useEffect(() => {
    setModalRoot(document.getElementById('name-changer'))
  }, [])

  useEffect(() => {
    if (isOpen && !isInitialValueSet) {
      setIsInitialValueSet(true)
      setName(p.initialValue.replaceAll('\x00', ''))
    } else if (!isOpen) {
      setIsInitialValueSet(false)
    }
  }, [isInitialValueSet, isOpen, p.initialValue])

  if (!isOpen || !modalRoot) {
    return
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
            className="w-full max-w-lg sm:max-w-md rounded-lg bg-white text-gray-600 p-4 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 text-2xl sm:text-xl"
          >
            <DialogTitle as="h3">Character Name</DialogTitle>

            <IInput
              autoFocus
              value={name}
              onChange={ev => {
                setName(ev.target.value)
              }}
              maxLength={MAX_CHARACTER_NAME_LENGTH}
            />

            <div className="flex flex-row justify-end gap-4 mt-4">
              <IButton onClick={onClose} color="secondary" disabled={name.length <= 0}>
                Close
              </IButton>
              <IButton
                color="primary"
                onClick={() => {
                  setProp('characterName', name.slice(0, MAX_CHARACTER_NAME_LENGTH))
                  p.disclosure.onClose()
                }}
                disabled={name.length <= 0}
              >
                Save
              </IButton>
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
              'flex justify-between mr-2.5 cursor-pointer',
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
