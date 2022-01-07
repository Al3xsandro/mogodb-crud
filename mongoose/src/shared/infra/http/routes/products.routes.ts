import { Router } from "express";

import { CreateProductController } from "../../../../modules/products/useCases/createProduct/CreateProductController";
import { FindAllProductsController } from "../../../../modules/products/useCases/findAllProducts/FindAllProductsController";
import { FindTotalProductsController } from "../../../../modules/products/useCases/findTotalProducts/FindTotalProductsController";

const createProductController = new CreateProductController();
const findAllProductsController = new FindAllProductsController();
const findTotalProductsController = new FindTotalProductsController();

const productsRoutes = Router();

productsRoutes.post('/', createProductController.handle);
productsRoutes.get('/', findAllProductsController.handle);
productsRoutes.get('/total', findTotalProductsController.handle);

export { productsRoutes };