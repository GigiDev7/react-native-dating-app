"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.updateImages = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const storage = multer_1.default.diskStorage({
    destination(req, file, cb) {
        const dir = `./images/${req.user._id}`;
        if (!fs_1.default.existsSync(dir)) {
            fs_1.default.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});
const updateImages = (userId, imagePaths) => {
    return userSchema_1.default.findByIdAndUpdate(userId, { images: imagePaths }, { new: true });
};
exports.updateImages = updateImages;
exports.upload = (0, multer_1.default)({ storage });
