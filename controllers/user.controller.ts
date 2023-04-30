import mongoose from "mongoose";
import { User } from "../models";
import { UserNS } from "../types";

const addUser = (user: UserNS.User) => {
    const newUser = new User({
        username: user.username,
        email: user.email,
        password: user.password,
        role: user.role,
        fullName: user.fullName,
        phoneNumber: user.phoneNumber,
        image: user.image,
    });

    return newUser.save()
        .then(() => {
            return true;
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return false;
        });
};

export default {
    addUser,
};