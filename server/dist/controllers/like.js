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
exports.dislike = exports.like = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const match_1 = require("../services/match");
const like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const likedById = req.user._id;
        const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
        /* const { user, likedUser, isMatch } = */ yield (0, match_1.likeUser)(likedById, userId);
        /*  res.status(200).json({ user, likedUser, isMatch }); */
    }
    catch (error) {
        next(error);
    }
});
exports.like = like;
const dislike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dislikedById = req.user._id;
        const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
        yield (0, match_1.dislikeUser)(dislikedById, userId);
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
});
exports.dislike = dislike;
