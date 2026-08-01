import { createRoot } from 'octane'
// import { renderToString } from 'octane/server'

import { App } from './app'
import { getDocument } from './ui/utils'

const container = getDocument()?.getElementById('root')

if (!container) {
  throw new Error("'root' element not found")
}

// const xxx = renderToString(App)
// console.log(xxx.html)

createRoot(container).render(App)
