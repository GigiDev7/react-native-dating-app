import {
  registerUser,
  loginUser,
  findUsers,
  updateLocation,
} from "../../services/user";
import User from "../../models/userSchema";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { IUser } from "../../interface";

jest.mock("../../models/userSchema");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

const mockUser: IUser | any = {
  firstname: "name",
  lastname: "lastname",
  email: "email",
  password: "password",
  age: 22,
  _id: new mongoose.Types.ObjectId("123131231322"),
  gender: "male",
  likesLimit: 0,
  limitExpiration: 0,
  location: { coordinates: [0, 0] },
  save: jest.fn().mockResolvedValue({}),
};

describe("user services", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("register user", async () => {
    (bcrypt.genSalt as jest.Mock).mockResolvedValue("salt");
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (User.create as jest.Mock).mockResolvedValue({
      firstname: "name",
      password: "hashedPassword",
    });

    const res = await registerUser(mockUser);

    expect(res).toEqual({
      firstname: "name",
      password: "hashedPassword",
    });
  });

  test("login user:SUCCESS", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (jwt.sign as jest.Mock).mockReturnValue("token");

    const res = await loginUser("email", "password");

    expect(res).toEqual({ user: mockUser, token: "token" });
  });

  test("login user:FAILURE PASSWORD MISMATCH", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(mockUser);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    try {
      await loginUser("email", "password");
    } catch (error) {
      expect(error).toMatchObject({
        name: "Authentication Error",
        message: "Incorrect email or password",
      });
    }
  });

  test("login user:FAILURE USER DOES NOT EXIST", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);

    try {
      await loginUser("email", "password");
    } catch (error) {
      expect(error).toMatchObject({
        name: "Authentication Error",
        message: "User does not exist",
      });
    }
  });

  test("update location", async () => {
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    const res = await updateLocation("id", {
      city: "city",
      country: "country",
      latitude: 42,
      longitude: 42,
    });

    expect(res).toMatchObject({ coordinates: [42, 42] });
  });

  test("find users", async () => {
    (User.aggregate as jest.Mock).mockResolvedValue([mockUser]);

    const res = await findUsers({ _id: "id" }, 20, [40, 40]);

    expect(res).toEqual(expect.arrayContaining([mockUser]));
  });
});
