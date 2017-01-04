import request from 'chakram';
import { testUser, removeAllUsers, addTestUser } from './helpers';

describe('User Profile', () => {
  // clean collection and add a test user
  beforeAll(done => removeAllUsers().then(addTestUser).then(done));
  it('should not allow getting profile if not authenticated', () =>
    request
      .get('http://localhost:3001/users/profile')
      .then(response => {
        expect(response.response.statusCode).toEqual(401); // Unauthorize
      })
  );
  it('should not allow updating profile if not authenticated', () =>
    request
      .post('http://localhost:3001/users/profile', {
        firstName: 'Test',
        lastName: 'Bot',
      })
      .then(response => {
        expect(response.response.statusCode).toEqual(401); // Unauthorize
      })
  );

  describe('When authenticated', () => {
    let token = '';
    beforeAll(done =>
      request
        .post('http://localhost:3001/users/login', testUser)
        .then(response => {
          token = response.body.token;
          done();
        }));
    it('should update profile info', () =>
      request
        .post('http://localhost:3001/users/profile', {
          firstName: 'Test',
          lastName: 'Bot',
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          expect(response.response.statusCode).toEqual(200);
          expect(response.body.profile.firstName).toEqual('Test');
          expect(response.body.profile.lastName).toEqual('Bot');
        })
    );
    it('should return profile info', () =>
      request
        .get('http://localhost:3001/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          expect(response.response.statusCode).toEqual(200);
          expect(response.body.profile.firstName).toEqual('Test');
          expect(response.body.profile.lastName).toEqual('Bot');
        })
    );
  });
});
