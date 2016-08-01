import app from './app';
import config from './config';

app.listen(config.server.port, (err) => {
  if (err) {
    throw err;
  }

  console.log(`server is listening on ${config.server.port}...`);
});
