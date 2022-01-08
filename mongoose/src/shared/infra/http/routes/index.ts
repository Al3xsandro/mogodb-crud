import { Router } from "express";

import { customerRoutes } from "./customers.routes";
import { productsRoutes } from "./products.routes";
import { ordersRoutes } from "./orders.routes";

const routes = Router();

routes.use('/customers', customerRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);

export default routes;