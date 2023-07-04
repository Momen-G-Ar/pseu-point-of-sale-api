import mongoose from 'mongoose';

namespace ItemNS {
    export interface Item {
        _id?: mongoose.Schema.Types.ObjectId;
        name: string,
        price: number,
        image: string,
        barcode: string,
        description: string,
        addedBy: string,
        quantity: number,
        priceHistory: [{ date: Date, price: Number; }],
    };

    export interface IItemQuery {
        searchTerms: string;
    }
}

export default ItemNS;