import passport from 'passport';
import config from '../../config';
import { Strategy as LinkedInStrategy } from 'passport-linkedin';

function linkedinVerify(token, tokenSecret, profile, done) {
  done(null, { token, tokenSecret, profile });
}

function linkedLogedIn(req, res) {
  console.log('rerer', req.user);
  res.json(req.user);
}

function linkedInMiddleware() {
  return (req, res, next) =>
    passport.authenticate('linkedin', (err, user) => {
      next(err, user);
    })(req, res, next);
}

export function initLinkedIn(app) {
  passport.use(new LinkedInStrategy({
    consumerKey: config.linkedin.apiKey,
    consumerSecret: config.linkedin.apiSecret,
    callbackURL: `http://${config.server.host}:${config.server.port}/auth/linkedin/callback`,
    profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline'],
  }, linkedinVerify));

  app.get('/auth/linkedin', passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress'] }));
  app.get('/auth/linkedin/callback', linkedInMiddleware(), linkedLogedIn);
}

export default initLinkedIn;
