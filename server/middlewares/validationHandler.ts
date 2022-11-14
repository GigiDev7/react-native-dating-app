import { validationResult } from "express-validator";
import { CustomError } from "../utils/customError";
import { Response, Request, NextFunction } from "express";

export const validationHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError("Validation Error", errors.array());
  }

  next();
};
