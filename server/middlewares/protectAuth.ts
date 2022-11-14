import { Request, Response, NextFunction } from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError";
import { CustomRequest } from "../interface";

export const protectAuth = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const headers = req.headers as any;

  if (!headers?.authorization || !headers?.authorization?.split(" ")[1]) {
    throw new CustomError("Authorization Error", "Authorization failed");
  }

  const token = headers.authorization.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decodedData: any) => {
      try {
        if (err) {
          throw new CustomError("Authorization Error", "Authorization failed");
        }
        req.user = await User.findById(decodedData.id, "-password -__v");
        next();
      } catch (error) {
        next(error);
      }
    }
  );
};
