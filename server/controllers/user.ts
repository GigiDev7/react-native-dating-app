import { Request, Response, NextFunction } from "express";
import {
  loginUser,
  registerUser,
  updateLocation,
  findUsers,
} from "../services/user";

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

export const patchLocation = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const user = await updateLocation(userId, req.body);
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const gender = (req as any).user.gender;
    const users = await findUsers(gender);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
