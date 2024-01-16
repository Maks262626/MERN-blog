import { body } from "express-validator";

export const postCreateValidator = [
    body("title", "Enter title").isLength({ min: 3 }).isString(),
    body("text", "Enter article text").isLength({ min: 3 }).isString(),
    body("tags", "Tags format are not correct(enter array)")
        .optional()
        .isArray(),
    body("imageUrl", "Enter article text")
        .optional()
        .isString(),
];
