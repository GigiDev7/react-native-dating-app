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
      latitude: String,
      longitude: String,
      city: String,
      country: String,
    },
    likes: {
      type: [String],
    },
    dislikes: {
      type: [String],
    },
    likedBy: {
      type: [String],
    },
    dislikedBy: {
      type: [String],
    },
    matches: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
