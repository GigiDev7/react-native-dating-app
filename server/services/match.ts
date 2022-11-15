import User from "../models/userSchema";
import { CustomError } from "../utils/customError";

export const likeUser = async (likedById: string, userId: string) => {
  try {
    const user = await User.findById(likedById);
    const likedUser = await User.findById(userId);

    if (user && likedUser) {
      user.likes.push(userId);
      likedUser.likedBy.push(likedById);

      if (user.likedBy.includes(userId)) {
        user.matches.push(userId);
        likedUser.matches.push(likedById);
      }
      await user.save();
      await likedUser.save();
    } else {
      throw new CustomError("Data error", "Could not find user");
    }
  } catch (error) {
    throw new CustomError("Error", "Failed");
  }
};
