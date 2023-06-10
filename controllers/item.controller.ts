import mongoose from "mongoose";
import { Item } from "../models";
import { ItemNS } from "../types";


const addItem = async (item: ItemNS.Item) => {
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

const getItems = async () => {
    try {
        return await Item.find();
    } catch (error) {
        console.error(error);
    }
};

const getItem = async (id: string) => {
    try {
        let response = await Item.findById(id, (err: any, docs: any) => {
            if (err) {
                response = null;
            } else {
                response = docs;
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const deleteItem = async (id: string) => {
    try {
        let response = await Item.findByIdAndDelete(id, (err: any, docs: any) => {
            if (err) {
                response = null;
            } else {
                response = docs;
            }
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};



export default {
    addItem,
    getItems,
    getItem,
    deleteItem
};
