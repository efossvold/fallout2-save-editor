import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { css } from '../../styled-system/css'
import { Flex } from '../components/flex'
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
          <Flex justify="space-between" alignItems="center">
            <Flex
              sx={css({
                fs: { base: '2xl', sm: 'xl' },
                textAlign: 'left',
                color: { base: 'gold.400', _hover: 'gray.50' },
              })}
            >
              {attr.name}
            </Flex>
            <AttrValueSetter name={name} />
          </Flex>
        </div>
      ))}
    </Flex>
  )
}
