import { ObjectId } from "mongodb";
import { client } from "../config/connection";

client.connect();
const collection = client.db().collection<IUserDocument>('usersCollection');

interface IUserDocument {
    id?: string;
    email?: string,
    password?: string
}

async function createUser({ email, password }: IUserDocument): Promise<void> {
    await collection.insertOne({
        email,
        password
    });
}

async function findUser({ email }: IUserDocument): Promise<IUserDocument | null> {
    const user = await collection.findOne({ email });

    return user;
}

async function deleteUser(id: string): Promise<void> {
    await collection.deleteOne({ _id: new ObjectId(id) });
}

async function findAllUsers(): Promise<IUserDocument[] | null> {
    const users = await collection.find({}).limit(10).toArray()

    return users;
}

async function createManyUsers(data: IUserDocument[]): Promise<void> {
    await collection.insertMany(data);
}

export { 
    createUser,
    findUser,
    deleteUser,
    findAllUsers,
    createManyUsers,
}