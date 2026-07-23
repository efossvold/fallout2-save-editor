import { css, cx } from '../styled-system/css'
import { flex } from '../styled-system/patterns/flex'
import { useHelpTextStore } from './help-text/store'
import { Hoverable } from './hoverable'
import { Checkbox as CheckboxUnchecked, CheckboxChecked } from './icons'

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

  return (
    <Hoverable
      onHover={() => setHelpText(p.name, p.helperText)}
      onUnhover={() => clearHelpText()}
      onClick={ev => {
        ev.preventDefault()
        ev.stopPropagation()

        if (p.value) {
          p.onUncheck()
        } else {
          p.onCheck()
        }
      }}
    >
      {({ isHovered }) => (
        <div
          className={flex({ justify: 'space-between', alignItems: 'center', cursor: 'pointer' })}
        >
          <p
            aria-checked={p.value}
            data-parent-hover={isHovered}
            className={css({
              color: 'green.900',
              _checked: { color: 'green.200' },
              _parentHover: { base: { color: 'gray.50' }, _checked: { color: 'gray.50' } },
            })}
          >
            {p.name}
          </p>

          <CheckBox
            data-parent-hover={isHovered}
            className={cx(
              css({
                fill: 'green.900',
                _checked: { fill: 'green.200' },
                _parentHover: { base: { fill: 'gold.400' }, _checked: { fill: 'gold.400' } },
              }),
              p.className,
            )}
          />
        </div>
      )}
    </Hoverable>
  )
}
