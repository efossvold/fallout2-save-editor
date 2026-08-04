import { createPortal, useLayoutEffect, useRef } from 'octane'

import { flex } from '~/styled-system/patterns'

import type { Toast } from './store'

import { getDocument } from '../utils'
import { useToasterStore } from './store'
import { ToastNotification } from './toast-notification'

type ToastRef = ReturnType<typeof useRef<HTMLDivElement | null>>

const useCalculateToastOffset = (toasterRef: ToastRef, toasts: Toast[]) => {
  const setToasts = useToasterStore(s => s.setToasts)

  useLayoutEffect(() => {
    const query = toasterRef.current?.querySelectorAll('[role="status"]')
    const padding = 8
    let hasChanged = false

    query?.forEach(el => {
      const id = Number(el.getAttribute('data-id'))
      const index = toasts.findIndex(toast => toast.id === id)
      const toast = toasts[index]
      const prevToast = toasts[index - 1]
      let offset = 0

      if (toast) {
        const { height } = el.getBoundingClientRect()

        offset += prevToast ? prevToast.offset + toast.height : toast.height
        offset += padding

        if (offset !== toast.offset) {
          hasChanged = true
        }

        toasts[index] = { ...toast, height, offset }
      }
    })

    // oxlint-disable-next-line typescript/no-unnecessary-condition
    if (hasChanged) {
      setToasts(toasts)
    }
  }, [toasterRef, toasts, setToasts])
}

export const Toaster = () => {
  const toasts = useToasterStore(s => s.toasts)
  const documentBody = getDocument()?.body
  const toasterRef = useRef<HTMLDivElement | null>(null)

  useCalculateToastOffset(toasterRef, toasts)

  if (!documentBody) {
    // oxlint-disable-next-line unicorn/no-null
    return null
  }

  return createPortal(
    <div
      id="toaster"
      ref={toasterRef}
      className={flex({
        height: '0',
        align: 'center',
        direction: 'column',
        pos: 'fixed',
        w: 'full',
        zIndex: '1000',
      })}
    >
      {toasts.map((toast, index) => (
        <ToastNotification key={toast.id} index={index} {...toast} />
      ))}
    </div>,
    documentBody,
  )
}
