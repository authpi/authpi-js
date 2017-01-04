import request from 'chakram';
import { removeAllUsers, testUser } from './helpers';

describe('Register New User:', () => {
  beforeAll(done => removeAllUsers().then(done));
  it('adds new user and returns JWT token', () =>
    request.post('http://localhost:3001/users/register', testUser)
      .then(response => {
        expect(response.response.statusCode).toEqual(200);
        expect('id' in response.body).toBeTruthy();
        expect('token' in response.body).toBeTruthy();
      })
  );
  it('adds user with same email returning error', () =>
    request.post('http://localhost:3001/users/register', testUser)
      .then(response => {
        expect(response.response.statusCode).not.toEqual(200);
      })
  );
  // bug @ index
  it('adds another user and returns JWT token', () =>
    request.post('http://localhost:3001/users/register', { email: 'test2@test.com', password: 'test' })
      .then(response => {
        expect(response.response.statusCode).toEqual(200);
      })
  );
});
