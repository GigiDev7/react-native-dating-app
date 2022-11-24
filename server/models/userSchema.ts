import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      requried: [true, "Firstname is required"],
    },
    lastname: {
      type: String,
      required: [true, "Lastname is required"],
    },
    age: {
      type: Number,
      required: [true, "Age is required"],
    },
    bio: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: [isEmail, "Please provide valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
    },
    location: {
      coordinates: [Number],
    },
    city: String,
    country: String,
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    dislikes: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    likedBy: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    dislikedBy: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    matches: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    likesLimit: {
      type: Number,
      default: 0,
    },
    limitExpiration: {
      type: Number,
      default: 0,
    },
    accountType: {
      type: String,
      default: "regular",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ location: "2dsphere" });

const User = mongoose.model("User", userSchema);

export default User;
