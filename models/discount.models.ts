import mongoose from 'mongoose';


const DiscountSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    value: {
        type: Number,
        default: 0,
        required: true
    }, 
    token: {
        type: String , 
        required: true
    }
});

const Discount = mongoose.model('Discount', DiscountSchema);

export default Discount;