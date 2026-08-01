/// <reference types="bun-types" />
import path from 'node:path'
import { prerender } from 'octane/static' // async; awaits all Suspense data

import { App } from './app.tsx'

const DEST_DIR = './dist'
const CLIENT_DIR = path.join(DEST_DIR, 'client')
const SRC_INDEX_HTML = path.join(CLIENT_DIR, 'index.html')
const DEST_INDEX_HTML = path.join(CLIENT_DIR, 'index.html')

const minifyHTML = (html: string) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '') // Remove HTML comments
    .replace(/\s+/g, ' ') // Collapse multiple spaces/newlines into one
    .replace(/>\s+</g, '><') // Remove spaces between tags
    .trim() // Trim outer spaces

const render = async (url: string) => {
  const { html, css, head } = await prerender(App)
  const index = await Bun.file(SRC_INDEX_HTML).text()
  const htmlContent = index.replace('<!--ssr-body-->', html)
  const htmlMinified = minifyHTML(htmlContent)
  await Bun.write(DEST_INDEX_HTML, htmlMinified)
  console.log({ url, html: htmlContent.length, html2: htmlMinified.length, css, head })
}

await render('/')
