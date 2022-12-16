"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server(8888, {
    cors: {
        origin: ["http://localhost:8000", "https://localhost:5000"],
    },
});
io.on("connection", (socket) => {
    socket.on("get-ids", (firstUserId, secondUserId) => {
        console.log(firstUserId, secondUserId);
    });
});
