import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middlewares';
import mongoose from 'mongoose';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.use(logger);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send({ value: 'Express + TypeScript Server + Hello World' });
});

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    dbConnect();
});

const dbConnect = () => {
    console.log("connecting to db...");
    mongoose.connect("mongodb://127.0.0.1:27017/pos-app")
        .then(() => {
            console.log(`🤗 [server]: Connected to MongoDB`);
        })
        .catch((err) => {
            console.log(`🤨 [server]: Failed to connect to mongodb ${err}`);
        });
};