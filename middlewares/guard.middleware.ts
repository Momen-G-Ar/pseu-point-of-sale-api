import express from 'express'
import jwt from 'jsonwebtoken'
const guard = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const key = process.env.SECRET_KEY || '';
    const token = req.headers.authorization || '';
    if (token === '') {
        return res.status(404).send('token is not recieved , please retry and send it with the requesed')
    }
    if (jwt.verify(token, key)) {
        console.log('recieved token is valid')
        next()
    } else {
        console.log('recieved token is invalid');
        return res.status(404).send('invalid token , please try again!');
    }
}
export default guard;