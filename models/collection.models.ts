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
        type: [mongoose.Types.ObjectId],
        ref: 'Item',
        default: [],
      },
    addedBy: {
        type: [mongoose.Types.ObjectId],
        ref: User
    }
});

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;