import { ViteReactSSG } from 'vite-react-ssg/single-page'

import App from './app'

// oxlint-disable-next-line new-cap
export const createRoot = ViteReactSSG(<App />)
