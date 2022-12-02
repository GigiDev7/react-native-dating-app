import User from "../models/userSchema";
import { CustomError } from "../utils/customError";
import { Types } from "mongoose";
import { genPipelineObject } from "../utils/pipeline";

export const likeUser = async (
  likedById: Types.ObjectId,
  userId: Types.ObjectId
) => {
  try {
    const pipeline = genPipelineObject();
    let isMatch = false;
    const result = await User.aggregate([
      {
        $match: { _id: likedById },
      },
      {
        $unset: ["__v", "password"],
      },
      ...pipeline,
    ]);
    const user = result[0];
    const likedUser = await User.findById(userId, "-password");

    if (
      user &&
      user.accountType === "regular" &&
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
        if (user.accountType === "regular") {
          if (user.likesLimit === 9) {
            user.likesLimit = 0;
            user.limitExpiration = new Date().getTime() + 24 * 60 * 60 * 1000;
          } else {
            user.likesLimit += 1;
            user.limitExpiration = 0;
          }
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
    throw error;
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
