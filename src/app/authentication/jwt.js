import passport from 'passport';
import config from '../../config';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import User from '../user/model';

function jwtVerify({ id }, done) {
  User.findById(id)
    .then(user => done(null, user))
    .catch(err => done(err, false));
}

export function jwtMiddleware() {
  return passport.authenticate('jwt', { session: false });
}

export function initJwt() {
  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
    secretOrKey: config.auth.secret,
  }, jwtVerify));
  passport.jwtMiddleware = jwtMiddleware;
}

export default initJwt;
