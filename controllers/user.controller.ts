import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { User } from "../models";
import { UserNS } from "../types";

const hashPassword = async (password: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashValue = await bcrypt.hash(password, salt)
    return hashValue;
}

const addUser = async (user: UserNS.User) => {
    let role = "cashier";
    const users = await User.find();
    let hashedPassword = await hashPassword(user.password)

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
    const findUser = await User.find({
        email: user.email,
        password: user.password,
    }).select(['email', 'role', 'fullName', 'image']);
    if (findUser.length > 0) {
        return findUser;
    } else {
        return false;
    }
};

export default {
    addUser,
    loginUser,
    hashPassword
};
