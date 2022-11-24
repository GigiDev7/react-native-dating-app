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
exports.findUsers = exports.updateLocation = exports.loginUser = exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const customError_1 = require("../utils/customError");
const createAccessToken = (userId) => {
    return jsonwebtoken_1.default.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
};
const comparePasswords = (password, hashedPassword) => {
    return bcrypt_1.default.compare(password, hashedPassword);
};
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield bcrypt_1.default.genSalt(12);
    return yield bcrypt_1.default.hash(password, salt);
});
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield hashPassword(userData.password);
    userData.password = hashedPassword;
    return userSchema_1.default.create(userData);
});
exports.registerUser = registerUser;
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findOne({ email });
    if (!user) {
        throw new customError_1.CustomError("Authentication Error", "User does not exist");
    }
    const isPasswordCorrect = yield comparePasswords(password, user.password);
    if (!isPasswordCorrect) {
        throw new customError_1.CustomError("Authentication Error", "Incorrect email or password");
    }
    const token = createAccessToken(user._id.toString());
    return { user, token };
});
exports.loginUser = loginUser;
const updateLocation = (userId, locationData) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userSchema_1.default.findById(userId, "-password,-__v");
    if (user) {
        user.location.type = "Point";
        user.city = locationData.city;
        user.country = locationData.country;
        if (user.location.coordinates.length === 0) {
            user.location.coordinates.push(locationData.longitude, locationData.latitude);
        }
        else {
            user.location.coordinates[0] = locationData.longitude;
            user.location.coordinates[1] = locationData.latitude;
        }
        yield user.save();
        return user;
    }
});
exports.updateLocation = updateLocation;
const findUsers = (gender) => __awaiter(void 0, void 0, void 0, function* () {
    let targetGender;
    gender === "male" ? (targetGender = "female") : "male";
    const users = yield userSchema_1.default.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [44, 42.9999] },
                distanceField: "dist.calculated",
                maxDistance: 1000 * 60,
                spherical: true,
                query: { gender: targetGender },
            },
        },
    ]);
    return users;
});
exports.findUsers = findUsers;
