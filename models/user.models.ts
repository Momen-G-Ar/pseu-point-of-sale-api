import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['manager', 'cashier', 'admin'],
        default: 'cashier',
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    addedItems: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Item'
    },
    addedCollections: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Collection'
    },
    token: {
        type: String
    }
});

const User = mongoose.model('User', UserSchema);

export default User;