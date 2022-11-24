import { NextFunction, Request, Response } from "express";

export const errorsHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "Validation Error") {
    res.status(400).json({ message: err.message || "Something went wrong" });
  } else if (err.code === 11000) {
    res.status(400).json({ message: "Email already exists" });
  } else if (err.name === "Authentication Error") {
    res.status(401).json({ message: err.message || "Something went wrong" });
  } else if (err.name === "Authorization Error") {
    res.status(401).json({ message: err.message || "Something went wrong" });
  } else if (err.name === "Like Expiration Error") {
    res.status(400).json({ message: err.message || "Something went wrong" });
  } else {
    res.status(500).json(err);
  }
};
