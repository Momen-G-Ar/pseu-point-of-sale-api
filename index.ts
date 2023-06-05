import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middlewares';
import mongoose from 'mongoose';
import { userRouter, itemRouter } from './routers';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(logger);
app.use('/user', userRouter);
app.use('/item', itemRouter);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    dbConnect();
});

const dbConnect = () => {
    console.log("connecting to db...");
    mongoose.connect(`${process.env.DATABASE_SERVER_URL}`)
        .then(() => {
            console.log(`🤗 [server]: Connected to MongoDB`);
        })
        .catch((err) => {
            console.log(`🤨 [server]: Failed to connect to mongodb ${err}`);
        });
};