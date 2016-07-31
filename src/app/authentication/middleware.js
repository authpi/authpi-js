import passport from 'passport';

function authenticationMiddleware() {
  return passport.authenticate('jwt', { session: false });
}

export default authenticationMiddleware;
