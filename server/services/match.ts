import { ObjectId } from "mongoose";
import User from "../models/userSchema";
import { CustomError } from "../utils/customError";
import { Types } from "mongoose";

export const likeUser = async (
  likedById: Types.ObjectId,
  userId: Types.ObjectId
) => {
  try {
    let isMatch = false;
    const user = await User.findById(likedById, "-password");
    const likedUser = await User.findById(userId, "-password");

    if (
      user &&
      user.limitExpiration !== 0 &&
      new Date().getTime() < user.limitExpiration
    ) {
      throw new CustomError(
        "Like Expiration Error",
        "You dont have any likes left today"
      );
    } else {
      if (user && likedUser) {
        user.likes.push(userId);
        likedUser.likedBy.push(likedById);
        if (user.likesLimit === 9) {
          user.likesLimit = 0;
          user.limitExpiration = new Date().getTime() + 24 * 60 * 60 * 1000;
        } else {
          user.likesLimit += 1;
          user.limitExpiration = 0;
        }

        if (user.likedBy.includes(userId)) {
          user.matches.push(userId);
          likedUser.matches.push(likedById);
          isMatch = true;
        }
        await user.save();
        await likedUser.save();

        return { user, likedUser, isMatch };
      } else {
        throw new CustomError("Data error", "Could not find user");
      }
    }
  } catch (error) {
    throw new CustomError("Error", "User not found");
  }
};

export const dislikeUser = async (
  dislikedById: Types.ObjectId,
  userId: Types.ObjectId
) => {
  try {
    const user = await User.findById(dislikedById);
    const dislikedUser = await User.findById(userId);

    if (user && dislikedUser) {
      user.dislikes.push(userId);
      dislikedUser.dislikedBy.push(dislikedById);

      await user.save();
      await dislikedUser.save();
    }
  } catch (error) {
    throw new CustomError("Error", "User not found");
  }
};
