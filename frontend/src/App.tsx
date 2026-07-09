import './style/base.css'
import { Toaster } from 'react-hot-toast'

import { StoreDebuggerPanel } from './ui/debug-panel'
import { Panels } from './ui/panels'

const App = () => (
  <div className="h-screen w-screen">
    <div className="flex flex-row justify-center">
      <div className="min-w-125 px-0.5 py-1 sm:w-full md:w-full xl:max-w-300">
        <Panels />
      </div>

      <StoreDebuggerPanel />
    </div>

    <Toaster
      position="bottom-center"
      toastOptions={{
        className: 'bg-red-500',
      }}
    />
  </div>
)

export default App
