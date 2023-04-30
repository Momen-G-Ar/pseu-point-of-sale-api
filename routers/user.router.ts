import express from 'express';
import { signupValidation } from '../middlewares';
import { UserNS } from '../types';
import { userController } from '../controllers';

const router = express.Router();

router.post('/signup', signupValidation, (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    userController.addUser(user)
        .then(response => {
            res.send('signup succedded');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('something went wrong!');
        });
});


export default router;