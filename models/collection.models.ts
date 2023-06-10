import mongoose from 'mongoose';
import { Item } from '.';


const CollectionSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: Item
    }
});

const Collection = mongoose.model('Collection', CollectionSchema);

export default Collection;