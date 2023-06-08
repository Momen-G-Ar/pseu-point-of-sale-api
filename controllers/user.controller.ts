import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models";
import { UserNS } from "../types";

const hashPassword = async (password: string) => {
  const salt = "$2b$10$OzHwOAlQb0q78dcONdItPO";
  try {
      const hashValue = await bcrypt.hash(password, salt);
      return hashValue;
  } catch (error) {
    console.error(error);
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
  }
};

const loginUser = async (user: UserNS.User) => {
  try {
    const hashedPassword = await hashPassword(user.password);
    try {
      const findUser = await User.find({
        email: user.email,
        password: hashedPassword,
      }).select(["email", "role", "fullName", "image"]);

      if (findUser.length > 0) {
        return findUser;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default {
  addUser,
  loginUser,
  hashPassword,
};
