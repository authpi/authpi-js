import request from 'chakram';
import { assert } from 'chai';
import { removeAllUsers, testUser } from './helpers';

describe('Register New User:', () => {
  before(done => removeAllUsers().then(done));
  it('adds new user and returns JWT token', () =>
    request.post('http://localhost:3001/users/register', testUser)
      .then(response => {
        assert.equal(response.response.statusCode, 200);
        assert.property(response.body, 'id');
        assert.property(response.body, 'token');
      })
  );
  it('adds user with same email returning error', () =>
    request.post('http://localhost:3001/users/register', testUser)
      .then(response => {
        assert.notEqual(response.response.statusCode, 200);
      })
  );
});
