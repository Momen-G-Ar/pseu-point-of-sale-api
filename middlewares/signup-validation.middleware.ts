import { UserNS } from "../types";
import { User } from '../models/index';
import express from 'express';

const signupValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user: UserNS.User = req.body;
    const userSameWithEmail = await User.find({
        email: { $eq: user.email }
    });
    if (userSameWithEmail.length) {
        return res.status(400).send({ message: 'invalid email' });
    }
    next();
};

export default signupValidation;