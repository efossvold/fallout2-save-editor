import { Input } from '@headlessui/react'
import { clsx } from 'clsx'
import { useState, useEffect } from 'react'

import { useAPIStore } from './store'

export const StoreDebuggerPanel = () => {
  const data = useAPIStore(s => s.data)
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)
  const [search, setSearch] = useState('')
  const [appHeight, setAppHeight] = useState<number>()

  useEffect(() => {
    const height = document.querySelector('#panels')?.getClientRects()[0]?.height
    if (height !== appHeight) {
      setAppHeight(height)
    }
  }, [appHeight, setAppHeight])

  return (
    <div
      className={clsx(
        'my-1 overflow-hidden transition-[width]',
        showDebugWindow ? 'w-[320px]' : 'w-0',
      )}
      style={{ maxHeight: appHeight ? `${appHeight}px` : 'auto' }}
    >
      <div className="py-1 p-2 mr-0.5 rounded-sm bg-gray-50 h-full flex flex-col overflow-auto">
        <h1 className="text-gray-700">Data</h1>

        <Input
          className={clsx(
            'rounded-sm bg-gray-100 px-3 py-1 mt-1 mb-1 text-gray-800 text-xs focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
          )}
          placeholder="Filter"
          value={search}
          onChange={ev => {
            setSearch(ev.target.value)
          }}
        />

        <div className="text-xs">
          {Object.entries(data).map(([name, value]) => {
            if (search && !name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
              return
            }
            return (
              <div key={name}>
                <span className="text-gray-500">{name}</span>
                <span className="text-gray-900 ml-px mr-2">:</span>
                {typeof value === 'number' ? (
                  <span className="text-red-400">{value}</span>
                ) : (
                  <span className="text-green-600">"{value}"</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
