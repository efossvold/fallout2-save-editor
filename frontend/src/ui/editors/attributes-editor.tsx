import { flex } from '~/styled-system/patterns'

import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { css } from '../../styled-system/css'
import { useHelpTextStore } from '../help-text/store'
import { AttrValueSetter } from './attributes-value-setter'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <div class={flex({ wrap: 'wrap', gap: '1' })}>
      {entries(ATTRIBUTES).map(([name, _attr]) => (
        <div
          key={name}
          onMouseEnter={() => setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)}
          onMouseLeave={() => clearHelpText()}
          class={css({ w: 'full' })}
        >
          <AttrValueSetter name={name} />
        </div>
      ))}
    </div>
  )
}
