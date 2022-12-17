import mongoose from "mongoose";
import { Server } from "socket.io";
import Message, { IMessage } from "./models/messageSchema";

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
        firstUser: new mongoose.Types.ObjectId(firstUserId),
        secondUser: new mongoose.Types.ObjectId(secondUserId),
      });
    }
    io.emit("get-messagebox", messageBox);
  });

  socket.on("send-message", async (messageBoxId, authorId, message, date) => {
    const messageBox = await Message.findById(messageBoxId);

    const newMessage = {
      author: authorId,
      message,
      date,
    };

    if (messageBox) {
      messageBox.messages.push(newMessage);
      await messageBox.save();
      io.emit("get-messagebox", messageBox);
    }
  });

  socket.on("disconnect", () => {
    socket.disconnect();
  });
});
