export default {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000,
  recoverPasswordUrl: process.env.RECOVER_PASSWORD_URL || 'http://localhost:4200/welcome/auth/password',
};
