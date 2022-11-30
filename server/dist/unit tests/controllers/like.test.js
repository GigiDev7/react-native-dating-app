"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const like_1 = require("../../controllers/like");
const match_1 = require("../../services/match");
const customError_1 = require("../../utils/customError");
jest.mock("../../services/match");
const mockUser = {
    firstname: "name",
    lastname: "lastname",
    email: "email",
    password: "password",
    age: 22,
    _id: new mongoose_1.default.Types.ObjectId("111111111111"),
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
const next = jest.fn((val) => { });
describe("like controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("like user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        match_1.likeUser.mockResolvedValue({
            user: mockUser,
            likedUser: mockUser,
            isMatch: false,
        });
        yield (0, like_1.like)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledTimes(1);
    }));
    test("like user:FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
        match_1.likeUser.mockRejectedValue(new customError_1.CustomError("error", "error"));
        yield (0, like_1.like)(req, res, next);
        expect(next).toHaveBeenCalledWith({ message: "error", name: "error" });
    }));
    test("dislike user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        match_1.dislikeUser.mockResolvedValue({});
        yield (0, like_1.dislike)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(204);
    }));
});
