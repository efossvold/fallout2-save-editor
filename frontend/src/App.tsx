import './style/base.css'
import './style/fonts.css'
import './style/scrollbar.css'

import { clsx } from 'clsx'
import { Toaster } from 'react-hot-toast'

import { StoreDebuggerPanel } from './ui/debug-panel'
import { Panels } from './ui/panels'
import { useAPIStore } from './ui/store'

const App = () => {
  const showDebugWindow = useAPIStore(s => s.showDebugWindow)

  return (
    <div className="relative w-full h-full">
      <div
        className={clsx(
          'grid items-stretch',
          showDebugWindow ? 'grid-cols-[1fr_320px]' : 'grid-cols-1',
        )}
      >
        <div className="m-auto px-0.5 py-1 min-w-125 sm:w-full md:w-full xl:max-w-300">
          <Panels />
        </div>

        {showDebugWindow && <StoreDebuggerPanel />}
      </div>

      <Toaster
        position="bottom-center"
        toastOptions={{
          className: 'bg-red-500',
        }}
      />
    </div>
  )
}

export default App
