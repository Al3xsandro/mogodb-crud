import { container } from "tsyringe";

import { ICustomerRepository } from "../../modules/customers/repositories/ICustomerRepository";
import { CustomerRepository } from "../../modules/customers/infra/mongoose/repositories/CustomerRepository";

container.registerSingleton<ICustomerRepository>(
    "CustomerRepository",
    CustomerRepository
)