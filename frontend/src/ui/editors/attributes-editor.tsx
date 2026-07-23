import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { css } from '../../styled-system/css'
import { flex } from '../../styled-system/patterns/flex'
import { useHelpTextStore } from '../help-text/store'
import { AttrValueSetter } from './attributes-value-setter'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <div className={flex({ wrap: 'wrap', gap: '1' })}>
      {entries(ATTRIBUTES).map(([name, attr]) => (
        <div
          key={name}
          onMouseEnter={() => setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)}
          onMouseLeave={() => clearHelpText()}
          className={css({ w: 'full' })}
        >
          <div className={flex({ justify: 'space-between', alignItems: 'center' })}>
            <div
              className={css({
                display: 'flex',
                fs: { base: '2xl', sm: 'xl' },
                textAlign: 'left',
                color: { base: 'gold.400', _hover: 'gray.50' },
              })}
            >
              {attr.name}
            </div>
            <AttrValueSetter name={name} />
          </div>
        </div>
      ))}
    </div>
  )
}
