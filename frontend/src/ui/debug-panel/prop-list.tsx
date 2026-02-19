import { clsx } from 'clsx'

import type { SaveGameData } from '../../api/types/map'

interface PropListProps {
  showChangesOnly: boolean
  filter: string
  data: SaveGameData
}

export const PropList = (p: PropListProps) => (
  <div className={clsx(p.showChangesOnly ? 'hidden' : 'table', 'mt-1')}>
    {Object.entries(p.data).map(([name, value]) => {
      let isVisible = true

      if (p.filter && !name.toLocaleLowerCase().includes(p.filter.toLocaleLowerCase())) {
        isVisible = false
      }

      return (
        <div key={name} className={isVisible ? 'table-row' : 'hidden'}>
          <div className="table-cell">
            <span className="text-gray-500">{name}</span>
            <span className="text-gray-900 ml-px mr-2">:</span>
            {typeof value === 'number' ? (
              <span className="text-red-400">{value}</span>
            ) : (
              <span className="text-green-600">"{value}"</span>
            )}
          </div>
        </div>
      )
    })}
  </div>
)
