import mongoose from 'mongoose';

namespace UserNS {
    export interface User {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
        password: string;
        role?: string;  //it should not be included in the http request , it will be added in BE when checking if its the first user or not
        fullName: string;
        image?: string;
        AddedItems?: [mongoose.Schema.Types.ObjectId];
        AddedCollections?: [mongoose.Schema.Types.ObjectId];
    }
}

export default UserNS;