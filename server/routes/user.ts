import express from "express";
import { register, login } from "../controllers/user";
import { validationHandler } from "../middlewares/validationHandler";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/authValidator";

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
router.route("/login").post(loginValidation, validationHandler, login);

export default router;
