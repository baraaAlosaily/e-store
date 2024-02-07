import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase , client } from './db/db.js';
import productsRouter from './routers/products.router.js';
import categoriesRouter from './routers/categories.router.js';
import usersRouter from './routers/users.router.js';
import { userMiddleWare ,adminMiddleWare ,superMiddleWare } from './middlewares/auth.middleware.js'; 


const app = express();

app.use(cors());
app.use(express.json());
dotenv.config()


connectToDatabase();

app.use('/api/v1',usersRouter);
app.use('/api/v1',userMiddleWare,productsRouter);
app.use('/api/v1',userMiddleWare,categoriesRouter);


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});    