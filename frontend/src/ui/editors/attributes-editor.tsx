import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { css } from '../../styled-system/css'
import { Flex } from '../components/layout'
import { useHelpTextStore } from '../help-text/store'
import { AttrValueSetter } from './attributes-value-setter'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <Flex wrap="wrap" gap="1">
      {entries(ATTRIBUTES).map(([name, attr]) => (
        <div
          key={name}
          onMouseEnter={() => setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)}
          onMouseLeave={() => clearHelpText()}
          className={css({ w: 'full' })}
        >
          <AttrValueSetter name={name} />
        </div>
      ))}
    </Flex>
  )
}
