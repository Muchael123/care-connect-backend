import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  token: {
    type: Number,
    required: false,
  },
  expiry: {
    type: Date,
    required: false,
  },
});

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
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
      enum: ["patient", "nurse", "admin"],
      default: "patient",
    },
    firstName: {
      type: String,
      minlength: 2,
      default: "guest",
    },
    lastName: {
      type: String,
      minlength: 2,
      default: "guest1",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    AuthCode: tokenSchema,
    fcm: {
      type: [String],
      default: [],
    },
    resetPasswordToken: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    phone: { type: String },
    imageurl: { 
      secure_url: { type: String, default:null },
      public_id: { type: String, default: null },
    },
    dob: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true });

const User = mongoose.model("User", UserSchema);

export default User;
