import { NextFunction, Response, Request } from "express";
import { likeUser, dislikeUser } from "../services/match";

export const like = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const likedById = (req as any).user._id;
    const userId = req.params.userId;
    const { user, likedUser, isMatch } = await likeUser(
      likedById.toString(),
      userId
    );
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
    const userId = req.params.userId;
    await dislikeUser(dislikedById.toString(), userId);
    res.status(204);
  } catch (error) {
    next(error);
  }
};
