import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { guard, logger } from './middlewares';
import mongoose from 'mongoose';
import { userRouter, itemRouter, collectionRouter, discountRouter } from './routers';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' })); // Increase the limit to 50 MB
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));


app.use(logger);
app.use('/user', userRouter);
app.use('/item', guard, itemRouter);
app.use('/collection', guard, collectionRouter);
app.use('/discount', guard, discountRouter)

app.listen(PORT, () => {
    console.log(`⚡️ [server]:\x1b[32m Server is running at http://localhost:${PORT} \x1b[0m`);
    dbConnect();
});

const dbConnect = () => {
    console.log("🧐 [server]: connecting to db...");
    mongoose.connect(`${process.env.DATABASE_SERVER_URL}`)
        .then(() => {
            console.log(`🤗 [server]:\x1b[32m Connected to MongoDB \x1b[0m`);
        })
        .catch((err: mongoose.Error) => {
            console.log(`🤨 [server]:\x1b[31m Failed to connect to mongodb\x1b[0m \n\n${err.message}\n\n `);
        });
};