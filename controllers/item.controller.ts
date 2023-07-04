import mongoose from 'mongoose';
import { Item, User, Collection } from "../models";
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

const updateItem = async (newItem: ItemNS.Item) => {
    try {
        const update = await Item.updateOne(
            { _id: newItem._id },
            {
                $set: {
                    name: newItem.name,
                    image: newItem.image,
                    barcode: newItem.barcode,
                    description: newItem.description,
                    priceHistory: newItem.priceHistory
                }
            });
        return update;
    }
    catch (error) {
        console.error(error);
        return false;
    }
};

const getItems = async (query: ItemNS.IItemQuery) => {
    const filter: mongoose.FilterQuery<ItemNS.Item> = {};
    const searchTerms = query.searchTerms || '';
    const regex = new RegExp(searchTerms, 'i');
    filter.$or = [
        { name: regex },
        { description: regex }
    ];

    try {
        const items = await Item.find({ ...filter })
            .select(['_id', 'name', 'image', 'barcode', 'description', 'addedBy', 'priceHistory']);
        const sortedItems = items.map((item) => {
            let newItem = item;
            if (item.priceHistory.length > 1) {
                newItem.priceHistory = item.priceHistory.sort((a, b) => ((a.date as Date) >= (b.date as Date) ? -1 : 1));
            }
            return newItem;
        });
        return sortedItems;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getItem = async (id: string) => {
    try {
        let item = await Item.findById(id);
        item?.priceHistory.sort((a, b) => ((a.date as Date) > (b.date as Date) ? -1 : 1));
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
            const collections = await Collection.find();
            collections.map(async (collection) => {
                await Collection.updateOne({ _id: collection._id }, { $pull: { items: itemId } });
            });
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
    updateItem
};
