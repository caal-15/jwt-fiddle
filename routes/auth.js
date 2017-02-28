const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = (app, mountPoint, auth, secret) => {
  app.post(`${mountPoint}/`, (req, res) => {
    User.findOne(req.params, (err, user) => {
      if (err) {
        res.status(500)
        return res.json({error: err})
      }
      if (!user) {
        res.status(401)
        return res.json({error: 'Unauthorized'})
      }
      const token = 'JWT ' + jwt.sign({_id: user._id}, secret)
      res.json({token: token})
    })
  })

  app.get(`${mountPoint}/`, auth.jwt, (req, res) => {
    res.json({msg: 'Token is valid!'})
  })
}
