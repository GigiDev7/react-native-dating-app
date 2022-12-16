"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const message = new mongoose_1.default.Schema({
    author: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, {
    _id: false,
});
const messageSchema = new mongoose_1.default.Schema({
    firstUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    secondUser: {
        type: mongoose_1.default.Schema.Types.ObjectId,
    },
    messages: {
        type: [message],
        default: [],
    },
});
messageSchema.index({ firstUser: 1, secondUser: 1 });
const Message = mongoose_1.default.model("Message", messageSchema);
exports.default = Message;
