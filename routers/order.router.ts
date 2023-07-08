import express, { query } from 'express';
import { OrderNS } from '../types/order.type';
import orderController from '../controllers/order.controller';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/getOrders', async (req: express.Request, res: express.Response) => {
    try {
        const page = Number(req.query.page) || 0;
        const pageSize = Number(req.query.pageSize) || 10;
        const startDate = req.query.startDate;
        const endDate = req.query.endDate;
        const searchTerms = req.query.searchTerms;
        const orders = await orderController.getOrders(page, pageSize, startDate as string, endDate as string, searchTerms as string);
        if (orders)
            return res.status(200).send(orders);
        else
            return res.status(404).send({ message: 'Something went wrong, please try again' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong, please try again' });
    }
});

router.get('/getOrder/:id', async (req, res) => {
    const orderId: string = req.params.id;
    try {
        const order = await orderController.getSingleOrder(orderId);
        if (order) {
            res.status(200).send(order);
        } else {
            res.status(404).send({ message: 'No order found!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong, please try again!' });
    }
});

router.post('/addOrder', async (req: express.Request, res: express.Response) => {
    const order: OrderNS.IOrder = req.body;

    try {
        const newOrder = await orderController.addOrder(order);
        if (newOrder)
            return res.status(200).send(newOrder);
        else
            return res.status(500).send({ message: 'Something went wrong, please try again1' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Something went wrong, please try again2' });
    }

});

export default router;