import { Router } from "express";
import { CreateOrderController } from "../../../../modules/orders/useCases/createOrder/CreateOrderController";
import { FindOrdersController } from "../../../../modules/orders/useCases/findOrders/FindOrdersController";

const createOrderController = new CreateOrderController();
const findOrdersController = new FindOrdersController();

const ordersRoutes = Router();

ordersRoutes.post('/', createOrderController.handle);
ordersRoutes.get('/', findOrdersController.handle);

export { ordersRoutes };