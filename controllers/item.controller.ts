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
        await User.updateOne({ _id: item.addedBy }, { $push: { AddedItems: itemId } });
        return addItem;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getItems = async (userId: string) => {
    return await Item.find({ addedBy: userId });
};

const getItem = async (id: string) => {
    let item = await Item.findById(id);
    if (item)
        return item;
    return false;
};

const deleteItem = async (userId: string, itemId: string) => {
    try {
        let response = await Item.deleteOne({ _id: itemId });
        if (response.acknowledged) {
            await User.updateOne({ _id: userId }, { $pull: { AddedItems: itemId } });
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
