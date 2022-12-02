import User from "../models/userSchema";
import multer from "multer";
import mongoose from "mongoose";
import fs from "fs";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const dir = `./images/${(req as any).user._id}`;

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    cb(null, dir);
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

export const updateImages = (
  userId: mongoose.Types.ObjectId,
  imagePaths: string[],
  bio: string
) => {
  return User.findByIdAndUpdate(
    userId,
    { images: imagePaths, bio },
    { new: true }
  );
};

export const upload = multer({ storage });
