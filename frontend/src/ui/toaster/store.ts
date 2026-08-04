import { create } from '@octanejs/zustand'

type Severity = 'info' | 'success' | 'error'

const DEFAULT_DURATION = 4000

export interface Toast {
  id: number
  severity: Severity
  message: string
  duration: number
  offset: number
  height: number
}

interface HelpTextState {
  id: number
  toasts: Toast[]
  addToast: (severity: Severity, message: string, duration?: number) => void
  removeToast: (id: number) => void
  setToasts: (toasts: Toast[]) => void
}

export const useToasterStore = create<HelpTextState>(set => ({
  id: 0,
  toasts: [],
  addToast: (severity, message, duration = DEFAULT_DURATION) =>
    set(state => {
      const id = state.id + 1
      const toast: Toast = { id, severity, message, duration, offset: 0, height: 0 }
      return {
        id,
        toasts: [toast, ...state.toasts],
      }
    }),

  removeToast: (id: number) =>
    set(state => {
      const index = state.toasts.findIndex(toast => toast.id === id)
      if (index === -1) {
        console.error(`Toast '${id}' not found`, { index })
      }
      return { toasts: state.toasts.toSpliced(index, 1) }
    }),

  setToasts: toasts => set(state => ({ ...state, toasts: [...toasts] })),
}))

export const useToaster = () => {
  const addToast = useToasterStore(s => s.addToast)

  return {
    info: (message: string, duration?: number) => {
      addToast('info', message, duration)
    },
    success: (message: string, duration?: number) => {
      addToast('success', message, duration)
    },
    error: (message: string, duration?: number) => {
      addToast('error', message, duration)
    },
  }
}
