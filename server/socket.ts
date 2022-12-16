import { Server } from "socket.io";
import Message from "./models/messageSchema";

const io = new Server(8888, {
  cors: {
    origin: ["http://localhost:8000", "https://localhost:5000"],
  },
});

io.on("connection", (socket) => {
  socket.on("get-ids", async (firstUserId, secondUserId) => {
    let messageBox = await Message.findOne({
      firstUser: firstUserId,
      secondUser: secondUserId,
    });
    if (!messageBox) {
      messageBox = await Message.create({
        firstUser: firstUserId,
        secondUser: secondUserId,
      });
    }
    io.emit("get-messagebox", messageBox);
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});
