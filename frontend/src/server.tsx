import { serve } from 'bun'

const server = serve({
  routes: {
    '/path': {
      GET(req) {
        return Response.json({ message: 'Hello World' })
      },
      POST(req) {
        return Response.json({ message: 'Hello World' })
      },
    },
  },

  fetch(_req) {
    return new Response('fallback response')
  },
})

console.log(`Server running at ${server.url}`)
