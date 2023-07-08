import mongoose from 'mongoose';

export namespace OrderNS {
    export interface IOrder {
        _id?: mongoose.Schema.Types.ObjectId;
        orderNumber?: string;
        orderNumberToSort?: number;
        cashierName: string;
        total: number;
        time?: string;
        date?: string;
        items?: {
            item: mongoose.Schema.Types.ObjectId;
            quantity: number;
        }[];
        discountCode?: String;
        tax?: number;
    }
}