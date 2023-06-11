import mongoose from 'mongoose';

namespace CollectionNS {

    export interface ICollection {
        name: string;
        icon: string;
        items: mongoose.Schema.Types.ObjectId[];
        addedBy: mongoose.Schema.Types.ObjectId;
    }
}

export default CollectionNS;