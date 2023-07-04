import mongoose from 'mongoose';
import { Order } from '../models';
import { OrderNS } from '../types/order.type';

const getOrders = async (page: number, pageSize: number, startDate: string, endDate: string, searchTerms?: string) => {
    searchTerms = searchTerms || '';
    const filter: mongoose.FilterQuery<OrderNS.IOrder> = {};
    const regex = new RegExp(searchTerms, 'i');

    filter.$and = [
        { cashierName: regex },
        { date: { $gte: new Date(startDate), $lte: new Date(new Date(endDate).getTime() + 1000 * 60 * 60 * 24) } },
    ];

    try {
        let length = (await Order.countDocuments({ ...filter }));
        let orders = await Order
            .find({ ...filter }, {}, { sort: { orderNumber: -1 } })
            .skip(page * pageSize)
            .limit(pageSize);
        return { orders, numberOfPages: Math.ceil(Number((length / pageSize))) };
    } catch (error) {
        console.error(error);
        return false;
    }
};

const addOrder = async (order: OrderNS.IOrder) => {
    try {
        const count = await Order.find();
        const newOrder = new Order({
            orderNumber: count.length + 1,
            cashierName: order.cashierName,
            total: order.total.toFixed(2),
            items: order.items || [],
            discountCode: order.discountCode,
            tax: order.tax,
            date: new Date(),
            time: new Date().toLocaleTimeString(),
        });
        return await newOrder.save();
    } catch (error) {
        console.error(error);
        return false;
    }
};

export default {
    getOrders,
    addOrder,
};