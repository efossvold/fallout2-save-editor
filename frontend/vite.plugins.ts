// oxlint-disable func-style
import type { HtmlTagDescriptor, Plugin } from 'vite'

export function fontPreloader(): Plugin {
  return {
    name: 'font-preloader',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const tags: HtmlTagDescriptor[] = []

        if (ctx.bundle) {
          Object.values(ctx.bundle).forEach(asset => {
            if (asset.fileName.endsWith('.woff2')) {
              tags.push({
                tag: 'link',
                injectTo: 'head',
                attrs: {
                  rel: 'preload',
                  as: 'font',
                  type: 'font/woff2',
                  href: `/${asset.fileName}`,
                  crossorigin: true,
                },
              })
            }
          })
        }

        return { html, tags }
      },
    },
  }
}
