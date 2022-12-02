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
    const { password, __v, ...userData } = user;
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
    const userGender = (req as any).user.gender;
    const userId = (req as any).user._id;
    const coords = (req as any).user.location.coordinates;
    const likes = (req as any).user.likes;
    const dislikes = (req as any).user.dislikes;
    const matches = (req as any).user.matches;

    const filterObject: {
      age?: any;
      gender?: string;
      _id: any;
    } = {
      _id: { $nin: [userId, ...likes, ...dislikes, ...matches] },
    };
    const { minAge, maxAge, maxDistance, gender } = req.query;
    if (gender) {
      const genders = gender.toString().split(",");
      if (genders.length === 1) filterObject.gender = genders[0];
    } else {
      filterObject.gender = userGender === "male" ? "female" : "male";
    }

    if (minAge) filterObject.age = { $gte: +minAge };
    if (maxAge) filterObject.age = { ...filterObject?.age, $lte: +maxAge };

    let distance = 50;
    if (maxDistance) distance = +maxDistance;

    const users = await findUsers(filterObject, distance, coords);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
