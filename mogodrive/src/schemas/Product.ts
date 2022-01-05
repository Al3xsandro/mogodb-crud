import { ObjectId } from "mongodb";
import { client } from "../config/connection";

interface IProductDocument {
    id?: string;
    name?: string;
    price?: number;
    quantity?: number;
    created_at?: Date;
}

type ITotalProducts = { 
    name: string,
    quantity: number
}

client.connect();
const products = client.db().collection<IProductDocument>('productsCollection');

async function create({
    name,
    price,
    quantity
}: IProductDocument): Promise<void> {
    await products.insertOne({
        name,
        price,
        quantity,
        created_at: new Date()
    });
}

async function findAll(min_price?: number, max_price?: number): Promise<IProductDocument[]> {
    if(max_price && min_price) {
        const result = await products.find(
            {
                $and: [
                    { $or: [{ price: { $gte: min_price }}] },
                    { $or: [{ price: { $lte: max_price }}]}
                ]
            }
        ).toArray();
    
        return result;
    }
    
    if (max_price && !min_price) {
        const result = await products.find(
            { price: { $lte: max_price }}
        ).toArray();
    
        return result;
    }

    if (min_price && !max_price) {
        const result = await products.find(
            { price: { $gte: min_price }}
        ).toArray();
    
        return result;
    }
    
    const result = await products.find().toArray();

    return result;
}

async function findProductById(id: string): Promise<IProductDocument | null> {
    const product = await products.findOne({
        _id: new ObjectId(id)
    });

    return product;
}

async function findTotalProductsByName(name: string): Promise<ITotalProducts[]> {
    const result = await products.aggregate<ITotalProducts>([
        { $match: { name } },
        { $group: { _id: "$name", quantity: { $sum: "$quantity" } } },
    ]).toArray();

    return result;
}

async function totalProducts(): Promise<ITotalProducts[]> {
    const result = await products.aggregate<ITotalProducts>([
        { $group: { _id: "$name", quantity: { $sum: "$quantity" } } }
    ]).toArray();

    return result;
}

export { 
    create,
    findAll,
    findProductById,
    findTotalProductsByName,
    totalProducts
};