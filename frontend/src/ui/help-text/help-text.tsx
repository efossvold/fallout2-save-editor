import { css } from '../../styled-system/css'
import { useHelpTextStore } from './store'

export const HelpText = () => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <div class={css({ flex: '1', pb: '2', pt: '1' })}>
      <p class={css({ color: 'gray.800', fs: 'xl' })}>{title}</p>
      {title ? (
        <div class={css({ mb: '2', borderWidth: '1px', borderColor: 'gray.800', w: 'full' })} />
      ) : (
        <></>
      )}
      <p class={css({ fs: 'md', color: 'gray.800' })}>{helpText}</p>
    </div>
  )
}
