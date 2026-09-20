import './style/index.css'
import 'virtual:bamboo.css'
import { css } from './styled-system/css'
import { flex } from './styled-system/patterns'
import { StoreDebuggerPanel } from './ui/debug-panel'
import { Panels } from './ui/panels'
import { Toaster } from './ui/toaster/toaster'

export const App = () => (
  <>
    <div class={css({ bg: 'gray.300', h: 'screen', w: 'screen' })}>
      <div class={flex({ justify: 'center' })}>
        <div
          class={css({
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
      </div>
    </div>

    <Toaster />
  </>
)
