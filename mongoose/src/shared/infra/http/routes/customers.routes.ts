import { Router } from "express";

import { CreateCustomerController } from "../../../../modules/customers/useCases/createCustomer/CreateCustomerController";
import { FindAllCustomersController } from "../../../../modules/customers/useCases/findAllCustomers/FindAllCustomersController";

const createCustomerController = new CreateCustomerController();
const findAllCustomersController = new FindAllCustomersController();

const customerRoutes = Router();

customerRoutes.post('/', createCustomerController.handle);
customerRoutes.get('/', findAllCustomersController.handle);

export { customerRoutes };