const { Schema, models, model } = require("mongoose");

const userInfoSchema = new Schema({
  email: { type: String, required: true },
  streetAddress: { type: String },
  phone: { type: String },
  postalCode: { type: String },
  city: { type: String },
  country: { type: String },
  admin: { type: Boolean, default: false },
}, { timestamps: true });

export const UserInfo = models?.UserInfo || model('UserInfo', userInfoSchema);
