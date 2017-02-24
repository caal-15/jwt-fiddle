const User = require('../models/user')

module.exports = (app, mountPoint, auth) => {
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
      res.json({msg: 'You are authenticated!... more or less'})
    })
  })

  app.get(`${mountPoint}/`, (req, res) => {
    res.json({msg: 'You should not be here!, or should you?'})
  })
}
