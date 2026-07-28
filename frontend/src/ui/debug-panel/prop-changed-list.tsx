import { useState } from 'react'

import { entries } from '~/api/utils'
import { css } from '~/styled-system/css'

import type { SaveGameData, SaveGameDataExtra } from '../../api/types/map'

import { useDebouncedValue } from '../hooks/use-debounced-value'

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

const Arrow = () => (
  <span className={css({ color: 'gray.500', mx: '1', pos: 'relative', top: '[1px]' })}>→</span>
)

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
    <div
      className={css({ mt: '1' })}
      style={{
        display: p.showChangesOnly ? 'table' : 'hidden',
      }}
    >
      {changedProps.map(prop => {
        let isVisible = true

        if (p.filter && !prop.name.toLocaleLowerCase().includes(p.filter.toLocaleLowerCase())) {
          isVisible = false
        }

        return (
          <div key={prop.name} style={{ display: isVisible ? 'table-row' : 'hidden' }}>
            <div className={css({ display: 'table-cell' })}>
              <span className={css({ color: 'gray.500' })}>{prop.name}</span>
              <span className={css({ color: 'gray.900', ml: '1', mr: '2' })}>:</span>
              {typeof prop.current === 'number' && (
                <>
                  <span className={css({ color: 'gray.200' })}>{prop.prev}</span>
                  <Arrow />
                  <span className={css({ color: 'green.600' })}>{prop.current}</span>
                </>
              )}
              {typeof prop.current === 'boolean' && (
                <>
                  <span className={css({ color: 'gray.200' })}>{prop.prev ? 'true' : 'false'}</span>
                  <Arrow />
                  <span className={css({ color: 'blue.600' })}>
                    {prop.current === true ? 'true' : 'false'}
                  </span>
                </>
              )}
              {typeof prop.current === 'string' && (
                <>
                  <span className={css({ color: 'gray.200' })}>"{prop.prev}"</span>
                  <Arrow />
                  <span className={css({ color: 'green.600' })}>"{prop.current}"</span>
                </>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
