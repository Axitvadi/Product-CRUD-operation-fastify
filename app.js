const  Fastify = require('fastify')

const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.register(require('./routes/index'));
fastify.register(require('./config/db'))

// Run the server!
fastify.listen(3000, (err, address) => {
  if (err) throw err
})