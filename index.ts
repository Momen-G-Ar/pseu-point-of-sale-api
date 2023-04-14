import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { logger } from './middlewares';

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
});