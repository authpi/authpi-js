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

export function handleRegister(req, res) {
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

export function handleLogin(req, res) {
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

export function handleUpdateProfile(req, res) {
  const data = pick(req.body, ['firstName', 'lastName', 'company', 'categories', 'address1', 'address2', 'phone']);
  return updateProfile(req.user.email, data)
    .then(user => res.json(user.profile))
    .catch(() => res.boom.badImplementation());
}

export function handleGetProfile(req, res) {
  return getProfile(req.user.email)
    .then(profile => res.json(profile))
    .catch(() => res.boom.badImplementation());
}

export function handleLoginLinkedIn() {
  //
}
