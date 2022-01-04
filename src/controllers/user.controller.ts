import { Request, Response } from "express";

import { 
    createUser,
    findUserById,
    deleteUserById,
    findAllUsers,
    createManyUsers,
    updateUserByEmail
} from "../schemas/User";

async function create(request: Request, response: Response) {
    try {
        const { email, password } = request.body;

        const user = await createUser({ email, password });

        return response.status(201).json(user);
    } catch (err) {
        return response.status(500).json(err);
    };
};

async function createMany(request: Request, response: Response) {
    try {
        const { users } = request.body;

        await createManyUsers(users);

        return response.status(201).send();
    } catch(err) {
        return response.status(500).json(err);
    };
};

async function findUser(request: Request, response: Response) {
    try {
        const { id } = request.params;

        const user = await findUserById(id);
    
        return response.json(user);
    } catch (err) {
        return response.status(500).json(err);
    };
};

async function deleteUser(request: Request, response: Response) {
    try {
        const { id } = request.params;

        await deleteUserById(id);

        return response.send();
    } catch (err) {
        return response.status(500).json(err);
    };
};

async function allUsers(request: Request, response: Response) {
    try {
        const users = await findAllUsers();
    
        return response.json(users);
    } catch (err) {
        return response.status(500).json(err);
    };
};

async function updateUserEmail(request: Request, response: Response) {
    try {
        const { email } = request.params;
        const { user_id: id } = request.body;

        await updateUserByEmail(id, email);

        return response.status(200).send();
    } catch (err) {
        return response.status(500).json(err);
    };
};

export { 
    create,
    createMany,
    findUser,
    deleteUser,
    allUsers,
    updateUserEmail
};