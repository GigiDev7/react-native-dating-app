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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const images_1 = require("../services/images");
const promises_1 = __importDefault(require("fs/promises"));
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = new mongoose_1.default.Types.ObjectId(req.params.userId);
        let paths = req.files.map((el) => el.path);
        if (req.body.images) {
            paths = [...paths, ...req.body.images.split(",")];
            const files = yield promises_1.default.readdir(`./images/${userId}`);
            const images = paths.map((p) => {
                const ind = p.lastIndexOf("\\");
                return p.slice(ind + 1);
            });
            files.forEach((f) => __awaiter(void 0, void 0, void 0, function* () {
                if (!images.includes(f)) {
                    yield promises_1.default.unlink(`./images/${userId}/${f}`);
                }
            }));
        }
        const user = yield (0, images_1.updateImages)(userId, paths, req.body.bio);
        const _a = user._doc, { password, __v } = _a, updatedUser = __rest(_a, ["password", "__v"]);
        res.status(201).json(updatedUser);
    }
    catch (error) {
        next(error);
    }
});
exports.uploadImage = uploadImage;
