import { container } from "tsyringe";

import { ICustomerRepository } from "../../modules/customers/repositories/ICustomerRepository";
import { CustomerRepository } from "../../modules/customers/infra/mongoose/repositories/CustomerRepository";

import { ProductRepository } from "../../modules/products/infra/mongoose/repositories/ProductRepository";
import { IProductRepository } from "../../modules/products/repositories/IProductRepository";

import { IOrderRepository } from "../../modules/orders/repositories/IOrderRepository";
import { OrderRepository } from "../../modules/orders/infra/mongoose/repositories/OrderRepository";

container.registerSingleton<ICustomerRepository>(
    "CustomerRepository",
    CustomerRepository
);

container.registerSingleton<IProductRepository>(
    "ProductRepository",
    ProductRepository
);

container.registerSingleton<IOrderRepository>(
    "OrderRepository",
    OrderRepository    
);