const restify = require('restify')
const mongoose = require('mongoose')

const server = restify.createServer()

mongoose.connect('mongodb://localhost/jwt-fiddle')
const secret = 'ILoveBaileysAndMojitos'
const auth = require('./middleware/passport')(server, secret)
require('./routes/auth')(server, '/api/auth', auth, secret)

server.listen(8080, () => {
  console.log('Listening on Port 8080')
})

process.on('SIGINT', function () {
  console.log('Shutting Down')
  mongoose.connection.close()
  process.exit()
})
