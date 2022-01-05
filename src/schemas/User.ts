import { ObjectId } from "mongodb";
import { client } from "../config/connection";

interface IUserDocument {
    name: string;
    age: number;
    email: string;
    password: string;
    created_at?: Date;
}

client.connect();
const users = client.db().collection<IUserDocument>('usersCollection');

async function create({ 
    name,
    age,
    email,
    password,
}: IUserDocument): Promise<void> {
    await users.insertOne({
        name,
        age,
        email,
        password,
        created_at: new Date()
    });
};

async function findUserById(id: string): Promise<IUserDocument | null> {
    const user = await users.findOne({ _id: new ObjectId(id) });

    return user;
};

async function findAllUsersByAge(age: number): Promise<IUserDocument[] | null> {
    const result = await users.find(
        {
            age
        }
    ).toArray();

    return result;
}

async function deleteUserById(id: string): Promise<void> {
    await users.deleteOne({ _id: new ObjectId(id) });
};

async function findAllUsers(): Promise<IUserDocument[] | null> {
    const result = await users.find({}).limit(10).toArray();

    return result;
};

async function createManyUsers(data: IUserDocument[]): Promise<void> {
    await users.insertMany(data);
};

async function updateUserByEmail(id: string, new_email: string): Promise<void> {
    await users.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            email: new_email
        }
    });
};

export {
    create,
    findUserById,
    deleteUserById,
    findAllUsers,
    findAllUsersByAge,
    createManyUsers,
    updateUserByEmail
}