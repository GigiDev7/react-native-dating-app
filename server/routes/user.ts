import express from "express";
import { register, login, patchLocation, getUsers } from "../controllers/user";
import { validationHandler } from "../middlewares/validationHandler";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/authValidator";
import { like, dislike } from "../controllers/like";
import { protectAuth } from "../middlewares/protectAuth";
import { upload } from "../services/images";
import { uploadImage } from "../controllers/images";

const router = express.Router();

router.route("/register").post(registerValidation, validationHandler, register);
router.route("/login").post(loginValidation, validationHandler, login);
router.route("/like/:userId").patch(protectAuth, like);
router.route("/dislike/:userId").patch(protectAuth, dislike);
router.route("/location/:userId").patch(protectAuth, patchLocation);
router
  .route("/images/:userId")
  .patch(protectAuth, upload.array("photo", 6), uploadImage);
router.route("/").get(protectAuth, getUsers);

export default router;
