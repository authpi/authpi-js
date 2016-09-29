import handlebars from 'handlebars';

const plainSource = `Hi {{displayName}},

Please find new password for your AuthPI account below:

{{password}}

Thanks!
- The AuthPI Team

This e-mail has been generated automatically. Please, do not reply to this message.`;

const htmlSource = `<html>
<body>
  Hi {{displayName}},
  <br/><br/>
  Please find new password for your AuthPI account below:
  <br/><br/>
  <pre>{{password}}</pre>
  <br/><br/>
  Thanks!
  <br/>
  - The AuthPI Team
  <br/><br/>
  <i>This e-mail has been generated automatically. Please, do not reply to this message.</i>
</body>
</html>`;

export default {
  plain: handlebars.compile(plainSource),
  html: handlebars.compile(htmlSource),
};
