import { client } from "../config/connection";

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface IOrderDocument {
    user_id: string;
    quantity: number;
    products: Product[],
    created_at: Date;
}

client.connect();
const orders = client.db().collection<IOrderDocument>('ordersCollection');

async function create({ user_id, quantity, products }: IOrderDocument): Promise<void> {
    await orders.insertOne({
        user_id,
        quantity,
        products,
        created_at: new Date(),
    });
}

export {
    create
};