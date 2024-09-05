import mongoose from 'mongoose';
import { type } from 'os';

const { model, models, Schema } = mongoose;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema(
  {
    name:{type:String},
    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    streetAddress:{type:String},
    phone:{type:String},
    postalCode:{type:String},
    city:{type:String},
    country:{type:String},
    admin:{type:Boolean,default:false},
    //admin:{type:Boolean,default:false}
  },
  { timestamps: true }
);


export const User = models.User || model('User', UserSchema);
