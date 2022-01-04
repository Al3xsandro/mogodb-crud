import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

async function createConnection() {
    await client.connect()

    const database = client.db('testDatabase');
    database.collection("usersCollection")
}

createConnection()
    .then(() => console.log("Connected +"))
    .catch((err: unknown) => console.error(`An error was occurred: ${err}`))

export { client }