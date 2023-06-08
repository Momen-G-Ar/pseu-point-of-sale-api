import express from 'express';
import { signupValidation } from '../middlewares';
import { UserNS } from '../types';
import { userController } from '../controllers';

const router = express.Router();

router.post('/signup', signupValidation, async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    const addUser = await userController.addUser(user);
    if (addUser) {
        res.status(201).send({ message: 'signup succeeded' });
    } else {
        res.status(500).send({ message: 'something went wrong, please try again!' });
    }

});

router.post('/login', async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    const signedUser = await userController.loginUser(user);
    if (signedUser) {
        res.status(200).send(signedUser);
    } else {
        res.status(404).send({ message: `email or password wasn't correct please try again` });
    }
});

router.get('/getItems', async (req: express.Request, res: express.Response) => {
    const user = req.query.userId as string;
    const userItems = await userController.getUserWithItems(user);
    if (userItems) {
        res.status(200).send(userItems);
    }
    else {
        res.status(404).send({ message: `Internal server error` });
    }
});

export default router;