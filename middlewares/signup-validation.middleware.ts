import { NextFunction } from "express";
import { UserNS } from "../types";
import { User } from '../models/index';
import express from 'express';

const signupValidation = async (req: express.Request, res: express.Response, next: NextFunction) => {
    const user: UserNS.User = req.body;
    const userSameWithEmail = await User.find({
        email: { $eq: user.email }
    });
    const userWithSameUsername = await User.find({
        email: { $eq: user.email }
    });
    if (userSameWithEmail) {
        return res.status(400).send('invalud email');
    }
    if (userSameWithEmail) {
        return res.status(400).send('invalid username');
    }
    next();
};

export default signupValidation;