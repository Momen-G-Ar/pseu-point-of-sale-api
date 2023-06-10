import express from 'express';
import { addItemValidation } from '../middlewares';
import { ItemNS } from '../types';
import { itemController } from '../controllers';

const router = express.Router();

router.post('/addItem', addItemValidation, async (req: express.Request, res: express.Response) => {
    const item: ItemNS.Item = req.body;
    try {
        const addItem = await itemController.addItem(item);
        if (addItem) {
            res.status(201).send({ message: 'item added successfully' });
        } else {
            res.status(500).send({ message: 'something went wrong, please try again!' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

router.get('/getItems', async (req: express.Request, res: express.Response) => {
    try {
        const items = await itemController.getItems();
        if (items?.length) {
            res.status(200).send(JSON.stringify(items));
        } else {
            res.status(404).send(undefined);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

router.get('/getItem', async (req: express.Request, res: express.Response) => {
    try {
        const item = await itemController.getItem(req.params.id);
        if (item) {
            res.status(200).send(JSON.stringify(item));
        } else {
            res.status(404).send(undefined);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

router.delete('/deleteItem', async (req: express.Request, res: express.Response) => {
    try {
        const response = await itemController.deleteItem(req.params.id);
        if (response) {
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(404).send(undefined);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

router.put('/updateItem', async (req: express.Request, res: express.Response) => {
    try {
        const response = await itemController.deleteItem(req.body);
        if (response) {
            res.status(200).send(JSON.stringify(response));
        } else {
            res.status(404).send(undefined);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }
});

export default router;