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
const user_1 = require("../../services/user");
const userSchema_1 = __importDefault(require("../../models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
jest.mock("../../models/userSchema");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
const mockUser = {
    firstname: "name",
    lastname: "lastname",
    email: "email",
    password: "password",
    age: 22,
    _id: new mongoose_1.default.Types.ObjectId("123131231322"),
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
    test("register user", () => __awaiter(void 0, void 0, void 0, function* () {
        bcrypt_1.default.genSalt.mockResolvedValue("salt");
        bcrypt_1.default.hash.mockResolvedValue("hashedPassword");
        userSchema_1.default.create.mockResolvedValue({
            firstname: "name",
            password: "hashedPassword",
        });
        const res = yield (0, user_1.registerUser)(mockUser);
        expect(res).toEqual({
            firstname: "name",
            password: "hashedPassword",
        });
    }));
    test("login user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findOne.mockResolvedValue(mockUser);
        bcrypt_1.default.compare.mockResolvedValue(true);
        jsonwebtoken_1.default.sign.mockReturnValue("token");
        const res = yield (0, user_1.loginUser)("email", "password");
        expect(res).toEqual({ user: mockUser, token: "token" });
    }));
    test("login user:FAILURE PASSWORD MISMATCH", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findOne.mockResolvedValue(mockUser);
        bcrypt_1.default.compare.mockResolvedValue(false);
        try {
            yield (0, user_1.loginUser)("email", "password");
        }
        catch (error) {
            expect(error).toMatchObject({
                name: "Authentication Error",
                message: "Incorrect email or password",
            });
        }
    }));
    test("login user:FAILURE USER DOES NOT EXIST", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findOne.mockResolvedValue(null);
        try {
            yield (0, user_1.loginUser)("email", "password");
        }
        catch (error) {
            expect(error).toMatchObject({
                name: "Authentication Error",
                message: "User does not exist",
            });
        }
    }));
    test("update location", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.findById.mockResolvedValue(mockUser);
        const res = yield (0, user_1.updateLocation)("id", {
            city: "city",
            country: "country",
            latitude: 42,
            longitude: 42,
        });
        expect(res).toMatchObject({ coordinates: [42, 42] });
    }));
    test("find users", () => __awaiter(void 0, void 0, void 0, function* () {
        userSchema_1.default.aggregate.mockResolvedValue([mockUser]);
        const res = yield (0, user_1.findUsers)("regular", { _id: "id" }, 20, [40, 40]);
        expect(res).toEqual(expect.arrayContaining([mockUser]));
    }));
});
