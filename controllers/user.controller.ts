import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models";
import { UserNS } from "../types";

const hashPassword = async (password: string) => {
  const salt = "$2b$10$OzHwOAlQb0q78dcONdItPO";
  try {
    const hashValue = await bcrypt.hash(password, salt);
    return hashValue;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const addUser = async (user: UserNS.User) => {
  let role = "cashier";
  try {
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
  } catch (error) {
    console.error(error);
    return false;
  }
};

const loginUser = async (user: UserNS.User) => {
  try {
    const hashedPassword = await hashPassword(user.password);
    const findUser = await User.find({
      email: user.email,
      password: hashedPassword,
    }).select([
      "_id",
      "email",
      "role",
      "fullName",
      "image",
      "addedItems",
      "addedCollections",
    ]);

    if (findUser.length > 0) {
      const key: string = process.env.SECRET_KEY || "";
      const user = findUser[0];
      const payload = {
        userId: user._id.toString(),
      };
      const token = jwt.sign(payload, key, { expiresIn: "8h" });
      User.updateOne({ _id: user._id }, { token });
      const _id = user._id;
      const email = user.email;
      const role = user.role;
      const fullName = user.fullName;
      const image = user.image;
      const userToBeReturned = {
        _id,
        email,
        role,
        fullName,
        image,
        token,
      };
      return userToBeReturned;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

const updateInfo = async (user: UserNS.User) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { fullName: user.fullName, email: user.email, image: user.image },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    console.debug(error);
    return undefined;
  }
};

export default {
  addUser,
  loginUser,
  hashPassword,
  updateInfo
};
