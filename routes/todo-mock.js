const todos = require('./todos.js')

const randIntRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randDelay = function (min, max) {
  let delay = randIntRange(min, max)
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve()
    }, delay)
  })
}

const routes = [
  {
    method: 'GET',
    path: '/todos',
    handler: function (request ,h) {
      return randDelay(500, 1000)
        .then(() => {
          return h.response(todos)
        })
    }
  },
  {
    method: 'GET',
    path: '/todos/',
    handler: function (request ,h) {
      return randDelay(500, 1000)
        .then(() => {
          return h.response(todos)
        })
    }
  },
  {
    method: 'GET',
    path: '/todo/{id?}',
    handler: function (request ,h) {
      let todoId = request.params.id
      return todos.filter(todo => todo.id === todoId)
    }
  },
  {
    method: 'POST',
    path: '/todo',
    handler: function (request ,h) {
      const newTodo = request.payload
      todos.push(newTodo)
      return h.response('todo has been added').code(201)
    }
  }
]

module.exports = routes
