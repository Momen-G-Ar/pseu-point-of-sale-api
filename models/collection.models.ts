import mongoose from 'mongoose';
import { Item, User } from '.';


const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    icon: {
        type: String,
        default: ''
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Item,
        default: []
    },
    addedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: User
    }
});

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;