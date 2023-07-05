import mongoose from "mongoose";
import { CollectionNS, ItemNS } from "../types";
import { Collection, User } from '../models';

const addCollection = async (collection: CollectionNS.ICollection) => {
    const newCollection = new Collection({
        name: collection.name,
        icon: collection.icon,
        addedBy: collection.addedBy,
        items: collection.items
    });

    try {
        const addedCollection = await newCollection.save();
        const collectionId = addedCollection._id;
        await User.updateOne({ _id: collection.addedBy }, { $push: { addedCollections: collectionId } });
        return addedCollection;
    } catch (error) {
        console.error(error);
        return false;
    }
};
const getCollectionItems = async (collectionId: string, query: ItemNS.IItemQuery) => {

    const filter: mongoose.FilterQuery<ItemNS.Item> = {};
    const searchTerms = query.searchTerms || '';

    try {
        const collection = await Collection.findById(collectionId)
            .populate('items');
        let items = collection?.items as ItemNS.Item[];
        items = items.filter(item => item.name.toLowerCase().trim().includes(searchTerms) || item.description.toLowerCase().trim().includes(searchTerms));
        return items;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getCollections = async () => {
    try {
        const collections = await Collection.find();
        return collections;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getCollection = async (id: string) => {
    try {
        const collection = await Collection.findOne({ _id: id });
        return collection;
    } catch (error) {
        console.error(error);
        return false;
    }
};
const deleteCollection = async (collectionId: string, userId: string) => {
    try {
        const deleteCollection = await Collection.findOneAndDelete({ _id: collectionId });
        if (deleteCollection) {
            const deleteFromUser = await User.findByIdAndUpdate(userId, {
                $pull: { addedCollections: collectionId }
            });
            if (deleteFromUser)
                return true;
            else
                return false;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const updateCollectionItems = async (collectionId: mongoose.Types.ObjectId, itemId: mongoose.Schema.Types.ObjectId) => {
    try {
        let itemExistence = false;
        const collection = await Collection.findOne({ _id: collectionId });
        if (collection) {
            collection.items.map((item) => {
                itemExistence ||= (item == itemId);
            });
            if (itemExistence) {
                await Collection.findByIdAndUpdate(collectionId, { $pull: { items: itemId } });
            }
            else {
                await Collection.findByIdAndUpdate(collectionId, { $addToSet: { items: itemId } });
            }
            return true;
        }
        else
            return false;
    } catch (error) {
        throw error;
    }
};

export default {
    addCollection,
    getCollectionItems,
    deleteCollection,
    getCollections,
    updateCollectionItems,
    getCollection,
};