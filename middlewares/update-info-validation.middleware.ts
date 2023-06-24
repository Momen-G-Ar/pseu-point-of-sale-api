import { UserNS } from "../types";
import { User } from '../models/index';
import express from 'express';

const updateInfoValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const user: UserNS.User = req.body;
    try {
        const userSameWithEmail = await User.find({
            email: { $eq: user.email }
        });
        if(userSameWithEmail.length){
            const dbId = userSameWithEmail[0]._id.toString();
            const id = user._id.toString(); 
            if (dbId !== id) {
                    return res.status(400).send({ message: 'invalid email' });
                }
            }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'internal server error' });
    }
    next();
};

export default updateInfoValidation;