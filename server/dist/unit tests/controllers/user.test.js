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
const user_1 = require("../../services/user");
const user_2 = require("../../controllers/user");
const errorsHandler_1 = require("../../middlewares/errorsHandler");
const customError_1 = require("../../utils/customError");
jest.mock("../../services/user");
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
const next = jest.fn((err) => (0, errorsHandler_1.errorsHandler)(err, req, res, next));
describe("users controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test("register user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.registerUser.mockResolvedValueOnce({ _doc: mockUser });
        yield (0, user_2.register)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    test("register user:FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.registerUser.mockRejectedValueOnce(new customError_1.CustomError("Validation Error", "Validation Error"));
        yield (0, user_2.register)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Validation Error" });
    }));
    test("login user:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.loginUser.mockResolvedValueOnce({
            user: { _doc: mockUser },
            token: "token",
        });
        yield (0, user_2.login)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalled();
    }));
    test("login user:FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.loginUser.mockRejectedValueOnce(new customError_1.CustomError("Authorization Error", "Authorization Error"));
        yield (0, user_2.login)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Authorization Error" });
    }));
    test("location update:SUCCESS", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.updateLocation.mockResolvedValueOnce(mockUser);
        yield (0, user_2.patchLocation)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
    }));
    test("location update:FAILURE", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.updateLocation.mockRejectedValueOnce(new customError_1.CustomError("Error", "Error"));
        yield (0, user_2.patchLocation)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ name: "Error", message: "Error" });
    }));
    test("get users", () => __awaiter(void 0, void 0, void 0, function* () {
        user_1.findUsers.mockResolvedValueOnce([mockUser]);
        yield (0, user_2.getUsers)(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([mockUser]);
    }));
});
