"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validationHandler_1 = require("../middlewares/validationHandler");
const authValidator_1 = require("../middlewares/authValidator");
const like_1 = require("../controllers/like");
const protectAuth_1 = require("../middlewares/protectAuth");
const images_1 = require("../services/images");
const images_2 = require("../controllers/images");
const router = express_1.default.Router();
router.route("/register").post(authValidator_1.registerValidation, validationHandler_1.validationHandler, user_1.register);
router.route("/login").post(authValidator_1.loginValidation, validationHandler_1.validationHandler, user_1.login);
router.route("/like/:userId").patch(protectAuth_1.protectAuth, like_1.like);
router.route("/dislike/:userId").patch(protectAuth_1.protectAuth, like_1.dislike);
router.route("/location/:userId").patch(protectAuth_1.protectAuth, user_1.patchLocation);
router
    .route("/images/:userId")
    .patch(protectAuth_1.protectAuth, images_1.upload.array("photo", 6), images_2.uploadImage);
router.route("/").get(protectAuth_1.protectAuth, user_1.getUsers);
exports.default = router;
