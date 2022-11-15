import express from "express";
import { register, login } from "../controllers/user";
import { validationHandler } from "../middlewares/validationHandler";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/authValidator";
import { like } from "../controllers/like";
import { protectAuth } from "../middlewares/protectAuth";

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
router.route("/login").post(loginValidation, validationHandler, login);
router.route("/like/:userId").patch(protectAuth, like);

export default router;
