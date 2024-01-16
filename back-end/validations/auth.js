import { body } from "express-validator";

export const registerValidator = [
    body('email','incorrect email').isEmail(),
    body('password','incorrect password').isLength({ min: 8 }),
    body('fullname','incorrect fullname').isLength({ min: 3 }),
    body('avatarUrl','incorrect avatarUrl').optional().isURL(),
];