import { Request } from "express";

export interface IUser {
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

export interface CustomRequest extends Request {
  user?: IUser | null;
}
