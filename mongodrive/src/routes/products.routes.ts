import { Router } from "express";
import { 
    createProduct,
    findAllProducts, 
    findProduct,
    findTotalProducts
} from "../controllers/product.controller";

const productsRoutes = Router();

productsRoutes.post('/products', createProduct);
productsRoutes.get('/products', findAllProducts);
productsRoutes.get('/products/total', findTotalProducts);
productsRoutes.get('/products/:product_id', findProduct);

export { productsRoutes };