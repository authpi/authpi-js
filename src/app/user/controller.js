import User from './model';
import credential from 'credential';
const pw = credential();

// return Promise
export function addUser({ email, password }) {
  return pw.hash(password).then(hash => User.create({ email, password: hash }));
}

export function authUser({ email, password }) {
  return new Promise((resolve, reject) => {
    const findUserByEmail = User.findOne({ email });
    findUserByEmail.then(user => {
      console.log('Found User', user._id);
      const verifyPassword = pw.verify(user.password, password);
      verifyPassword.then(isValid => {
        console.log('Verify Password', isValid);
        if (!isValid) {
          reject(new Error('Invalid Password'));
        }
        resolve(user);
      });
      verifyPassword.catch(err => reject(err));
    });
    findUserByEmail.catch(err => reject(err));
  });
}

export function updateProfile(email, data) {
  // we don't pick any particular fields here since the profile fields can be dynamic
  // if any data white listing needed, it should be done at a higher level
  // so for now, this is a dumb save() method call
  return User.findOne({ email }).then(user => {
    user.profile = data;
    return user.save();
  });
}

export function getProfile(email) {
  return new Promise((resolve, reject) => {
    const findUserByEmail = User.findOne({ email });
    findUserByEmail.then(user => resolve(user.profile));
    findUserByEmail.catch(err => reject(err));
  });
}
