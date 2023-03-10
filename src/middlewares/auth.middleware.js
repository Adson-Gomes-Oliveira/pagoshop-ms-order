const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const { verifyToken } = require('../helpers/token.jwt');

passport.use(
  new BearerStrategy(
    (token, done) => {
      const user = verifyToken(token);
      return done(null, user);
    },
  ),
);
