import { useState } from 'react'

import type { Fn } from '~/types'

export interface UseDisclosureReturn {
  isOpen: boolean
  onOpen: Fn
  onClose: Fn
  onToggle: Fn
}

export const useDisclosure = (): UseDisclosureReturn => {
  const [isOpen, setIsOpen] = useState(false)

  const onOpen = () => {
    setIsOpen(true)
  }
  const onClose = () => {
    setIsOpen(false)
  }
  const onToggle = () => {
    setIsOpen(!isOpen)
  }

  return { isOpen, onOpen, onClose, onToggle }
}
