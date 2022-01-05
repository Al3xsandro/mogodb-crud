import { Request, Response } from "express";
import { 
    create,
    findAll,
    findProductById,
    findTotalProductsByName,
    totalProducts
} from "../schemas/Product";

async function createProduct(request: Request, response: Response) {
    try {
        const {
            name,
            price,
            quantity
        } = request.body;

        await create({
            name,
            price,
            quantity
        });

        return response.status(201).send({
            message: "Successfully created product!"
        });
    } catch(err) {
        return response.status(500).send(err);
    }
}

async function findAllProducts(request: Request, response: Response) {
    try {
        const { min_price, max_price } = request.query;

        const products = await findAll(Number(min_price), Number(max_price));

        return response.json(products);
    } catch(err) {
        return response.status(500).send(err);
    } 
}

async function findProduct(request: Request, response: Response) {
    try {
        const { product_id: id } = request.params;

        const products = await findProductById(id);

        return response.json(products);
    } catch (err) {
        return response.status(500).send(err)
    }
}

async function findTotalProducts(request: Request, response: Response) {
    try {
        const { name } = request.query;

        if(name) {
            const totalProductsByName = await findTotalProductsByName(String(name));
    
            return response.json(totalProductsByName);
        }

        const total = await totalProducts();

        return response.json(total);
    } catch (err) {
        return response.status(500).send(err);
    };
}

export { 
    createProduct,
    findAllProducts,
    findProduct,
    findTotalProducts,
};