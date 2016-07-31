import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import boom from 'express-boom';

import config from '../config';
const app = express();

app.use(bodyParser.json());

// use boom error object
app.use(boom());

import authentication from './authentication';
authentication.init(app);

// connect to mongodb
import mongoose from 'mongoose';
mongoose.connect(config.mongoStore.url);

// use es6 Promise (or from babel polyfill, whatever)
// @see http://mongoosejs.com/docs/promises.html
mongoose.Promise = Promise;

app.use(passport.initialize());
app.use(passport.session());

import user from './user';
user.init(app);

export default app;
