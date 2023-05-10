import { ItemNS } from "../types";
import { Item } from '../models/index';
import express from 'express';

const signupValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const item: ItemNS.Item = req.body;
    const itemSameWithBarcode = await Item.find({
        barcode: { $eq: item.barcode }
    });
    if (itemSameWithBarcode.length) {
        return res.status(400).send('invalid barcode');
    }
    const itemSameWithName = await Item.find({
        name: { $eq: item.name }
    });
    if (itemSameWithName.length) {
        return res.status(400).send('invalid name');
    }
    next();
};

export default signupValidation;