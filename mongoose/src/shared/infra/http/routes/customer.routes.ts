import { Router } from "express";
import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";

const createCustomerController = new CreateCustomerController();

const customerRoutes = Router();

customerRoutes.post('/', createCustomerController.handle);

export { customerRoutes };