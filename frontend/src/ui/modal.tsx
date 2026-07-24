import { createPortal } from 'react-dom'

import type { RecipeVariant } from '../styled-system/css'

import { css, cva } from '../styled-system/css'
import { useEventListener } from './hooks/use-add-event-listener'
import { useDelayValue } from './hooks/use-delay-value'
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
  children: React.ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, size, children }: ModalProps) {
  const shouldRender = useDelayValue(isOpen, 1000)
  const shouldAnimateFadeIn = useDelayValue(!isOpen, 1)
  const documentBody = getDocument()?.body

  let state = isOpen ? 'open' : 'closed'

  // When opening modal initial state needs to be "closed"
  // otherwise transition (fade in) will not work. Thus, wait 1ms
  // using useDelayUnmount before changing state to "open".
  if (isOpen && shouldAnimateFadeIn) {
    state = 'closed'
  }

  useEventListener('keydown', event => {
    if (event.key === 'Escape') {
      onClose()
    }
  })

  if (!shouldRender || !documentBody) {
    return undefined
  }

  return createPortal(
    /* oxlint-disable jsx-a11y/no-static-element-interactions jsx-a11y/click-events-have-key-events jsx-a11y/no-noninteractive-element-interactions */
    <div className={backdropStyle} data-state={state} onClick={onClose}>
      <div
        className={modalStyle({ size })}
        data-state={state}
        role="dialog"
        aria-modal="true"
        onClick={e => {
          e.stopPropagation()
        }}
      >
        {children}
      </div>
    </div>,
    /* oxlint-enable jsx-a11y/no-static-element-interactions jsx-a11y/click-events-have-key-events jsx-a11y/no-noninteractive-element-interactions */
    documentBody,
  )
}
