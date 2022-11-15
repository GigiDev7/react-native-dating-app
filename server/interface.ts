import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  age: number;
  bio?: string;
  gender: string;
  email: string;
  password: string;
  likes?: string[];
  likedBy?: string[];
  matches?: string[];
}
