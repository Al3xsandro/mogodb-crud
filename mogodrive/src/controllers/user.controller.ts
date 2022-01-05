import { Request, Response } from "express";

import { 
    create,
    findUserById,
    deleteUserById,
    findAllUsers,
    createManyUsers,
    updateUserByEmail,
    findAllUsersByAge
} from "../schemas/User";

async function createUser(request: Request, response: Response) {
    try {
        const {
            name,
            age,
            email,
            password,
            products
        } = request.body;

        const user = await create({
            name,
            age,
            email,
            password,
            products
        });

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
        const { age } = request.query;

        if (age) {
            const usersByAge = await findAllUsersByAge(Number(age));
            
            return response.status(200).json(usersByAge);
        }

        const users = await findAllUsers();
    
        return response.json(users);
    } catch (err) {
        return response.status(500).json(err);
    };
};

async function updateUserEmail(request: Request, response: Response) {
    try {
        const { id } = request.params;
        const { email } = request.body;

        await updateUserByEmail(id, email);

        return response.status(200).send({
            message: "Successfully updated email"
        });
    } catch (err) {
        return response.status(500).json(err);
    };
};

export { 
    createUser,
    createMany,
    findUser,
    deleteUser,
    allUsers,
    updateUserEmail
};