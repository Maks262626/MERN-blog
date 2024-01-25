import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import UserModel from "../models/User.js";
import { json } from "express";
import User from "../models/User.js";

export const register = async (req, res) => {
    try {
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const avatarUrl = req.body.avatarUrl ? req.body.avatarUrl : "";
        const doc = new UserModel({
            fullname: req.body.fullname,
            email: req.body.email,
            avatarUrl,
            passwordHash: hashedPassword,
        });
        console.log(req.body)
        const user = await doc.save();
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: "1d",
            }
        );
        const { passwordHash, ...userData } = user._doc;
        return res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't register",
        });
    }
};
export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                message: "login or password incorrect",
            });
        }
        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );
        if (!isValidPass) {
            return res.status(404).json({
                message: "login or password incorrect",
            });
        }
        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET_ACCESS_TOKEN,
            {
                expiresIn: "1d",
            }
        );
        const { passwordHash, ...userData } = user._doc;
        return res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't login",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Can't find user",
            });
        }

        const { passwordHash, ...userData } = user._doc;
        return res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't login",
        });
    }
};
export const getLastUsers = async (req, res) => {
    try {
        const users = await UserModel.find()
            .sort({ createdAt: -1 })
            .limit(3)
            .select("fullname avatarUrl");
        return res.json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't get users",
        });
    }
}
export const updateImage = async (req, res) => {
    try {
        const userId = req.userId;
        const imageUrl = req.body.url;
        console.log(imageUrl);
        if (!imageUrl) {
            return res.status(400).json({message: "imageUrl required"});
        }
        const doc = await UserModel.findById(userId);
        if (!doc) {
            return res.status(400).json({ message: "user not found" });
        }
        doc.avatarUrl = imageUrl;
        await doc.save();
        console.log(doc);
        res.json(doc);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "can't update image",
        });
    }
}