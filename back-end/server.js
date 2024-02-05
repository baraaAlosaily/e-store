import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase , client } from './db/db.js';
import productsRouter from './routers/products.router.js';
import categoriesRouter from './routers/categories.router.js';
import { authMiddleWare } from './middlewares/auth.middleware.js'; 

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()


connectToDatabase();

app.use('/api/v1',authMiddleWare,productsRouter);
app.use('/api/v1',authMiddleWare,categoriesRouter);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});    