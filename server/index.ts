import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "./connectDB";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  connect();
  console.log(`App running on port ${8000}`);
});
