import express from 'express';
import { Collection } from '../models';

const validateCollection = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const collection = req.body;
    if (!collection.name) {
        return res.status(400).send({ message: "collection's name is required, please try again!" });
    } else if (!collection.icon) {
        return res.status(400).send({ message: "collection's icon is required, please try again!" });
    } else if (!collection.addedBy) {
        return res.status(400).send({ message: "you have to send the id of the collection's owner, please try again!" });
    }
    const existedCollection = await Collection.find({ name: collection.name });
    if (existedCollection.length > 0) {
        return res.status(400).send({ message: "collection's name must be unique, please try again!" });
    }
    next();
};

export default validateCollection;


// validation specifications:
// name uniqueness
// existence of its attributes 