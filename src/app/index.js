import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import boom from 'express-boom';
import cors from 'cors';
import session from 'express-session';
import connectMongo from 'connect-mongo';
const MongoStore = connectMongo(session);

import config from '../config';
const app = express();

// only accept json
app.use(bodyParser.json());

// use boom error object
app.use(boom());

// allow request from all origins (temporary for this demo only)
app.use(cors());

// connect to mongodb
import mongoose from 'mongoose';
mongoose.connect(config.mongoStore.url);

// support session
app.use(session({
  ...config.session,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));


import authentication from './authentication';
authentication.init(app);

// use es6 Promise (or from babel polyfill, whatever)
// @see http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

app.use(passport.initialize());
app.use(passport.session());

import user from './user';
user.init(app);


// catchall pokémons
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // sadly, cannot use `boom` here :(
  res.status(500).json({
    statusCode: 500,
    error: 'Server Internal Error',
  });

  // in production, send this error to a log services (sentry, maybe)
  console.error(err);
}
app.use(errorHandler);

// eslint-disable-next-line no-unused-vars
function notfoundHandler(req, res, next) {
  res.status(404).json({
    statusCode: 404,
    error: 'Not Found',
  });
}
app.use(notfoundHandler);

export default app;
