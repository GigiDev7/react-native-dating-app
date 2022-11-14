import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./connectDB";
import userRouter from "./routes/user";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/user", userRouter);

app.listen(8000, () => {
  connect();
  console.log(`App running on port ${8000}`);
});
