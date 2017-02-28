const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/user')

module.exports = (app, secret) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: secret,
  }

  const JwtAuthentication = new JwtStrategy(opts, (payload, done) => {
    User.findById(payload._id, (err, user) => {
      if (err) { return done(err, false) }
      if (!user) { return done(null, false) }
      return done(null, user)
    })
  })

  app.use(passport.initialize())
  passport.use(JwtAuthentication)
  return {jwt: passport.authenticate('jwt', {session: false})}
}
