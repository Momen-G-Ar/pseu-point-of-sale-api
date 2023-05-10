import express from 'express';
import { addItemValidation } from '../middlewares';
import { ItemNS } from '../types';
import { itemController } from '../controllers';

const router = express.Router();

router.post('/addItem', addItemValidation , async (req: express.Request, res: express.Response) => {
    const item: ItemNS.Item = req.body;
    const addItem = await itemController.addItem(item);
    if (addItem) {
        res.status(201).send('item added successfully');
    } else {
        res.status(500).send('something went wrong, please try again!');
    } 

});


export default router;