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
const mongoose_1 = __importDefault(require("mongoose"));
const socket_io_1 = require("socket.io");
const messageSchema_1 = __importDefault(require("./models/messageSchema"));
const io = new socket_io_1.Server(8888, {
    cors: {
        origin: ["http://localhost:8000", "https://localhost:5000"],
    },
});
io.on("connection", (socket) => {
    socket.on("get-ids", (firstUserId, secondUserId) => __awaiter(void 0, void 0, void 0, function* () {
        let messageBox = yield messageSchema_1.default.findOne({
            firstUser: firstUserId,
            secondUser: secondUserId,
        });
        if (!messageBox) {
            messageBox = yield messageSchema_1.default.create({
                firstUser: new mongoose_1.default.Types.ObjectId(firstUserId),
                secondUser: new mongoose_1.default.Types.ObjectId(secondUserId),
            });
        }
        io.emit("get-messagebox", messageBox);
    }));
    socket.on("send-message", (messageBoxId, authorId, message, date) => __awaiter(void 0, void 0, void 0, function* () {
        const messageBox = yield messageSchema_1.default.findById(messageBoxId);
        const newMessage = {
            author: authorId,
            message,
            date,
        };
        if (messageBox) {
            messageBox.messages.push(newMessage);
            yield messageBox.save();
            io.emit("get-messagebox", messageBox);
        }
    }));
    socket.on("disconnect", () => {
        socket.disconnect();
    });
});
