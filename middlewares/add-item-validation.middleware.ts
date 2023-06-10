import { ItemNS } from "../types";
import { Item } from '../models/index';
import express from 'express';

const addItemValidation = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const item: ItemNS.Item = req.body;
    const itemSameWithName = await Item.find({
        name: { $eq: item.name }
    });
    if (itemSameWithName.length) {
        return res.status(400).send({ message: 'invalid name' });
    }
    const itemSameWithBarcode = await Item.find({
        barcode: { $eq: item.barcode }
    });
    if (itemSameWithBarcode.length) {
        return res.status(400).send({ message: 'invalid barcode' });
    }
    next();
};

export default addItemValidation;