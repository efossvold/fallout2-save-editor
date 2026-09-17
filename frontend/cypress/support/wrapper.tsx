import type { ComponentBody } from 'octane'

import '../../src/style/index.css'

import type { OctaneElement } from 'octane/jsx-runtime'

import type { SaveGameData } from '~/api/types/map'

import STATS from '~/api/fixtures/slot01-stats'
import { useMountEffect } from '~/ui/hooks/use-mount-effect'
import { useAPIStore } from '~/ui/store'
import { Toaster } from '~/ui/toaster/toaster'

interface WrapperProps {
  children: OctaneElement
  data?: SaveGameData
}

export const Wrapper = ({ children, data = STATS }: WrapperProps) => {
  const setData = useAPIStore(s => s.setData)

  useMountEffect(() => {
    setData(data)
  })

  return (
    <div style={{ height: '100vh' }}>
      {children}
      <Toaster />
    </div>
  )
}

export const wrapper = (component: Parameters<ComponentBody>[0]) => (
  <>
    {component}
    <Toaster />
  </>
)
