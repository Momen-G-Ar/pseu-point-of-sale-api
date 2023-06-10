import mongoose from 'mongoose';
import { Item, User } from "../models";
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

const getItems = async (userId: string) => {
    try {
        return await Item.find({ addedBy: userId })
            .select(['_id', 'name', 'image', 'barcode', 'description', 'addedBy', 'priceHistory']);
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getItem = async (id: string) => {
    let response = await Item.findById(id, (err: any, docs: any) => {
        if (err) {
            response = null;
        } else {
            response = docs;
        }
    });
    return response;
};

const deleteItem = async (id: string) => {
    let response = await Item.findByIdAndDelete(id, (err: any, docs: any) => {
        if (err) {
            response = null;
        } else {
            response = docs;
        }
    });
    return response;
};



export default {
    addItem,
    getItems,
    getItem,
    deleteItem
};
