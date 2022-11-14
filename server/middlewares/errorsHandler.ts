import { NextFunction, Request, Response } from "express";

export const errorsHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "Validation Error") {
    res.status(400).json({ message: err.message });
  } else if (err.code === 11000) {
    res.status(400).json({ message: "Email already exists" });
  } else {
    res.status(500).json(err);
  }
};
