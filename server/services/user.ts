import { IUser } from "../interface";
import User from "../models/userSchema";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomError } from "../utils/customError";
import mongoose, { ObjectId, PipelineStage } from "mongoose";
import { genPipelineObject } from "../utils/pipeline";

const createAccessToken = (userId: string | ObjectId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: "2h",
  });
};

const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(12);
  return await bcrypt.hash(password, salt);
};

export const registerUser = async (userData: IUser) => {
  const hashedPassword = await hashPassword(userData.password);
  userData.password = hashedPassword;
  return User.create(userData);
};

export const loginUser = async (email: string, password: string) => {
  const pipeline = genPipelineObject();
  const result = await User.aggregate([
    {
      $match: { email },
    },
    ...pipeline,
  ]);
  const user = result[0];

  if (!user) {
    throw new CustomError("Authentication Error", "User does not exist");
  }

  const isPasswordCorrect = await comparePasswords(password, user.password);
  if (!isPasswordCorrect) {
    throw new CustomError(
      "Authentication Error",
      "Incorrect email or password"
    );
  }

  const token = createAccessToken(user._id.toString());

  return { user, token };
};

export const updateLocation = async (
  userId: string,
  locationData: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  }
) => {
  /* const pipeline = genPipelineObject();
  const result = await User.aggregate([
    {
      $match: { _id: userId },
    },
    {
      $unset: ["__v", "passsword"],
    },
    ...pipeline,
  ]); */
  const user = await User.findById(userId);
  if (user) {
    (user.location as any).type = "Point";
    user.city = locationData.city;
    user.country = locationData.country;
    if (user.location!.coordinates.length === 0) {
      user.location!.coordinates.push(
        locationData.longitude,
        locationData.latitude
      );
    } else {
      user.location!.coordinates[0] = locationData.longitude;
      user.location!.coordinates[1] = locationData.latitude;
    }

    await user.save();
    return user.location;
  }
};

export const findUsers = async (
  accountType: string,
  filterObj: {
    age?: any;
    gender?: string;
    _id: any;
  },
  maxDistance: number,
  coords: [number, number]
) => {
  let aggPipeline: PipelineStage[] = [
    {
      $geoNear: {
        near: { type: "Point", coordinates: coords },
        distanceField: "dist.calculated",
        maxDistance: 1000 * maxDistance,
        spherical: true,
        query: filterObj,
      },
    },
    {
      $unset: ["password", "__v", "createdAt", "updatedAt", "dist"],
    },
  ];

  if (accountType === "regular") {
    aggPipeline.push({ $limit: 11 });
  }

  const users = await User.aggregate(aggPipeline);
  return users;
};

export const handlePushToken = (
  pushToken: string,
  userId: mongoose.Types.ObjectId
) => {
  return User.findByIdAndUpdate(userId, { pushToken }, { new: true }).populate(
    "likes likedBy dislikes dislikedBy matches",
    "_id firstname lastname age gender images location city country"
  );
};
