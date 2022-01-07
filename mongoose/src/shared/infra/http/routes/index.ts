import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { productsRoutes } from "./products.routes";

const routes = Router();

routes.use('/customers', customerRoutes);
routes.use('/products', productsRoutes);

export default routes;