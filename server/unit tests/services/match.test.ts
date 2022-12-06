import mongoose from "mongoose";
import { IUser } from "../../interface";
import User from "../../models/userSchema";
import { dislikeUser, likeUser } from "../../services/match";

const mockUser: IUser | any = {
  firstname: "name",
  lastname: "lastname",
  email: "email",
  password: "password",
  age: 22,
  _id: new mongoose.Types.ObjectId("111111111111"),
  gender: "male",
  likesLimit: 0,
  limitExpiration: 0,
  location: { coordinates: [0, 0] },
  save: jest.fn().mockResolvedValue({}),
  accountType: "regular",
  likes: [],
  likedBy: [],
  dislikes: [],
  dislikedBy: [],
  matches: [],
};

const mockUser2: IUser | any = {
  firstname: "name",
  lastname: "lastname",
  email: "email",
  password: "password",
  age: 22,
  _id: new mongoose.Types.ObjectId("222222222222"),
  gender: "male",
  likesLimit: 0,
  limitExpiration: 0,
  location: { coordinates: [0, 0] },
  save: jest.fn().mockResolvedValue({}),
  accountType: "regular",
  likes: [],
  likedBy: [],
  dislikes: [],
  dislikedBy: [],
  matches: [],
};

const mockUser3: IUser | any = {
  firstname: "name",
  lastname: "lastname",
  email: "email",
  password: "password",
  age: 22,
  _id: new mongoose.Types.ObjectId("333333333333"),
  gender: "male",
  likesLimit: 0,
  limitExpiration: new Date().getTime() + 10000,
  location: { coordinates: [0, 0] },
  save: jest.fn().mockResolvedValue({}),
  accountType: "regular",
  likes: [],
  likedBy: [],
  dislikes: [],
  dislikedBy: [],
  matches: [],
};

describe("match services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("like user:SUCCESS", async () => {
    User.findById = jest.fn((val) => {
      if (val == mockUser._id) return mockUser;
      return mockUser2;
    });

    const { resUser: user, likedUser } = await likeUser(
      mockUser._id,
      mockUser2._id
    );

    expect((user as any).likes).toHaveLength(1);
    expect(likedUser.likedBy).toHaveLength(1);
    expect((user as any).likesLimit).toBe(1);
  });

  test("like user:FAILURE", async () => {
    User.findById = jest.fn((val) => {
      if (val == mockUser3._id) return mockUser3;
      return mockUser2;
    });

    try {
      await likeUser(mockUser3._id, mockUser2._id);
    } catch (error) {
      expect(error).toMatchObject({
        name: "Like Expiration Error",
        message: "You dont have any likes left today",
      });
    }
  });

  test("dislike user", async () => {
    User.findById = jest.fn((val) => {
      if (val == mockUser._id) return mockUser;
      return mockUser2;
    });

    await dislikeUser(mockUser._id, mockUser2._id);

    expect(mockUser.dislikes).toHaveLength(1);
    expect(mockUser2.dislikedBy).toHaveLength(1);
  });
});
