import { Router } from "express";
import { CreateOrderController } from "../../../../modules/orders/useCases/CreateOrderController";

const createOrderController = new CreateOrderController();

const ordersRoutes = Router();

ordersRoutes.post('/', createOrderController.handle);

export { ordersRoutes };