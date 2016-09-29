import mailgun from 'mailgun-js';
import MailComposer from 'mailcomposer';
import config from '../../config';
const mailer = mailgun(config.email);
import templates from './templates';

export function sendPasswordRecoveryEmail({ email, displayName = '', password }) {
  const context = {
    displayName,
    email,
    password,
  };
  const text = templates.resetPassword.plain(context);
  const html = templates.resetPassword.html(context);

  const mailcomposer = new MailComposer({
    from: config.email.from,
    to: `${displayName} <${email}>`,
    subject: `${config.email.brand} Password Reset`,
    text,
    html,
  });

  return new Promise((resolve, reject) =>
    mailcomposer.build((err, message) => {
      if (err) {
        return reject(err);
      }
      return mailer.messages().sendMime({
        to: `${displayName} <${email}>`,
        message: message.toString('ascii'),
      }, mailerErr => {
        if (mailerErr) {
          return reject(mailerErr);
        }
        return resolve();
      });
    })
  );
}
