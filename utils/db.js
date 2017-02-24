const mongoose = require('mongoose')
const User = require('../models/user')

module.exports = {
  start: () => {
    mongoose.connect('mongodb://localhost/jwt-fiddle', () => {
      console.log('Connected to DB')
    })
  },
  createUser: (data) => {
    User.create(data, (err, user) => {
      if (err) { return console.log('Error creating User') }
      console.log(user.toObject())
    })
  },
  close: () => {
    mongoose.connection.close(() => {
      console.log('Connection closed')
    })
  }
}
