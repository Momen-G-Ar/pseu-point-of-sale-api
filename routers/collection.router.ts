import express, { response } from 'express';
import { collectionController } from '../controllers';
import { CollectionNS, ItemNS } from '../types';
import { collectionValidation } from '../middlewares';
const router = express.Router();


router.get('/getCollections', async (req: express.Request, res: express.Response) => {
    try {
        const collections = await collectionController.getCollections();
        return res.status(200).send(collections);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/getCollection/:collectionId', async (req: express.Request, res: express.Response) => {

    const collectionId = req.params.collectionId;
    try {
        const collection = await collectionController.getCollection(collectionId as string);
        if (collection)
            return res.status(200).send(collection);
        else
            return res.status(400).send({ message: 'There isn\'t any collection with this id' });

    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

router.get('/getCollectionItems/:collectionId', async (req: express.Request<any, any, any, ItemNS.IItemQuery>, res: express.Response) => {
    const query: ItemNS.IItemQuery = {
        searchTerms: req.query.searchTerms || ''
    };
    const collectionId = req.params.collectionId;
    try {
        const collectionItems = await collectionController.getCollectionItems(collectionId as string, query);
        if (collectionItems)
            return res.status(200).send(collectionItems);
        else
            return res.status(400).send({ message: 'There isn\'t any collection with this id' });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
});

router.post('/addCollection', collectionValidation, async (req: express.Request, res: express.Response) => {
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

router.put('/updateCollection', async (req: express.Request, res: express.Response) => {
    const { itemId, collectionId } = req.body;
    const resp = await collectionController.updateCollectionItems(collectionId, itemId);
    if (resp) {
        res.status(200).send({ message: "Category updated successfully" });
    } else {
        res.status(400).send({ message: "Failed to update the category" });
    }
});

export default router;