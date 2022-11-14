import { Request, Response, NextFunction } from "express";
import { registerUser } from "../services/user";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await registerUser(req.body);
    const { password, __v, ...user } = (newUser as any)._doc;
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
