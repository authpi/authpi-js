import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { Strategy as LinkedInStrategy } from 'passport-linkedin';
import { findOrCreateLinkedInUser } from '../user';

function linkedinVerify(token, tokenSecret, profile, done) {
  done(null, { token, tokenSecret, profile });
}

function linkedLogedIn(req, res) {
  const params = {
    linkedInId: req.user.profile.id,
    displayName: req.user.profile.displayName,
    firstName: req.user.profile.name.givenName,
    lastName: req.user.profile.name.familyName,
  };
  findOrCreateLinkedInUser(params)
    .then(user => {
      const token = jwt.sign({
        id: user._id,
      }, config.auth.secret, {
        expiresIn: '7d',
      });
      res.redirect(`http://localhost:4200/welcome/auth/login?token=${token}`);
    })
    .catch(err => res.redirect(`http://localhost:4200/welcome/auth/login?error=${err.message}`));
}

function linkedInMiddleware() {
  return (req, res, next) =>
    passport.authenticate('linkedin', (err, user) => {
      req.user = user;
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
