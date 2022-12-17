import mongoose from "mongoose";

export interface IMessage {
  firstUser?: mongoose.Types.ObjectId;
  secondUser?: mongoose.Types.ObjectId;
  messages: {
    message: string;
    date: string;
    author: mongoose.Types.ObjectId;
  }[];
}

const message = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
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
  },
  {
    _id: false,
  }
);

const messageSchema = new mongoose.Schema({
  firstUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  secondUser: {
    type: mongoose.Schema.Types.ObjectId,
  },
  messages: {
    type: [message],
    default: [],
  },
});

messageSchema.index({ firstUser: 1, secondUser: 1 });

const Message = mongoose.model("Message", messageSchema);

export default Message;
