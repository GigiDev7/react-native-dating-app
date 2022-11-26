import mongoose from "mongoose";
import { IUser } from "../../interface";
import {
  findUsers,
  loginUser,
  registerUser,
  updateLocation,
} from "../../services/user";
import {
  getUsers,
  login,
  patchLocation,
  register,
} from "../../controllers/user";
import { errorsHandler } from "../../middlewares/errorsHandler";
import { CustomError } from "../../utils/customError";

jest.mock("../../services/user");

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
  token: "",
};

const req = {
  params: { userId: "111111111111" },
  user: mockUser,
  body: mockUser,
  query: {},
};
const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn((val) => val),
};
const next: any = jest.fn((err) =>
  errorsHandler(err, req as any, res as any, next as any)
);

describe("users controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register user:SUCCESS", async () => {
    (registerUser as jest.Mock).mockResolvedValueOnce({ _doc: mockUser });

    await register(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("register user:FAILURE", async () => {
    (registerUser as jest.Mock).mockRejectedValueOnce(
      new CustomError("Validation Error", "Validation Error")
    );

    await register(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Validation Error" });
  });

  test("login user:SUCCESS", async () => {
    (loginUser as jest.Mock).mockResolvedValueOnce({
      user: { _doc: mockUser },
      token: "token",
    });

    await login(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  test("login user:FAILURE", async () => {
    (loginUser as jest.Mock).mockRejectedValueOnce(
      new CustomError("Authorization Error", "Authorization Error")
    );

    await login(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: "Authorization Error" });
  });

  test("location update:SUCCESS", async () => {
    (updateLocation as jest.Mock).mockResolvedValueOnce(mockUser);

    await patchLocation(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(201);
  });

  test("location update:FAILURE", async () => {
    (updateLocation as jest.Mock).mockRejectedValueOnce(
      new CustomError("Error", "Error")
    );

    await patchLocation(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ name: "Error", message: "Error" });
  });

  test("get users", async () => {
    (findUsers as jest.Mock).mockResolvedValueOnce([mockUser]);

    await getUsers(req as any, res as any, next as any);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([mockUser]);
  });
});
