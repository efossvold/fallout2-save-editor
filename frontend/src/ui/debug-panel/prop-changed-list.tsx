import { clsx } from 'clsx'
import { useState } from 'react'

import { entries } from '~/api/utils'

import type { SaveGameData, SaveGameDataExtra } from '../../api/types/map'

import { useDebouncedValue } from '../hooks'

type UseChangedPropsChanges = { name: string; prev: string | number; current: string | number }[]

const getChangedProps = (
  props: Dict<unknown>,
  prev: Dict<unknown>,
  name = '',
  log = false,
): UseChangedPropsChanges => {
  const changes = entries(props).reduce<UseChangedPropsChanges>((acc, [key, prop]) => {
    if (prev[key] === prop) {
      return acc
    }
    acc.push({
      name: key,
      prev: prev[key] as string | number,
      current: prop as string | number,
    })
    return acc
  }, [])

  if (log && Object.keys(changes).length > 0) {
    if (!import.meta.env.PROD) {
      console.log(`Props Changed ${name ? `[${name}]` : ''}`, changes)
    }
  }

  return changes
}

interface PropChangedProps {
  showChangesOnly: boolean
  filter: string
  data: SaveGameData | SaveGameDataExtra
}

export const PropChangedList = (p: PropChangedProps) => {
  const [, data] = useDebouncedValue(p.data)
  const [prevData, setPrevData] = useState(data)
  const [changedProps, setChangedProps] = useState<UseChangedPropsChanges>([])

  if (data !== prevData) {
    const changes = getChangedProps(data as any, prevData as any, 'DebugPanel', false)

    setPrevData(data)
    setChangedProps(changes)
  }

  return (
    <div className={clsx(p.showChangesOnly ? 'table' : 'hidden', 'mt-1')}>
      {changedProps.map(prop => {
        let isVisible = true

        if (p.filter && !prop.name.toLocaleLowerCase().includes(p.filter.toLocaleLowerCase())) {
          isVisible = false
        }

        return (
          <div key={prop.name} className={isVisible ? 'table-row' : 'hidden'}>
            <div className="table-cell">
              <span className="text-gray-500">{prop.name}</span>
              <span className="text-gray-900 ml-px mr-2">:</span>
              {typeof prop.current === 'number' && (
                <>
                  <span className="text-gray-200">{prop.prev}</span>
                  <span className="mx-1  text-gray-500">→</span>
                  <span className="text-green-600">{prop.current}</span>
                </>
              )}
              {typeof prop.current === 'boolean' && (
                <>
                  <span className="text-gray-200">{prop.prev ? 'true' : 'false'}</span>
                  <span className="mx-1  text-gray-500">→</span>
                  {/* oxlint-disable-next-line typescript/no-unnecessary-condition */}
                  <span className="text-blue-600">{prop.current ? 'true' : 'false'}</span>
                </>
              )}
              {typeof prop.current === 'string' && (
                <>
                  <span className="text-gray-200">"{prop.prev}"</span>
                  <span className="mx-1  text-gray-500">→</span>
                  <span className="text-green-600">"{prop.current}"</span>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
