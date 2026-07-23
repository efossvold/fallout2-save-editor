import type { SaveGameData, SaveGameDataExtra } from '../../api/types/map'

import { css } from '../../styled-system/css'

interface PropListProps {
  showChangesOnly: boolean
  filter: string
  data: SaveGameData | SaveGameDataExtra
}

export const PropList = (p: PropListProps) => (
  <div
    className={css({ mt: '1' })}
    style={{
      display: p.showChangesOnly ? 'none' : 'table',
    }}
  >
    {Object.entries(p.data).map(([name, value]) => {
      let isVisible = true

      if (p.filter && !name.toLocaleLowerCase().includes(p.filter.toLocaleLowerCase())) {
        isVisible = false
      }

      return (
        <div key={name} style={{ display: isVisible ? 'table-row' : 'hidden' }}>
          <div className={css({ display: 'table-cell' })}>
            <span className={css({ color: 'gray.500' })}>{name}</span>
            <span className={css({ color: 'gray.900', ml: '0.5', mr: '2' })}>:</span>
            {typeof value === 'number' && (
              <span className={css({ color: 'red.400' })}>{value}</span>
            )}
            {typeof value === 'boolean' && (
              <span className={css({ color: 'blue.400' })}>{value ? 'true' : 'false'}</span>
            )}
            {typeof value === 'string' && (
              <span className={css({ color: 'green.600' })}>"{value}"</span>
            )}
          </div>
        </div>
      )
    })}
  </div>
)
