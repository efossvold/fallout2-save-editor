import { toast } from 'react-hot-toast'

import type { AttributesValues } from '../../api/types/attributes'
import { prefixString } from '../../api/utils'
import { ATTR_PREFIX, MAX_ATTRIBUTE_VALUE, MIN_ATTRIBUTE_VAULE } from '../constants'
import { Hoverable } from '../hoverable'
import { caretDown, caretUp } from '../icons'
import * as S from '../selectors'
import { useAPIStore } from '../store'

export const AttrValueSetter = (p: { name: keyof AttributesValues }) => {
  const setProp = useAPIStore(s => s.setProp)

  const baseValue = useAPIStore(s => s.data[prefixString(p.name, ATTR_PREFIX.BASE_ATTR)])

  const totalValue = useAPIStore(s => S.getAttributeTotal(s, p.name))

  const onValueUp = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (totalValue < MAX_ATTRIBUTE_VALUE) {
      setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue + 1)
    } else {
      toast('Max attribute level reached, you rock!')
    }
  }

  const onValueDown = (ev: React.SyntheticEvent) => {
    ev.preventDefault()
    ev.stopPropagation()

    if (totalValue > MIN_ATTRIBUTE_VAULE) {
      setProp(prefixString(p.name, ATTR_PREFIX.BASE_ATTR), baseValue - 1)
    } else {
      toast('Minimum attribute level reached, not your strongest side is it?')
    }
  }

  return (
    <div className="flex flex-row items-center gap-2">
      <div className="flex flex-row gap-2 bg-gray-800 rounded-sm px-2">
        {/* oxlint-disable-next-line unicorn/prefer-spread */}
        {`0${totalValue}`
          .slice(-2)
          .split('')
          .map((digit, index) => (
            <div
              className="text-gray-50 text-[32px] sm:text-2xl font-falloutx leading-tight"
              key={index.toString()}
            >
              {digit}
            </div>
          ))}
      </div>
      <div className="grid grid-row-2 gap-2">
        <Hoverable>
          {({ isHovered }) => (
            <div
              role="button"
              className={caretUp({ isHovered })}
              onClick={onValueUp}
              onKeyUp={onValueUp}
            />
          )}
        </Hoverable>
        <Hoverable>
          {({ isHovered }) => (
            <div
              role="button"
              className={caretDown({ isHovered })}
              onClick={onValueDown}
              onKeyUp={onValueDown}
            />
          )}
        </Hoverable>
      </div>
    </div>
  )
}
