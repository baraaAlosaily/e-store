import { Router } from 'express'
import { getProducts, createProduct, updateProduct, deleteProduct ,getProductById} from '../controllers/products.controller.js'

const productsRouter=Router();

productsRouter.get('/products',getProducts)

productsRouter.get('/products/:id',getProductById)

productsRouter.post('/products',createProduct)

productsRouter.put('/products',updateProduct)

productsRouter.delete('/products/:id',deleteProduct)


export default productsRouter;

