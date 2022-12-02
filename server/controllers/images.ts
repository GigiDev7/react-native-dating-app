import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { updateImages } from "../services/images";
import fs from "fs/promises";
import path from "path";

export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.params.userId);
    let paths = (req.files as Array<any>).map((el: any) => el.path);

    if ((req as any).body.images) {
      paths = [...paths, ...(req as any).body.images.split(",")];
      const files = await fs.readdir(`./images/${userId}`);
      const images = paths.map((p: string) => {
        const ind = p.lastIndexOf("\\");
        return p.slice(ind + 1);
      });
      files.forEach(async (f: string) => {
        if (!images.includes(f)) {
          await fs.unlink(`./images/${userId}/${f}`);
        }
      });
    }
    const user = await updateImages(userId, paths);
    const { password, __v, ...updatedUser } = (user as any)._doc;
    res.status(201).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
