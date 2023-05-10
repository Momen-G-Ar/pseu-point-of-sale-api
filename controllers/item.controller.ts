import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { Item, User } from "../models";
import { ItemNS } from "../types";


const addItem = async (item: ItemNS.Item) => {
    const items = await User.find();

    const newItem = new Item({
        name: item.name,
        price: item.price,
        barcode: item.barcode,
        image: item.image,
        priceHistory: item.priceHistory,
        addedBy: item.addedBy,
        description: item.description
    });

    return newItem
        .save()
        .then(() => {
            return true;
        })
        .catch((error: mongoose.Error) => {
            console.error("the error is : " + error.message);
            return false;
        });
};

const getItems = async () =>{
    return Item.find();
};
export default {
    addItem,
    getItems
};
