import request from 'chakram';
import { assert } from 'chai';
import { testUser, removeAllUsers, addTestUser } from './helpers';

describe('Login User', () => {
  // clean collection and add a test user
  before(done => removeAllUsers().then(addTestUser).then(done));
  it('logs user in and returns JWT token', () =>
    request
      .post('http://localhost:3000/users/login', testUser)
      .then(response => {
        assert.equal(response.response.statusCode, 200);
        assert.property(response.body, 'id');
        assert.property(response.body, 'token');
      })
  );
  it('returns error if creds are incorrect', () =>
    request
      .post('http://localhost:3000/users/login', {
        email: 'test@test.com',
        password: '123',
      })
      .then(response => {
        assert.notEqual(response.response.statusCode, 200);
      })
  );
});
