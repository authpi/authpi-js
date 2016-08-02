import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  linkedInId: { type: String, unique: true },
  provider: String,
  email: { type: String, unique: true },
  displayName: String,
  password: String,
  credential: {
    token: String,
    tokenSecret: String,
  },
  createdAt: Date,
  profile: {
    firstName: String,
    lastName: String,
    company: String,
    categories: [String],
    address1: String,
    address2: String,
    phone: String,
  },
  resetPasswordToken: String,
});

schema.index({ email: 1, linkedInId: 1 });

const Model = mongoose.model('User', schema);

export default Model;
