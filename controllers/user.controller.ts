import mongoose from "mongoose";
import bcrypt from "bcrypt";
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
    }).select(['email', 'role', 'fullName', 'image', 'addedItems', 'addedCollections']);

    if (findUser.length > 0) {
        return findUser;
    } else {
        return false;
    }
};

export default {
    addUser,
    loginUser,
    hashPassword,
};
