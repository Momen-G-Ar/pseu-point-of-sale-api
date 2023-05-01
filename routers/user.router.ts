import express from 'express';
import { signupValidation } from '../middlewares';
import { UserNS } from '../types';
import { userController } from '../controllers';

const router = express.Router();

router.post('/signup', signupValidation, async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    const addUser = await userController.addUser(user);
    if (addUser) {
        res.status(201).send('signup succedded');
    } else {
        res.status(500).send('something went wrong, please try again!');
    }

});


export default router;