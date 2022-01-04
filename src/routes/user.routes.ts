import { 
    Router,
} from "express";

import { 
    create,
    createMany,
    deleteUser,
    allUsers,
    updateUserEmail,
    findUser,
 } from "../controllers/user.controller";

const usersRoutes = Router();

usersRoutes.post('/user', create);

usersRoutes.post('/users', createMany)

usersRoutes.get('/user/:id', findUser);

usersRoutes.get('/users', allUsers);

usersRoutes.delete('/user/:id', deleteUser);

usersRoutes.patch('/user/:email', updateUserEmail)

export { usersRoutes };