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
  likes?: Types.ObjectId[];
  likedBy?: Types.ObjectId[];
  matches?: Types.ObjectId[];
  dislikes?: Types.ObjectId[];
  dislikedBy?: Types.ObjectId[];
  city?: String;
  country?: String;
  location?: { coordinates: [number, number] };
  likesLimit: number;
  limitExpiration: number;
}
