"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDB_1 = require("./connectDB");
const errorsHandler_1 = require("./middlewares/errorsHandler");
const user_1 = __importDefault(require("./routes/user"));
require("./socket");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/images", express_1.default.static("images"));
//routes
app.use("/user", user_1.default);
//error handler
app.use(errorsHandler_1.errorsHandler);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    (0, connectDB_1.connect)();
    console.log(`App running on port ${8000}`);
});
