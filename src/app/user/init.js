import passport from 'passport';
import {
  handleLogin,
  handleRegister,
  handleGetProfile,
  handleUpdateProfile,
} from './routes';

function initUser(app) {
  app.post('/users/login', handleLogin);
  app.post('/users/register', handleRegister);
  app.get('/users/profile', passport.authenticationMiddleware(), handleGetProfile);
  app.post('/users/profile', passport.authenticationMiddleware(), handleUpdateProfile);
}

export default initUser;
