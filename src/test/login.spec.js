import request from 'chakram';
import { testUser, removeAllUsers, addTestUser } from './helpers';

describe('Login', () => {
  // clean collection and add a test user
  beforeAll(done => removeAllUsers().then(addTestUser).then(done));
  it('logs user in and returns JWT token', () =>
    request
      .post('http://localhost:3001/users/login', testUser)
      .then(response => {
        expect(response.response.statusCode).toEqual(200);
        expect('id' in response.body).toBeTruthy();
        expect('token' in response.body).toBeTruthy();
      })
  );
  it('returns error if creds are incorrect', () =>
    request
      .post('http://localhost:3001/users/login', {
        email: 'test@test.com',
        password: '123',
      })
      .then(response => {
        expect(response.response.statusCode).not.toEqual(200);
      })
  );
});
