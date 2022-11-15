import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcrypt";

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
    likes: {
      type: [String],
    },
    likedBy: {
      type: [String],
    },
    matches: {
      type: [String],
    },
    location: {
      lat: {
        type: String,
      },
      lng: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
