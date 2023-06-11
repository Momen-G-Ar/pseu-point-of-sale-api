import mongoose from "mongoose"
import { CollectionNS } from "../types"
import { Collection } from '../models'

const addCollection = async (collection: CollectionNS.ICollection) => {
    const newCollection = new Collection({
        name: collection.name,
        icon: collection.icon,
        addedBy: collection.addedBy,
        items: collection.items
    })

    try {
        const addedCollection = await newCollection.save()
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