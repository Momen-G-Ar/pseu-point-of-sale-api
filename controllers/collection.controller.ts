import mongoose from "mongoose"
import { CollectionNS } from "../types"
import { Collection , User } from '../models'

const addCollection = async (collection: CollectionNS.ICollection) => {
    const newCollection = new Collection({
        name: collection.name,
        icon: collection.icon,
        addedBy: collection.addedBy,
        items: collection.items
    })

    try {
        const addedCollection = await newCollection.save()
        const collectionId = addedCollection._id;
        await User.updateOne({ _id: collection.addedBy }, { $push: { addedCollections: collectionId } });
        return addedCollection;
    } catch (error) {
        console.error(error)
        return false
    }

}
const getCollectionItems = (collectionId: mongoose.Schema.Types.ObjectId) => {

}

const deleteCollection = (collectionId: mongoose.Schema.Types.ObjectId) => {

}

export default {
    addCollection,
    getCollectionItems,
    deleteCollection
}