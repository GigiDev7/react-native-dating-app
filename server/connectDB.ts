import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI as string;

export const connect = () => {
  mongoose.connect(MONGO_URI, () => {
    console.log("Connected to DB");
  });
};
