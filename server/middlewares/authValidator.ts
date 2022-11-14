import { checkSchema } from "express-validator";

export const registerValidation = checkSchema({
  firstname: {
    in: ["body"],
    isString: {
      errorMessage: "Firstname must be a string",
    },
  },
  lastname: {
    in: ["body"],
    isString: {
      errorMessage: "Lastname must be a string",
    },
  },
  age: {
    in: ["body"],
    errorMessage: "Age is requried",
  },
  gender: {
    in: ["body"],
    errorMessage: "Gender is requried",
  },
  email: {
    in: ["body"],
    isEmail: {
      errorMessage: "Please enter a valid email address",
    },
  },
  password: {
    in: ["body"],
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters long",
    },
  },
});
