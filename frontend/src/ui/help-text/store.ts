import { create } from 'zustand'

interface HelpTextState {
  title: string
  helpText: string
  setHelpText: (title: string, text: string) => void
  clearHelpText: () => void
}

export const useHelpTextStore = create<HelpTextState>(set => ({
  title: '',
  helpText: '',
  setHelpText: (title, text) => set(state => ({ title, helpText: text })),
  clearHelpText: () => set(state => ({ title: '', helpText: '' })),
}))
