import { clsx } from 'clsx'

import type { SaveGameData } from '../../api/types/map'
import { useChangedProps, useDebouncedPrevValue } from '../hooks'

interface PropChangedProps {
  showChangesOnly: boolean
  filter: string
  data: SaveGameData
}

export const PropChangedList = (p: PropChangedProps) => {
  const [, changedData] = useDebouncedPrevValue(p.data)
  const changedProps = useChangedProps(changedData as any, 'DebugPanel', true)

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
              {typeof prop.current === 'number' ? (
                <>
                  <span className="text-gray-200">{prop.prev}</span>
                  <span className="mx-1  text-gray-500">→</span>
                  <span className="text-green-600">{prop.current}</span>
                </>
              ) : (
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
