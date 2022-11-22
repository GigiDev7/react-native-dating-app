import { IUser } from "../interface";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomError } from "../utils/customError";
import { ObjectId } from "mongoose";

const createAccessToken = (userId: string | ObjectId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });
};

const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const registerUser = async (userData: IUser) => {
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  return User.create(userData);
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Authentication Error", "User does not exist");
  }

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      "Authentication Error",
      "Incorrect email or password"
    );
  }

  const token = createAccessToken(user._id.toString());

  return { user, token };
};

export const updateLocation = async (
  userId: string,
  locationData: {
    latitude: string;
    longitude: string;
    city: string;
    country: string;
  }
) => {
  const user = await User.findById(userId, "-password,-__v");
  if (user) {
    user.location = locationData;
    await user.save();
    return user;
  }
};
