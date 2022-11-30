import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { updateImages } from "../services/images";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    const paths = (req.files as Array<any>).map((el: any) => el.path);
    const user = await updateImages(userId, paths);
    const { password, __v, ...updatedUser } = (user as any)._doc;
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
