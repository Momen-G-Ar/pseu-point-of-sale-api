import mongoose from 'mongoose';

namespace CollectionNS {

    export interface ICollection {
        _id?: mongoose.Schema.Types.ObjectId;
        name: string;
        icon: string;
        items: mongoose.Schema.Types.ObjectId[];
        addedBy: mongoose.Schema.Types.ObjectId;
    }
}

export default CollectionNS;