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
  createResetPasswordToken,
} from './controller';
import { sendPasswordRecoveryEmail } from '../email';

export function handleRegister(req, res) {
  if (isEmpty(req.body.email) || isEmpty(req.body.password)) {
    return res.boom.badRequest('Invalid Email/Password');
  }
  return addUser(pick(req.body, ['email', 'password']))
    .then(user => {
      const token = jwt.sign({
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
  return updateProfile(req.user.id, data)
    .then(user => res.json(user.profile))
    .catch(() => res.boom.badImplementation());
}

export function handleGetProfile(req, res) {
  return getProfile(req.user.id)
    .then(profile => res.json(profile))
    .catch(() => res.boom.badImplementation());
}

export function handleResetPassword(req, res) {
  if (isEmpty(req.body.email)) {
    return res.boom.badRequest('Invalid Email');
  }
  return createResetPasswordToken(req.body.email)
    .then(user =>
      sendPasswordRecoveryEmail({ email: user.email, displayName: user.displayName, code: user.resetPasswordToken })
        .then(() => res.json({ success: true }))
        .catch(err => res.boom.badImplementation(err.message))
    )
    .catch(err => {
      if (err instanceof Error) {
        return res.boom.badRequest(err.message);
      }
      return res.boom.badImplementation(err.message);
    });
}