import express from 'express';
import { collectionController } from '../controllers';
import { CollectionNS } from '../types';
import { collectionValidation } from '../middlewares';
const router = express.Router();


router.get('/getCollection', (req, res) => {

});

router.post('/addCollection', collectionValidation, async (req, res) => {
    const collection: CollectionNS.ICollection = req.body;
    try {
        const newCollection = await collectionController.addCollection(collection);
        if (newCollection) {
            res.status(201).send({ message: 'collection added successfully' });
        } else {
            res.status(500).send({ message: 'something went wrong, please try again!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong, please try again!" });
    }
});


export default router;