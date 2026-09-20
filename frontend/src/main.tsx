import { hydrate, prerender as ssr } from 'preact-iso'

import { App } from './app'
import { getDocument } from './ui/utils'

if (typeof globalThis.window !== 'undefined') {
  const container = getDocument()?.getElementById('root')

  if (!container) {
    throw new Error("'root' element not found")
  }

  hydrate(<App />, container)
}

export const prerender = async () =>
  await ssr(
    <>
      <App />
      <script async src="https://scripts.simpleanalyticscdn.com/latest.js" />
    </>,
  )
