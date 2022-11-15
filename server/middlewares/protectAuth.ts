import { Request, Response, NextFunction } from "express";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import { CustomError } from "../utils/customError";
import { CustomRequest, IUser } from "../interface";

export const protectAuth = (
  req: Request,
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
      if (err) {
        throw new CustomError("Authorization Error", "Authorization failed");
      }
      try {
        const user = await User.findById(decodedData.id, "-password -__v");
        if (user) (req as any).user = user as IUser;
        next();
      } catch (error) {
        next(error);
      }
    }
  );
};
