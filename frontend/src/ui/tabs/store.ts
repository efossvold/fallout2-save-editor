import { create } from 'zustand'

interface TabsState {
  index: number
  setIndex: (index: number) => void
}

export const useTabsStore = create<TabsState>(set => ({
  index: 0,
  setIndex: index => set(() => ({ index })),
}))
