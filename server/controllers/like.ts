import { NextFunction, Response, Request } from "express";
import mongoose from "mongoose";
import { likeUser, dislikeUser } from "../services/match";

export const like = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likedById = (req as any).user._id;
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const {
      resUser: user,
      likedUser,
      isMatch,
    } = await likeUser(likedById, userId);
    res.status(200).json({ user, likedUser, isMatch });
  } catch (error) {
    next(error);
  }
};

export const dislike = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dislikedById = (req as any).user._id;
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    await dislikeUser(dislikedById, userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
