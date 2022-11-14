"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const registerUser = (userData) => {
    return userSchema_1.default.create(userData);
};
exports.registerUser = registerUser;
