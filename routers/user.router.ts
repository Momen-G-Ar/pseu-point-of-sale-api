import express from 'express';
import { signupValidation, updateInfoValidation } from '../middlewares';
import { UserNS } from '../types';
import { userController } from '../controllers';

const router = express.Router();


router.get('/getUsers', async(req: express.Request, res: express.Response)=>{
    const users = await userController.getUsers();
    res.status(200).send(users);
})

router.post('/signup', signupValidation, async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    try {
        const addUser = await userController.addUser(user);
        if (addUser) {
            res.status(201).send({ message: 'signup succeeded' });
        } else {
            res.status(500).send({ message: 'Something went wrong, please try again!' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong, please try again!' });
    }

});

router.post('/login', async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    try {
        const signedUser = await userController.loginUser(user);
        if (signedUser) {
            res.status(200).send(signedUser);
        } else {
            res.status(404).send({ message: `email or password wasn't correct please try again` });
        }
    } catch (error) {
        res.status(500).send({ message: 'Something went wrong, please try again!' });
    }
});

router.put('/updateInfo', updateInfoValidation ,async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    try {
        const updatedUser = await userController.updateInfo(user);
        if (updatedUser) {
            res.status(200).send(updatedUser);
        } else {
            res.status(404).send();
        }
    } catch (error) {
        res.status(500).send();
    }
});
router.put('/updatePassword',async (req: express.Request, res: express.Response) => { 
    const passwords = req.body;
    try {
        const updatedPassword = await userController.updatePassword(passwords);
        if (updatedPassword !== undefined) {
            res.status(200).send({updatedPassword});
        } else {
            res.status(400).send();
        }
    } catch (error) {
        res.status(500);
    }
});

export default router;