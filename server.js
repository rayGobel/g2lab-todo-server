const Hapi = require('hapi')
const Qs = require('qs')
const Todos = require('./routes/todo-mock.js')

const routes = [
  {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return 'Hello, World!'
    }
  },
  {
    method: 'GET',
    path: '/hello-test',
    handler: (request, h) => {
      return 'Hello, Test!'
    }
  }
]

// Server Init
const init = async () => {
  const server = Hapi.server({
    port: 6969,
    host: 'localhost',
    query: {
      parser: (query) => Qs.parse(query)
    }
  })

  // Plugin registration
  await server.register({
    plugin: require('hapi-cors'),
    options: {
      origins: ['*'],
      methods: ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE']
    }
  })

  // Route registration
  server.route(routes)
  server.route(Todos)

  await server.start()
  console.log(`server running on %s`, server.info.uri)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

init()
