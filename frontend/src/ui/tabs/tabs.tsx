import type { PropsWithChildren } from 'react'

import { cx } from '../../styled-system/css'
import { css } from '../../styled-system/css/css'
import { flex } from '../../styled-system/patterns/flex'
import * as E from '../editors'
import { useTabsStore } from './store'

const TabButton = (p: PropsWithChildren<{ index: number }>) => {
  const store = useTabsStore()
  const onClick = () => store.setIndex(p.index)

  return (
    <button
      aria-pressed={p.index === store.index}
      className={css({
        color: 'beige.500',
        _hover: {
          color: 'gray.50',
          cursor: 'pointer',
        },
        '&[aria-pressed="true"]': {
          color: 'gray.50',
        },
        mb: '2',
      })}
      onClick={onClick}
    >
      {p.children}
    </button>
  )
}

export const Tabs = () => {
  const tabIndex = useTabsStore(s => s.index)

  return (
    <>
      <div className={flex({ justify: 'space-between', w: 'full' })}>
        <TabButton index={0}>TRAITS</TabButton>
        <TabButton index={1}>REPUTATION</TabButton>
        <TabButton index={2}>KILLS</TabButton>
      </div>
      <div
        className={cx(
          css({ maxHeight: { base: '0', sm: '[276px]' }, overflowY: 'auto' }),
          'styled-scrollbar',
        )}
      >
        {tabIndex === 0 && <E.TraitsEditor />}
        {tabIndex === 1 && <E.GVAREditor />}
        {tabIndex === 2 && <E.KillsEditor />}
      </div>
    </>
  )
}
