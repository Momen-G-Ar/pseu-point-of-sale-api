import mongoose from "mongoose";
import { User } from "../models";
import { UserNS } from "../types";

const addUser = async (user: UserNS.User) => {
  let role = "cashier";
  const users = await User.find();
  if (!users.length) {
    role = "manager";
  }
  const newUser = new User({
    email: user.email,
    password: user.password,
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
      console.error(error.message);
      return false;
    });
};

const loginUser = async (user: UserNS.User) => {
  const findUser = await User.find({
    email: user.email,
    password: user.password,
  });
  if (findUser.length > 0) {
    return findUser;
  } else {
    return false;
  }
};

export default {
  addUser,
  loginUser,
};
