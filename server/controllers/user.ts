import { Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../services/user";

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

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, token } = await loginUser(req.body.email, req.body.password);
    const { password, __v, ...userData } = (user as any)._doc;
    userData.token = token;
    res.status(200).json(userData);
  } catch (error) {
    next(error);
  }
};
