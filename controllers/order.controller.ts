import { Order } from '../models';
import { OrderRouter } from '../routers';
import { OrderNS } from '../types/order.type';

const getOrders = async (page: number, pageSize: number) => {
    try {
        let orders = await Order.find({}, {}, { sort: { orderNumber: -1 } });
        const start = page * pageSize;
        const end = start + pageSize;
        orders = orders.slice(start, end);
        return orders;
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
            casherName: order.casherName,
            total: order.total.toFixed(2),
            items: order.items || [],
            discountCode: order.discountCode,
            tax: order.tax,
            date: new Date().toLocaleDateString(),
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