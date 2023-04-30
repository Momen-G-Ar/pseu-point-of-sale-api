import { UserNS } from "../types";
import { User } from '../models/index';
import express from 'express';

const signupValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user: UserNS.User = req.body;
    const userSameWithEmail = await User.find({
        email: { $eq: user.email }
    });
    const userWithSameUsername = await User.find({
        username: { $eq: user.username }
    });
    if (userSameWithEmail.length) {
        return res.status(400).send('invalid email');
    }
    if (userWithSameUsername.length) {
        return res.status(400).send('invalid username');
    }
    next();
};

export default signupValidation;