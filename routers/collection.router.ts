import express from 'express';
import { collectionController } from '../controllers';
import { CollectionNS } from '../types';
const router = express.Router();


router.get('/getCollection', (req, res) => {

})

router.post('/addCollection', async (req: express.Request<null,{message:string},CollectionNS.ICollection>, res) => {
    const collection: CollectionNS.ICollection = req.body;
    try {
        const newCollection = await collectionController.addCollection(collection);
        if (collection) {
            res.status(201).send({ message: 'collection added successfully' });
        } else {
            res.status(500).send({ message: 'something went wrong, please try again!' });
        }
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: "Something went wrong, please try again!" })
    }
})


export default router;