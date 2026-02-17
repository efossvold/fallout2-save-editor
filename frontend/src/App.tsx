import './style/base.css'
import './style/fonts.css'
import './style/scrollbar.css'

import { Toaster } from 'react-hot-toast'

import { StoreDebuggerModal } from './ui/debug-window'
import { Panels } from './ui/panels'

const App = () => (
  <div className="relative w-full h-full">
    <div className="m-auto px-0.5 py-1 min-w-125 sm:w-full md:w-full xl:max-w-300">
      <Panels />
    </div>

    <StoreDebuggerModal />

    <Toaster
      position="bottom-center"
      toastOptions={{
        className: 'bg-red-500',
      }}
    />
  </div>
)

export default App
