const restify = require('restify')
const mongoose = require('mongoose')

const server = restify.createServer()

mongoose.connect('mongodb://localhost/jwt-fiddle')

require('./routes/auth')(server, '/api/auth')

server.listen(8080, () => {
  console.log('Listening on Port 8080')
})

process.on('SIGINT', function () {
  console.log('Shutting Down')
  mongoose.connection.close()
  process.exit()
})
