import express from 'express';
import jwt from 'jsonwebtoken';
const guard = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = process.env.SECRET_KEY || '';
    const token = req.headers.authorization || '';
    if (token === '') {
        return res.status(404).send({ message: 'token is not received , please retry and send it with the requested' });
    }
    if (jwt.verify(token, key)) {
        console.log('received token is valid');
        next();
    }
    else {
        console.log('received token is invalid');
        return res.status(404).send({ message: 'invalid token , please try again!' });
    }
};
export default guard;