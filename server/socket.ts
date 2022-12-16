import { Server } from "socket.io";

const io = new Server(8888, {
  cors: {
    origin: ["http://localhost:8000", "https://localhost:5000"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-ids", (firstUserId, secondUserId) => {
    console.log(firstUserId, secondUserId);
  });
});
