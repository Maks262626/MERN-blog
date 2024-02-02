import { body } from "express-validator";

export const commentCreateValidator = [
    body("text", "Enter article text").isLength({ min: 3 }).isString(),
];
