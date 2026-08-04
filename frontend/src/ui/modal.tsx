import { createPortal, useRef } from 'octane'

import type { Children } from '~/types'

import type { RecipeVariant } from '../styled-system/css'

import { css, cva } from '../styled-system/css'
import { useEventListener } from './hooks/use-add-event-listener'
import { useDelayValue } from './hooks/use-delay-value'
import { useOnClickOutside } from './hooks/use-on-click-outside'
import { getDocument } from './utils'

const backdropStyle = css({
  pos: 'fixed',
  inset: '0',
  bg: 'gray.900/40',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
  transition: 'opacity',
  opacity: { base: 0, _open: 1, _closed: 0 },
})

const modalStyle = cva({
  base: {
    bg: 'white',
    borderRadius: 'md',
    p: '4',
    boxShadow: 'lg',
    w: 'md',
    color: 'gray.600',
    fs: 'xl',
    transition: 'transform',
    transform: { base: 'scale(0.9)', _open: 'scale(1)', _closed: 'scale(0.9)' },
  },
  variants: {
    size: {
      sm: { w: 'sm' },
      md: { w: 'md' },
      lg: { w: 'lg' },
    },
  },
})

interface ModalProps extends RecipeVariant<typeof modalStyle> {
  isOpen: boolean
  onClose: () => void
  children: Children
  className?: string
}

export default function Modal({ isOpen, onClose, size, children }: ModalProps) {
  const shouldRender = useDelayValue(isOpen, 200)
  const shouldAnimateFadeIn = useDelayValue(!isOpen, 1)
  const documentBody = getDocument()?.body
  const modalRef = useRef<HTMLDivElement | null>(null)

  useOnClickOutside(modalRef, () => {
    if (isOpen) {
      onClose()
    }
  })

  useEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  let state = isOpen ? 'open' : 'closed'

  // When opening modal initial state needs to be "closed"
  // otherwise transition (fade in) will not work. Thus, wait 1ms
  // using useDelayUnmount before changing state to "open".
  if (isOpen && shouldAnimateFadeIn) {
    state = 'closed'
  }

  if (!shouldRender || !documentBody) {
    // Need to return null here in Octane, returning undefined keeps the portal in DOM.
    // oxlint-disable-next-line unicorn/no-null
    return null
  }

  return createPortal(
    <div id="modal" role="presentation" className={backdropStyle} data-state={state}>
      <div
        ref={modalRef}
        className={modalStyle({ size })}
        data-state={state}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    documentBody,
  )
}
