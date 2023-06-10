import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { guard, logger } from './middlewares';
import mongoose from 'mongoose';
import { userRouter, itemRouter } from './routers';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(logger);
app.use('/user', userRouter);
app.use('/item', guard , itemRouter);

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
        .catch((err) => {
            console.log(`🤨 [server]:\x1b[31m Failed to connect to mongodb ${err} \x1b[0m`);
        });
};