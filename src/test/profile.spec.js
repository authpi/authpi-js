import request from 'chakram';
import { assert } from 'chai';
import { testUser, removeAllUsers, addTestUser } from './helpers';

describe('User Profile', () => {
  // clean collection and add a test user
  before(done => removeAllUsers().then(addTestUser).then(done));
  it('should not allow getting profile if not authenticated', () =>
    request
      .get('http://localhost:3001/users/profile')
      .then(response => {
        assert.equal(response.response.statusCode, 401); // Unauthorize
      })
  );
  it('should not allow updating profile if not authenticated', () =>
    request
      .post('http://localhost:3001/users/profile', {
        firstName: 'Test',
        lastName: 'Bot',
      })
      .then(response => {
        assert.equal(response.response.statusCode, 401); // Unauthorize
      })
  );

  context('When authenticated', () => {
    let token = '';
    before(done =>
      request
        .post('http://localhost:3001/users/login', testUser)
        .then(response => {
          token = response.body.token;
          done();
        })
    );
    it('should update profile info', () =>
      request
        .post('http://localhost:3001/users/profile', {
          firstName: 'Test',
          lastName: 'Bot',
        }, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then(response => {
          assert.equal(response.response.statusCode, 200);
          assert.equal(response.body.profile.firstName, 'Test');
          assert.equal(response.body.profile.lastName, 'Bot');
        })
    );
    it('should return profile info', () =>
      request
        .get('http://localhost:3001/users/profile', {
          headers: {
            Authorization: `JWT ${token}`,
          },
        })
        .then(response => {
          assert.equal(response.response.statusCode, 200);
          assert.equal(response.body.profile.firstName, 'Test');
          assert.equal(response.body.profile.lastName, 'Bot');
        })
    );
  });
});
