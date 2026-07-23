import { css } from '../../styled-system/css'
import { useHelpTextStore } from './store'

export const HelpText = () => {
  const title = useHelpTextStore(s => s.title)
  const helpText = useHelpTextStore(s => s.helpText)

  return (
    <div className={css({ flex: '1', pb: '2', pt: '1' })}>
      <p className={css({ color: 'gray.800', fs: 'xl' })}>{title}</p>
      {title ? (
        <div className={css({ mb: '2', borderWidth: '1px', borderColor: 'gray.800', w: 'full' })} />
      ) : (
        <></>
      )}
      <p className={css({ fs: 'md', color: 'gray.800' })}>{helpText}</p>
    </div>
  )
}
