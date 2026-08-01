import './style/index.css'
// import { Toaster } from 'react-hot-toast'
import { css } from './styled-system/css'
import { Flex } from './ui/components/layout'
import { StoreDebuggerPanel } from './ui/debug-panel'
import { Panels } from './ui/panels'

export const App = () => (
  <>
    <div className={css({ bg: 'gray.300', h: 'screen', w: 'screen' })}>
      <Flex justify="center">
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
      </Flex>
    </div>

    {/* <Toaster
      position="bottom-center"
      toastOptions={{
        className: 'bg-red-500',
      }}
    /> */}
  </>
)
