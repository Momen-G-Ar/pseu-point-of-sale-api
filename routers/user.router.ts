import express from 'express';
import { signupValidation } from '../middlewares';
import { UserNS } from '../types';
import { userController } from '../controllers';

const router = express.Router();

router.post('/signup', signupValidation, async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    const addUser = await userController.addUser(user);
    if (addUser) {
        res.status(201).send({ massage: 'signup succeeded' });
    } else {
        res.status(500).send({ massage: 'something went wrong, please try again!' });
    }

});

router.post('/login', async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    const signedUser = await userController.loginUser(user);
    if (signedUser) {
        res.status(200).send(signedUser);
    } else {
        res.status(404).send({ massage: `email or password wasn't correct please try again` });
    }
});



export default router;