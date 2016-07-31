import passport from 'passport';
import jwt from 'jsonwebtoken';
import config from '../../config';
import {
  isEmpty,
  pick,
} from 'lodash';
import {
  addUser,
  authUser,
  getProfile,
  updateProfile,
} from './controller';

function handleRegister(req, res) {
  if (isEmpty(req.body.email) || isEmpty(req.body.password)) {
    return res.boom.badRequest('Invalid Email/Password');
  }
  return addUser(pick(req.body, ['email', 'password']))
    .then(user => {
      const token = jwt.sign({
        email: user.email,
        id: user._id,
      }, config.auth.secret, {
        expiresIn: '7d',
      });
      res.json({
        id: user._id,
        token,
      });
    })
    .catch(err => {
      console.error(err);
      res.boom.conflict('Duplicated Email');
    });
}

function handleLogin(req, res) {
  if (isEmpty(req.body.email) || isEmpty(req.body.password)) {
    return res.boom.badRequest('Invalid Email/Password');
  }
  return authUser(pick(req.body, ['email', 'password']))
    .then(user => {
      const token = jwt.sign({
        email: user.email,
        id: user._id,
      }, config.auth.secret, {
        expiresIn: '7d',
      });
      res.json({
        id: user._id,
        email: user.email,
        profile: user.profile,
        token,
      });
    })
    .catch(err => {
      console.error(err);
      res.boom.badRequest('Invalid Email/Password');
    });
}

function handleUpdateProfile(req, res) {
  const data = pick(req.body, ['firstName', 'lastName', 'company', 'categories', 'address', 'address2', 'phone']);
  return updateProfile(req.user.email, data)
    .then(user => res.json(user.profile))
    .catch(() => res.boom.badImplementation());
}

function handleGetProfile(req, res) {
  return getProfile(req.user.email)
    .then(profile => res.json(profile))
    .catch(() => res.boom.badImplementation());
}

function initUser(app) {
  app.post('/users/login', handleLogin);
  app.post('/users/register', handleRegister);
  app.get('/users/profile', passport.authenticationMiddleware(), handleGetProfile);
  app.post('/users/profile', passport.authenticationMiddleware(), handleUpdateProfile);
}

export default initUser;
