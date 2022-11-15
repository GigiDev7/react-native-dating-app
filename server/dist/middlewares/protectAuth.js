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
exports.protectAuth = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customError_1 = require("../utils/customError");
const protectAuth = (req, res, next) => {
    var _a;
    const headers = req.headers;
    if (!(headers === null || headers === void 0 ? void 0 : headers.authorization) || !((_a = headers === null || headers === void 0 ? void 0 : headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1])) {
        throw new customError_1.CustomError("Authorization Error", "Authorization failed");
    }
    const token = headers.authorization.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decodedData) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            throw new customError_1.CustomError("Authorization Error", "Authorization failed");
        }
        try {
            req.user = yield userSchema_1.default.findById(decodedData.id, "-password -__v");
            next();
        }
        catch (error) {
            next(error);
        }
    }));
};
exports.protectAuth = protectAuth;
