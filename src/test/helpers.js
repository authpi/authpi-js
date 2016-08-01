import mongoose from 'mongoose';
import { addUser } from '../app/user/controller';
import User from '../app/user/model';
import config from '../config';

// connect to mongodb
mongoose.connect(config.mongoStore.url);
mongoose.Promise = Promise;

export function removeAllUsers() {
  return new Promise((resolve, reject) => User.remove(err => (err ? reject(err) : resolve(null))));
}

export const testUser = {
  email: 'test@test.com',
  password: 'test',
};

export function addTestUser() {
  return addUser(testUser).then(res => Promise.resolve(null, res));
}
