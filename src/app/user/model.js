import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  displayName: String,
  password: String,
  linkedinData: Schema.Types.Mixed,
  createdAt: Date,
  profile: {
    firstName: String,
    lastName: String,
    company: String,
    categories: String,
    address: String,
    address2: String,
    phone: String,
  },
  resetPasswordToken: String,
});

schema.index({ email: 1 });

const Model = mongoose.model('User', schema);

export default Model;
