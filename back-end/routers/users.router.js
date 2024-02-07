import { Router } from 'express'

import {getUsers ,getUserById ,registerUser ,updateUser ,deleteUser ,loginUser} from '../controllers/users.controller.js'

import {userMiddleWare,superMiddleWare} from '../middlewares/auth.middleware.js';

const usersRouter=Router();

usersRouter.get('/users',superMiddleWare,getUsers)

usersRouter.get('/users/:id',userMiddleWare,getUserById)

usersRouter.post('/users',registerUser)

usersRouter.put('/users/:id',updateUser)

usersRouter.delete('/users/:id',superMiddleWare,deleteUser)

usersRouter.post('/login',loginUser)


export default usersRouter;