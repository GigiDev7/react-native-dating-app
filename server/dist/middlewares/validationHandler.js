"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationHandler = void 0;
const express_validator_1 = require("express-validator");
const customError_1 = require("../utils/customError");
const validationHandler = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        throw new customError_1.CustomError("Validation Error", errors.array());
    }
    next();
};
exports.validationHandler = validationHandler;
