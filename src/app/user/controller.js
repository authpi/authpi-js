import User from './model';
import credential from 'credential';
const pw = credential();

// return Promise
export function addUser({ email, password }) {
  return pw.hash(password).then(hash => User.create({ email, password: hash }));
}

export function findOrCreateLinkedInUser({ linkedInId, displayName, firstName, lastName }) {
  return new Promise((resolve, reject) =>
    User.findOne({ linkedInId }).exec((err, user) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        return User.create({
          linkedInId,
          displayName,
          profile: {
            firstName,
            lastName,
          },
        }).then(resolve).catch(reject);
      }
      return resolve(user);
    })
  );
}

export function authUser({ email, password }) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        const verifyPassword = pw.verify(user.password, password);
        verifyPassword.then(isValid => {
          if (!isValid) {
            reject(new Error('Invalid Password'));
          }
          resolve(user);
        });
        verifyPassword.catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
}

export function updateProfile(id, data) {
  // we don't pick any particular fields here since the profile fields can be dynamic
  // if any data white listing needed, it should be done at a higher level
  // so for now, this is a dumb save() method call
  return User.findById(id).then(user => {
    user.profile = data;
    return user.save();
  });
}

export function getProfile(id) {
  return new Promise((resolve, reject) => {
    User.findById(id)
      .then(user => resolve(user.profile))
      .catch(err => reject(err));
  });
}
