import type { SaveGameData, SaveGameDataExtra } from '../../api/types/map'

import { css } from '../../styled-system/css'

interface PropListProps {
  showChangesOnly: boolean
  filter: string
  data: SaveGameData | SaveGameDataExtra
}

export const PropList = (p: PropListProps) => (
  <div
    class={css({ mt: '1' })}
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
        <div key={name} style={{ display: isVisible ? 'table-row' : 'none' }}>
          <div class={css({ display: 'table-cell' })}>
            <span class={css({ color: 'gray.500' })}>{name}</span>
            <span class={css({ color: 'gray.900', ml: '0.5', mr: '2' })}>:</span>
            {typeof value === 'number' && <span class={css({ color: 'red.400' })}>{value}</span>}
            {typeof value === 'boolean' && (
              <span class={css({ color: 'blue.400' })}>{value ? 'true' : 'false'}</span>
            )}
            {typeof value === 'string' && (
              <span class={css({ color: 'green.600' })}>"{value}"</span>
            )}
          </div>
        </div>
      )
    })}
  </div>
)
