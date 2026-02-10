import { ATTRIBUTES } from '../../api/data/attributes'
import { captializeFirstLetter, entries } from '../../api/utils'
import { useHelpTextStore } from '../help-text/store'
import { Hoverable } from '../hoverable'

import { AttrValueSetter } from './attributes-value-setter'

export const AttributesEditor = () => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)

  return (
    <div className="flex flex-wrap gap-1">
      {entries(ATTRIBUTES).map(([name, attr]) => (
        <Hoverable
          key={name}
          onHover={() => setHelpText(captializeFirstLetter(name), ATTRIBUTES[name].desc)}
          onUnhover={() => clearHelpText()}
          className="w-full"
        >
          {({ isHovered }) => (
            <div className="flex justify-between items-center">
              <div
                className={`flex text-left relative text-2xl sm:text-xl ${isHovered ? 'text-gray-50' : 'text-gold-400'}`}
              >
                {attr.name}
              </div>
              <AttrValueSetter name={name} />
            </div>
          )}
        </Hoverable>
      ))}
    </div>
  )
}
