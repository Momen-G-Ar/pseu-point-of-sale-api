import mongoose from 'mongoose';
import { Order } from '../models';
import { OrderNS } from '../types/order.type';

const getOrders = async (page: number, pageSize: number, startDate: string, endDate: string, searchTerms?: string | number | undefined) => {
    searchTerms = searchTerms || '';
    const filter: mongoose.FilterQuery<OrderNS.IOrder> = {};
    const regex = new RegExp(searchTerms as string, 'i');
    filter.$and = [
        { date: { $gte: new Date(startDate), $lte: new Date(new Date(endDate).getTime() + 1000 * 60 * 60 * 24) } },
        {
            $or: [
                { cashierName: regex },
                { orderNumber: regex },
            ]
        }
    ];

    try {
        let length = await Order.countDocuments({ ...filter });
        let orders = await Order.find({ ...filter }, {}, {})
            .sort({ orderNumberToSort: -1 })
            .skip(page * pageSize)
            .limit(pageSize);
        return { orders, numberOfPages: Math.ceil(Number((length / pageSize))) };
    } catch (error) {
        console.error(error);
        return false;
    }
};

const getSingleOrder = async (orderId: string) => {
    try {
        const order = await Order.findById(orderId);
        if (order)
            return order;
        else
            return false;
    } catch (error) {
        console.error(error);
        return false;
    }
};

const addOrder = async (order: OrderNS.IOrder) => {
    try {
        const count = await Order.countDocuments();
        const newOrder = new Order({
            orderNumber: String(count + 1),
            orderNumberToSort: count + 1,
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
    getSingleOrder,
};