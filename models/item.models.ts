import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true,
    },
    barcode: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true
    },
    addedBy: {
        type: String,
        ref: 'User',
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    priceHistory: {
        type: [{ date: Date, price: Number }],
        required: true,
    },

});

const Item = mongoose.model('Item', ItemSchema);

export default Item;