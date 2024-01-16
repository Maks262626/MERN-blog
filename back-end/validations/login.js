import { body } from "express-validator";

export const loginValidator = [
    body("email", "incorrect email").isEmail(),
    body("password", "incorrect password").isLength({ min: 8 }),
];
