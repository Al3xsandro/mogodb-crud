import { 
    Router,
} from "express";

import { 
    createUser,
    createMany,
    deleteUser,
    allUsers,
    updateUserEmail,
    findUser
 } from "../controllers/user.controller";

const usersRoutes = Router();

usersRoutes.post('/user', createUser);

usersRoutes.post('/users', createMany)

usersRoutes.get('/user/:id', findUser);

usersRoutes.get('/users', allUsers);

usersRoutes.delete('/user/:id', deleteUser);

usersRoutes.patch('/user/:id', updateUserEmail)

export { usersRoutes };