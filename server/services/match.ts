import User from "../models/userSchema";
import { CustomError } from "../utils/customError";

export const likeUser = async (likedById: string, userId: string) => {
  try {
    let isMatch = false;
    const user = await User.findById(likedById, "-password");
    const likedUser = await User.findById(userId, "-password");

    if (user && likedUser) {
      user.likes.push(userId);
      likedUser.likedBy.push(likedById);

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
  } catch (error) {
    throw new CustomError("Error", "User not found");
  }
};
