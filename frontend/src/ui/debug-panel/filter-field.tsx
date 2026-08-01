import type { IInputEventHandler, IMouseEventHandler } from '~/types'

import { css } from '../../styled-system/css'
import { InputField } from '../components/input-field'

export const FilterField = (p: {
  value: string
  handleChange: IInputEventHandler
  handleReset: IMouseEventHandler
}) => (
  <div className={css({ pos: 'relative' })}>
    <InputField
      name="filter"
      size="sm"
      variant="light"
      placeholder="Filter"
      value={p.value}
      onInput={p.handleChange}
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
