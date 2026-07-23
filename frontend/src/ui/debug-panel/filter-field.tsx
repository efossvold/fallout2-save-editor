import type { ChangeEventHandler, MouseEventHandler } from 'react'

import { css } from '../../styled-system/css'
import { InputField } from '../components/input-field'

export const FilterField = (p: {
  value: string
  handleChange: ChangeEventHandler<HTMLInputElement, HTMLInputElement>
  handleReset: MouseEventHandler<HTMLButtonElement>
}) => (
  <div className={css({ pos: 'relative' })}>
    <InputField
      name="filter"
      size="sm"
      variant="light"
      placeholder="Filter"
      value={p.value}
      onChange={p.handleChange}
    />
    <button
      className={css({
        color: 'gray.400',
        cursor: 'pointer',
        right: '2',
        top: '3.5',
        pos: 'absolute',
        _hover: { color: 'gray.500' },
      })}
      onClick={p.handleReset}
    >
      x
    </button>
  </div>
)
