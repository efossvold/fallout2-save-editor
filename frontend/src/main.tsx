import { createRoot } from 'octane'

import { App } from './app'
import { getDocument } from './ui/utils'

const container = getDocument()?.getElementById('root')

if (!container) {
  throw new Error("'root' element not found")
}

createRoot(container).render(App)
