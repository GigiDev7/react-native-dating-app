"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const validationHandler_1 = require("../middlewares/validationHandler");
const authValidator_1 = require("../middlewares/authValidator");
const router = express_1.default.Router();
router.route("/register").post(authValidator_1.registerValidation, validationHandler_1.validationHandler, user_1.register);
//router.route("/login").post();
exports.default = router;
