// oxlint-disable jsx-a11y/control-has-associated-label
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
    <div className="flex flex-row gap-2 items-center">
      <div className="px-2 rounded-sm bg-gray-800 flex flex-row gap-2">
        {/* oxlint-disable-next-line unicorn/prefer-spread */}
        {`0${totalValue}`
          .slice(-2)
          .split('')
          .map((digit, index) => (
            <div
              className="font-falloutx text-[32px] text-gray-50 leading-tight sm:text-2xl"
              // oxlint-disable-next-line react/no-array-index-key
              key={index.toString()}
            >
              {digit}
            </div>
          ))}
      </div>
      <div className="gap-2 grid">
        <Hoverable>
          {({ isHovered }) => (
            <div
              role="button"
              tabIndex={0}
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
              tabIndex={0}
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
