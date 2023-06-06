import mongoose, { set } from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { User } from "../models";
import { UserNS } from "../types";

const hashPassword = async (password: string) => {
    const salt = '$2b$10$OzHwOAlQb0q78dcONdItPO';
    const hashValue = await bcrypt.hash(password, salt);
    return hashValue;
};

const addUser = async (user: UserNS.User) => {
    let role = "cashier";
    const users = await User.find();
    const hashedPassword = await hashPassword(user.password);

    if (!users.length) {
        role = "manager";
    }
    const newUser = new User({
        email: user.email,
        password: hashedPassword,
        role,
        fullName: user.fullName,
        image: user.image,
    });

    return newUser
        .save()
        .then(() => {
            return true;
        })
        .catch((error: mongoose.Error) => {
            console.error("the error is : " + error.message);
            return false;
        });
};

const loginUser = async (user: UserNS.User) => {
    const hashedPassword = await hashPassword(user.password);

    const findUser = await User.find({
        email: user.email,
        password: hashedPassword,
    }).select(['_id', 'email', 'role', 'fullName', 'image']);
    if (findUser.length > 0) {

        const key: string = process.env.SECRET_KEY || '';
        const user = findUser[0];
        console.log(user);
        const payload = {
            userId: user._id.toString()
        };
        const token = jwt.sign(payload, key, { expiresIn: '8h' });
        console.log(token);
        User.updateOne({ _id: findUser[0]._id }, { token });
        return { findUser, token };
    } else {
        return false;
    }
};

export default {
    addUser,
    loginUser,
    hashPassword
};
