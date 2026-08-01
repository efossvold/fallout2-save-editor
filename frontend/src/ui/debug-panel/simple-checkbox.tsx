import type { IMouseEventHandler } from '~/types'

import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns/flex'
import { Checkbox as CheckboxUnchecked, CheckboxChecked } from '../icons'

interface SimpleCheckboxProps {
  label: string
  value: boolean
  handleChange?: IMouseEventHandler
}

export const SimpleCheckbox = (p: SimpleCheckboxProps) => {
  const CheckBox = p.value ? CheckboxChecked : CheckboxUnchecked

  return (
    <button
      className={flex({
        cursor: 'pointer',
        alignItems: 'center',
      })}
      onClick={ev => {
        if (p.handleChange) {
          p.handleChange(ev)
        }
      }}
    >
      <CheckBox className={css({ mr: '1' })} />
      <p className={css({ fs: 'xs', color: 'gray.500' })}>{p.label}</p>
    </button>
  )
}
