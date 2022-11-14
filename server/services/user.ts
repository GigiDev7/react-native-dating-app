import { IUser } from "../interface";
import User from "../models/userSchema";

export const registerUser = (userData: IUser) => {
  return User.create(userData);
};
