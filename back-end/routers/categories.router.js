import {Router} from 'express';
import {getCategories,createCategory,updateCategory,deleteCategory,getCategoryById} from '../controllers/categories.controller.js';

const categoriesRouter=Router();

categoriesRouter.get('/categories',getCategories)

categoriesRouter.get('/categories/:id',getCategoryById)

categoriesRouter.post('/categories',createCategory);

categoriesRouter.put('/categories',updateCategory);

categoriesRouter.delete('/categories/:id',deleteCategory)

export default categoriesRouter;