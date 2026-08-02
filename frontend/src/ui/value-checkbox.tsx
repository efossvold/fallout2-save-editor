import { flex } from '~/styled-system/patterns'

import { css, cx } from '../styled-system/css'
import { useHelpTextStore } from './help-text/store'
import { Hoverable } from './hoverable'
import { Checkbox as CheckboxUnchecked, CheckboxChecked } from './icons'
import { onMatchKey } from './utils'

interface Props {
  name: string
  value: boolean
  helperText: string
  onCheck: () => void
  onUncheck: () => void
  className?: string
}

export const ValueCheckbox = (p: Props) => {
  const setHelpText = useHelpTextStore(s => s.setHelpText)
  const clearHelpText = useHelpTextStore(s => s.clearHelpText)
  const CheckBox = p.value ? CheckboxChecked : CheckboxUnchecked

  const toggleChecked = () => {
    if (p.value) {
      p.onUncheck()
    } else {
      p.onCheck()
    }
  }

  return (
    <Hoverable onHover={() => setHelpText(p.name, p.helperText)} onUnhover={() => clearHelpText()}>
      {({ isHovered }) => (
        <span
          role="button"
          aria-label={p.name}
          tabIndex={0}
          className={flex({
            justify: 'space-between',
            alignItems: 'center',
            cursor: 'pointer',
          })}
          onClick={ev => {
            ev.preventDefault()
            ev.stopPropagation()
            toggleChecked()
          }}
          onKeyUp={ev => {
            console.log(ev.key, ev)
            onMatchKey(ev, ['Enter', 'Space'], () => {
              toggleChecked()
            })
          }}
        >
          <span
            data-checked={p.value}
            data-parent-hover={isHovered}
            className={css({
              color: 'green.900',
              _dataChecked: { color: 'green.200' },
              _parentHover: { base: { color: 'gray.50' }, _dataChecked: { color: 'gray.50' } },
            })}
          >
            {p.name}
          </span>

          <input type="checkbox" class={css({ visibility: 'hidden' })} aria-checked={p.value} />

          <CheckBox
            data-parent-hover={isHovered}
            className={cx(
              css({
                fill: 'green.900',
                _dataChecked: { fill: 'green.200' },
                _parentHover: { base: { fill: 'gold.400' }, _dataChecked: { fill: 'gold.400' } },
              }),
              p.className,
            )}
          />
        </span>
      )}
    </Hoverable>
  )
}
