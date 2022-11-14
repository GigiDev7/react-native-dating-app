"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const isEmail_1 = __importDefault(require("validator/lib/isEmail"));
const userSchema = new mongoose_1.default.Schema({
    firstname: {
        type: String,
        requried: [true, "Firstname is required"],
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"],
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
        required: [true, "Gender is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [isEmail_1.default, "Please provide valid email"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },
    likes: {
        type: [String],
    },
    likedBy: {
        type: [String],
    },
    matches: {
        type: [String],
    },
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
