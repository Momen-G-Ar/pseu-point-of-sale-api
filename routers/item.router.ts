import express from 'express';
import { addItemValidation } from '../middlewares';
import { ItemNS } from '../types';
import { itemController } from '../controllers';

const router = express.Router();

router.post('/addItem', addItemValidation, async (req: express.Request, res: express.Response) => {
    const item: ItemNS.Item = req.body;
    const addItem = await itemController.addItem(item);
    if (addItem) {
        res.status(201).send({ message: 'item added successfully' });
    } else {
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

router.get('/getItems/:userId', async (req: express.Request, res: express.Response) => {
    const userId = req.params.userId;
    const items = await itemController.getItems(userId);
    res.status(200).send(items);
});

router.get('/getItem/:id', async (req: express.Request, res: express.Response) => {
    const item = await itemController.getItem(req.params.id);
    if (item) {
        res.status(200).send(item);
    } else {
        res.status(404).send({ message: 'There is no item with this id' });
    }
});

router.delete('/deleteItem', async (req: express.Request, res: express.Response) => {
    const userId = req.query.userId as string;
    const itemId = req.query.itemId as string;
    const response = await itemController.deleteItem(userId, itemId);
    if (response) {
        res.status(200).send({ message: 'Item deleted successfully' });
    } else {
        res.status(404).send({ message: 'Internal server error, the item is not deleted' });
    }
});

router.put('/updateItem', async (req: express.Request, res: express.Response) => {

});

export default router;