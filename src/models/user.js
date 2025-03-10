
import  mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: false
  },
  expiry: {
    type: Date,
    required: false
  }
});

  
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['patient', 'nurse', 'admin'],
    default: 'patient', 
  },
 
  firstName:  {
    type: String,
    required: false,
    minlength: 2,
    default: null
  },
  lastName: {
    type: String,
    required: false,
    minlength: 2,
    default: null
  },
  verified: {
    type: Boolean,
    default: false
  }, 
  AuthCode: tokenSchema,
  fcm: [{
    type: String,
    default: null
  }],
  resetPasswordToken: {
    type: String,
    default: null
  },

}, { 
    timestamps: true,
    versionKey: false
 });



const User = mongoose.model('User', UserSchema);

export default User;