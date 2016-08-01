import passport from 'passport';
import config from '../../config';
import User from '../user/model';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import authenticationMiddleware from './middleware';

function lookupUser(payload, done) {
  User.findOne({ email: payload.email })
    .then(user => done(null, user))
    .catch(err => done(err, false));
}

function initPassport() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: config.auth.secret,
  };
  passport.use(new JwtStrategy(opts, lookupUser));
  passport.authenticationMiddleware = authenticationMiddleware;
}

export default initPassport;
