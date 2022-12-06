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
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const match_1 = require("../../services/match");
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
const mockUser2 = {
    firstname: "name",
    lastname: "lastname",
    email: "email",
    password: "password",
    age: 22,
    _id: new mongoose_1.default.Types.ObjectId("222222222222"),
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
const mockUser3 = {
    firstname: "name",
    lastname: "lastname",
    email: "email",
    password: "password",
    age: 22,
    _id: new mongoose_1.default.Types.ObjectId("333333333333"),
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
    test("like user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findById = jest.fn((val) => {
            if (val == mockUser._id)
                return mockUser;
            return mockUser2;
        });
        const { resUser: user, likedUser } = yield (0, match_1.likeUser)(mockUser._id, mockUser2._id);
        expect(user.likes).toHaveLength(1);
        expect(likedUser.likedBy).toHaveLength(1);
        expect(user.likesLimit).toBe(1);
    }));
    test("like user:FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findById = jest.fn((val) => {
            if (val == mockUser3._id)
                return mockUser3;
            return mockUser2;
        });
        try {
            yield (0, match_1.likeUser)(mockUser3._id, mockUser2._id);
        }
        catch (error) {
            expect(error).toMatchObject({
                name: "Like Expiration Error",
                message: "You dont have any likes left today",
            });
        }
    }));
    test("dislike user", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findById = jest.fn((val) => {
            if (val == mockUser._id)
                return mockUser;
            return mockUser2;
        });
        yield (0, match_1.dislikeUser)(mockUser._id, mockUser2._id);
        expect(mockUser.dislikes).toHaveLength(1);
        expect(mockUser2.dislikedBy).toHaveLength(1);
    }));
});
