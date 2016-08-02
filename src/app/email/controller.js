import mailgun from 'mailgun-js';
import MailComposer from 'mailcomposer';
import config from '../../config';
const mailer = mailgun(config.email);
import templates from './templates';

export function sendPasswordRecoveryEmail({ email, displayName = '', code }) {
  const context = {
    displayName,
    email,
    recoveryUrl: `${config.server.recoverPasswordUrl}?code=${code}`,
  };
  const text = templates.resetpassword.plain(context);
  const html = templates.resetpassword.html(context);

  const mailcomposer = new MailComposer({
    from: 'Cyza Inc. <noreply@nomadreact.com>',
    to: `${displayName} <${email}>`,
    subject: 'Cyza Password Reset',
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
