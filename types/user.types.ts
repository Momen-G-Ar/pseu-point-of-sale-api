import mongoose from 'mongoose';

namespace UserNS {
    export interface User {
        _id: mongoose.Schema.Types.ObjectId;
        username: string;
        email: string;
        password: string;
        role: string;
        fullName: string;
        phoneNumber?: string;
        image?: string;
    }
}

export default UserNS;