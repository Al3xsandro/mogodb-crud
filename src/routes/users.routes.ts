import { 
    Router,
    Request,
    Response
} from "express";

import { 
    createUser,
    findUser,
    deleteUser,
    findAllUsers,
    createManyUsers
} from "../schemas/User";

const usersRoutes = Router();

usersRoutes.post('/user', async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const userAlreadyExists = await findUser({ email });

    if (userAlreadyExists) {
        return response.status(400).json({
            message: "User already exists!"
        });
    }

    const user = await createUser({ email, password });

    return response.status(201).json(user);
});

usersRoutes.post('/users', async (request: Request, response: Response) => {
    const { users } = request.body;

    await createManyUsers(users);

    return response.status(201).send();
})

usersRoutes.get('/user', async (request: Request, response: Response) => {
    const { email } = request.query;

    const user = await findUser({ email: String(email) });

    return response.json(user);
});

usersRoutes.delete('/user/:id', async (request: Request, response: Response) => {
    const { id } = request.params;

    await deleteUser(id);

    return response.send();
});

usersRoutes.get('/users', async (request: Request, response: Response) => {
    const users = await findAllUsers();

    return response.json(users);
})

export { usersRoutes };