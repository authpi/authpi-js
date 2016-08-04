import User from './model';
import randtoken from 'rand-token';
import credential from 'credential';
const pw = credential();

// return Promise
export function addUser({ email, password }) {
  return pw.hash(password).then(hash => User.create({ username: email, email, password: hash }));
}

export function findOrCreateLinkedInUser({ linkedInId, displayName, firstName, lastName }) {
  return new Promise((resolve, reject) =>
    User.findOne({ linkedInId }).exec((err, user) => {
      if (err) {
        return reject(err);
      }
      if (!user) {
        return User.create({
          username: linkedInId,
          displayName,
          profile: {
            firstName,
            lastName,
          },
        })
        .then(doc => resolve({ user: doc, isNew: true }))
        .catch(reject);
      }
      return resolve({ user, isNew: false });
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
      .then(resolve)
      .catch(reject);
  });
}

export function createResetPasswordToken(email) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return reject(new Error('Email Not Found'));
        }
        user.resetPasswordToken = randtoken.generate(16);
        return user.save()
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });
}

export function resetPasswordForCode(code) {
  return new Promise((resolve, reject) => {
    User.findOne({ resetPasswordToken: code })
      .then(user => {
        if (!user) {
          return reject(new Error('Invalid or Expired Code'));
        }

        const newPassword = randtoken.generate(8);
        return pw.hash(newPassword).then(hash => {
          delete user.resetPasswordToken;
          user.password = hash;
          user.save((err => {
            if (err) {
              return reject(err);
            }
            return resolve(newPassword);
          }));
        });
      })
      .catch(reject);
  });
}

export function resetPassword(email) {
  return new Promise((resolve, reject) =>
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return reject(new Error('Email Not Found'));
        }
        const newPassword = randtoken.generate(8);
        return pw.hash(newPassword).then(hash => {
          user.password = hash;
          user.save((err => {
            if (err) {
              return reject(err);
            }
            return resolve({ user, newPassword });
          }));
        });
      })
      .catch(reject));
}
