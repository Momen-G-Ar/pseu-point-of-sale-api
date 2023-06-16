import express, { response } from 'express';
import { collectionController } from '../controllers';
import { CollectionNS } from '../types';
import { collectionValidation } from '../middlewares';
const router = express.Router();


router.get('/getCollections', async (req, res) => {
    res.status(200).send(await collectionController.getCollections());
});

router.post('/addCollection', collectionValidation, async (req, res) => {
    const collection: CollectionNS.ICollection = req.body;
    try {
        const newCollection = await collectionController.addCollection(collection);
        if (newCollection) {
            res.status(201).send({ message: 'Category added successfully' });
        } else {
            res.status(500).send({ message: 'something went wrong, please try again!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Something went wrong, please try again!" });
    }
});

router.put('/updateCollection', async(req, res) => {
    const { itemsIds, id } = req.body;
    const resp = await collectionController.updateCollectionItems(id,itemsIds);
    if(resp){
        res.status(200).send({message: "Category updated successfully"});
    }else{
        res.status(400).send({message: "Failed to update the category"});
    }
});

export default router;