import { ObjectId } from "mongodb";
import { client } from "../config/connection";

client.connect();
const users = client.db().collection<IUserDocument>('usersCollection');

interface IUserDocument {
    email?: string;
    password?: string;
    created_at?: Date;
}

async function createUser({ email, password }: IUserDocument): Promise<void> {
    await users.insertOne({
        email,
        password,
        created_at: new Date()
    })
}

async function findUserById(id: string): Promise<IUserDocument | null> {
    const user = await users.findOne({ _id: new ObjectId(id) });

    return user;
}

async function deleteUserById(id: string): Promise<void> {
    await users.deleteOne({ _id: new ObjectId(id) });
};

async function findAllUsers(): Promise<IUserDocument[] | null> {
    const result = await users.find({}).limit(10).toArray()

    return result;
};

async function createManyUsers(data: IUserDocument[]): Promise<void> {
    await users.insertMany(data);
};

async function updateUserByEmail(id: string, new_email: string) {
    await users.updateOne({ _id: new ObjectId(id) }, {
        $set: {
            email: new_email
        }
    });
};

export {
    createUser,
    findUserById,
    deleteUserById,
    findAllUsers,
    createManyUsers,
    updateUserByEmail
}