export default {
  apiKey: process.env.LINKEDIN_API_KEY || '816o4rp99mtv66',
  apiSecret: process.env.LINKEDIN_SECRET_KEY || 'I6YhW5Unros2daQM',
  callbackUrl: process.env.LINKEDIN_CALLBACK_URL || 'http://localhost:3000/auth/linkedin/callback',
  loginRedirectUrl: process.env.LINKEDIN_LOGIN_REDIRECT_URL || 'http://localhost:4200/welcome/auth/login',
  registerRedirectUrl: process.env.LINKEDIN_REGISTER_REDIRECT_URL || 'http://localhost:4200/welcome/auth/register',
};
