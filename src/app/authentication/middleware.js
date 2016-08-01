import passport from 'passport';

function authenticationMiddleware() {
  return (req, res, next) => passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        error: 'Unauthorized',
      });
    }
    return next(null, user);
  })(req, res, next);
}

export default authenticationMiddleware;
