import './style/index.css'
import 'virtual:bamboo.css'
import { css } from './styled-system/css'
import { flex } from './styled-system/patterns'
import { StoreDebuggerPanel } from './ui/debug-panel'
import { Panels } from './ui/panels'
import { Toaster } from './ui/toaster/toaster'

export const App = () => (
  <>
    <div className={css({ bg: 'gray.300', h: 'screen', w: 'screen' })}>
      <div className={flex({ justify: 'center' })}>
        <div
          className={css({
            px: '0.5',
            py: '1',
            minW: '[500px]',
            w: 'full',
            h: 'full',
            xl: { maxW: '300' },
          })}
        >
          <Panels />
        </div>

        <StoreDebuggerPanel />
        <div>1</div>
      </div>
    </div>

    <Toaster />
  </>
)
