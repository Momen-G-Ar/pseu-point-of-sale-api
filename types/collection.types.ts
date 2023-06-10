import mongoose from 'mongoose';

namespace CollectionNS {

    export interface ICollection {
        name: string;
        value: mongoose.Schema.Types.ObjectId[];
        addedBy: mongoose.Schema.Types.ObjectId;
    }
}

export default CollectionNS;