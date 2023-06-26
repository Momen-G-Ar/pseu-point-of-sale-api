import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    },
    quantity: {
        type: Number,
    },
});

const OrderSchema = new mongoose.Schema({
    orderNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    cashierName: {
        type: String,
    },
    total: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    items: {
        type: [itemSchema]
    },
    discountCode: {
        type: String,
    },
    tax: {
        type: Number,
    }
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;