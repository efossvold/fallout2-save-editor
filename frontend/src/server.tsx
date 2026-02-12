import { serve } from 'bun'

const server = serve({
  routes: {
    '/path': {
      GET(_req) {
        return Response.json({ message: 'Hello World' })
      },
      POST(_req) {
        return Response.json({ message: 'Hello World' })
      },
    },
  },

  fetch(_req) {
    return new Response('fallback response')
  },
})

console.log(`Server running at ${server.url}`)
