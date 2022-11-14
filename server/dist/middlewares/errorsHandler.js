"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsHandler = void 0;
const errorsHandler = (err, req, res, next) => {
    if (err.name === "Validation Error") {
        res.status(400).json({ message: err.message });
    }
    else if (err.code === 11000) {
        res.status(400).json({ message: "Email already exists" });
    }
    else {
        res.status(500).json(err);
    }
};
exports.errorsHandler = errorsHandler;
