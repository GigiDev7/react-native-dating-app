import express from "express";
import { register } from "../controllers/user";
import { validationHandler } from "../middlewares/validationHandler";
import { registerValidation } from "../middlewares/authValidator";

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
//router.route("/login").post();

export default router;
