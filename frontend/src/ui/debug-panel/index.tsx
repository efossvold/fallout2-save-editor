import { clsx } from 'clsx'
import { useState, useEffect } from 'react'

import { useAPIStore } from '../store'

import { FilterField } from './filter-field'
import { PropChangedList } from './prop-changed-list'
import { PropList } from './prop-list'
import { SimpleCheckbox } from './simple-checkbox'

export const StoreDebuggerPanel = () => {
  const data = useAPIStore(s => s.data)
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)
  const [showChangesOnly, setShowChangesOnly] = useState(false)
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
      <div className="py-1 p-2 mr-0.5 gap-1 rounded-sm bg-gray-50 h-full flex flex-col text-xs ">
        <h1 className="text-gray-700 text-base">Data</h1>

        <FilterField
          value={search}
          handleChange={ev => {
            setSearch(ev.target.value)
          }}
          handleReset={() => {
            setSearch('')
          }}
        />

        <SimpleCheckbox
          label="Show changes only"
          value={showChangesOnly}
          handleChange={() => {
            setShowChangesOnly(!showChangesOnly)
          }}
        />

        <div className="overflow-auto">
          <PropList data={data} filter={search} showChangesOnly={showChangesOnly} />
          <PropChangedList data={data} filter={search} showChangesOnly={showChangesOnly} />
        </div>
      </div>
    </div>
  )
}
