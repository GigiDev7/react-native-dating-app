import mongoose from "mongoose";
import { dislike, like } from "../../controllers/like";
import { IUser } from "../../interface";
import { dislikeUser, likeUser } from "../../services/match";
import { CustomError } from "../../utils/customError";

jest.mock("../../services/match");

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

const req = {
  params: { userId: "111111111111" },
  user: mockUser,
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((val) => val),
};
const next = jest.fn((val) => {});

describe("like controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("like user:SUCCESS", async () => {
    (likeUser as jest.Mock).mockResolvedValue({
      user: mockUser,
      likedUser: mockUser,
      isMatch: false,
    });

    await like(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
  });

  test("like user:FAILURE", async () => {
    (likeUser as jest.Mock).mockRejectedValue(
      new CustomError("error", "error")
    );

    await like(req as any, res as any, next as any);

    expect(next).toHaveBeenCalledWith({ message: "error", name: "error" });
  });

  /*  test("dislike user:SUCCESS", async () => {}); */
});
