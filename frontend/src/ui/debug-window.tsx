import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

import { IButton } from './components/buttons'
import { useAPIStore } from './store'

export const StoreDebuggerModal = () => {
  const isOpen = useAPIStore(s => s.showDebugWindow)
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>()
  const toggleDebugWindow = useAPIStore(s => s.toggleDebugWindow)
  const data = useAPIStore(s => s.data)

  useEffect(() => {
    setModalRoot(document.getElementById('store-debugger'))
  }, [])

  if (!isOpen || !modalRoot) {
    return
  }

  return ReactDOM.createPortal(
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={toggleDebugWindow}
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-900/40 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-lg sm:max-w-2xl rounded-lg bg-white text-gray-600 p-4 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 text-2xl sm:text-xl"
          >
            {/* oxlint-disable-next-line unicorn/no-null */}
            <pre className="text-xs overflow-scroll">{JSON.stringify(data, null, 2)}</pre>

            <div className="flex flex-row justify-end gap-4 mt-4">
              <IButton onClick={toggleDebugWindow} color="secondary">
                Close
              </IButton>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>,
    modalRoot,
  )
}
