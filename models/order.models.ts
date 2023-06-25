import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    number: {
        type: mongoose.Schema.Types


    }

});

const Order = mongoose.model('Order', OrderSchema);
Order.events.addListener('insert', () => {

});

export default Order;