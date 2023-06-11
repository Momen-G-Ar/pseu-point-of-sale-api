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

    try {
        const addItem = await newItem.save();
        const itemId = addItem._id;
        await User.updateOne({ _id: item.addedBy }, { $push: { addedItems: itemId } });
        return addItem;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getItems = async (userId: string, query: ItemNS.IItemQuery) => {
    const filter: mongoose.FilterQuery<ItemNS.Item> = {};
    const searchTerms = query.searchTerms || '';
    const regex = new RegExp(searchTerms, 'i');
    filter.$or = [
        { name: regex },
        { description: regex }
    ]

    try {
        return await Item.find({ addedBy: userId, ...filter })
            .select(['_id', 'name', 'image', 'barcode', 'description', 'addedBy', 'priceHistory']);
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getItem = async (id: string) => {
    try {
        let item = await Item.findById(id);
        if (item)
            return item;
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const deleteItem = async (userId: string, itemId: string) => {
    try {
        let response = await Item.deleteOne({ _id: itemId });
        if (response.acknowledged) {
            await User.updateOne({ _id: userId }, { $pull: { addedItems: itemId } });
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default {
    addItem,
    getItems,
    getItem,
    deleteItem,
};
