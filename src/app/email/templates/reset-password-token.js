import handlebars from 'handlebars';

const plainSource = `Hi {{displayName}},

Someone recently requested a password change for your Cyza account.
If this was you, please follow the link below to reset your password.
The link will remain valid for 24 hours.

{{recoveryUrl}}

Thanks!
- The Cyza Team

This e-mail has been generated automatically. Please, do not reply to this message.`;

const htmlSource = `<html>
<body>
  Hi {{displayName}},
  <br/><br/>
  Someone recently requested a password change for your Cyza account.
  <br/>
  If this was you, please follow the link below to reset your password.
  <br/>
  The link will remain valid for 24 hours.
  <br/><br/>
  <a href='{{recoveryUrl}}'>Reset Password</a>
  <br/><br/>
  Thanks!
  <br/>
  - The Cyza Team
  <br/><br/>
  <i>This e-mail has been generated automatically. Please, do not reply to this message.</i>
</body>
</html>`;

export default {
  plain: handlebars.compile(plainSource),
  html: handlebars.compile(htmlSource),
};
