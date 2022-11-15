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
exports.likeUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const customError_1 = require("../utils/customError");
const likeUser = (likedById, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findById(likedById);
        const likedUser = yield userSchema_1.default.findById(userId);
        if (user && likedUser) {
            user.likes.push(userId);
            likedUser.likedBy.push(likedById);
            if (user.likedBy.includes(userId)) {
                user.matches.push(userId);
                likedUser.matches.push(likedById);
            }
            yield user.save();
            yield likedUser.save();
        }
        else {
            throw new customError_1.CustomError("Data error", "Could not find user");
        }
    }
    catch (error) {
        throw new customError_1.CustomError("Error", "Failed");
    }
});
exports.likeUser = likeUser;
