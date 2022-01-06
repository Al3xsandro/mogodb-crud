import { connect } from "mongoose";

export default async (): Promise<void> => {
    try {
        await connect('mongodb://localhost:27017/', {
            dbName: 'testDatabase',
        })

        console.log('+ database connected');
    } catch (err) {
        console.error(err);
    }
};