import { ValidationError } from "express-validator";

export class CustomError {
  constructor(
    public name: string,
    public message: string | ValidationError[]
  ) {}
}
