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
exports.dislikeUser = exports.likeUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const customError_1 = require("../utils/customError");
const pipeline_1 = require("../utils/pipeline");
const notifications_1 = require("./notifications");
const likeUser = (likedById, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        /* const pipeline = genPipelineObject();
        const result = await User.aggregate([
          {
            $match: { _id: likedById },
          },
          {
            $unset: ["__v", "password"],
          },
          ...pipeline,
        ]); */
        let isMatch = false;
        const user = yield userSchema_1.default.findById(likedById, "-password");
        const likedUser = yield userSchema_1.default.findById(userId, "-password");
        if (user &&
            user.accountType === "regular" &&
            user.limitExpiration !== 0 &&
            new Date().getTime() < user.limitExpiration) {
            throw new customError_1.CustomError("Like Expiration Error", "You dont have any likes left today");
        }
        else {
            if (user && likedUser) {
                let messages = [
                    {
                        to: likedUser.pushToken,
                        body: "You got a new like",
                        data: { user: JSON.stringify(user) },
                    },
                ];
                user.likes.push(userId);
                likedUser.likedBy.push(likedById);
                if (user.accountType === "regular") {
                    if (user.likesLimit === 9) {
                        user.likesLimit = 0;
                        user.limitExpiration = new Date().getTime() + 24 * 60 * 60 * 1000;
                    }
                    else {
                        user.likesLimit += 1;
                        user.limitExpiration = 0;
                    }
                }
                if (user.likedBy.find((el) => el.equals(userId))) {
                    user.matches.push(userId);
                    likedUser.matches.push(likedById);
                    isMatch = true;
                    messages = [
                        {
                            to: likedUser.pushToken,
                            body: "You got a match",
                            data: { user: JSON.stringify(user) },
                        },
                        {
                            to: user.pushToken,
                            body: "You got a match",
                            data: { user: JSON.stringify(likedUser) },
                        },
                    ];
                }
                yield user.save();
                yield likedUser.save();
                yield (0, notifications_1.pushNotifications)(messages);
                const pipeline = (0, pipeline_1.genPipelineObject)();
                const resUser = yield userSchema_1.default.aggregate([
                    {
                        $match: { _id: likedById },
                    },
                    {
                        $unset: ["__v", "password"],
                    },
                    ...pipeline,
                ]);
                return { resUser, likedUser, isMatch };
            }
            else {
                throw new customError_1.CustomError("Data error", "Could not find user");
            }
        }
    }
    catch (error) {
        throw error;
    }
});
exports.likeUser = likeUser;
const dislikeUser = (dislikedById, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userSchema_1.default.findById(dislikedById);
        const dislikedUser = yield userSchema_1.default.findById(userId);
        if (user && dislikedUser) {
            user.dislikes.push(userId);
            dislikedUser.dislikedBy.push(dislikedById);
            yield user.save();
            yield dislikedUser.save();
        }
    }
    catch (error) {
        throw new customError_1.CustomError("Error", "User not found");
    }
});
exports.dislikeUser = dislikeUser;
