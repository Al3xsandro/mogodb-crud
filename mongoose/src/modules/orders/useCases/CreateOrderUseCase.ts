import { inject, injectable } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";

import { ICustomerRepository } from "../../customers/repositories/ICustomerRepository";
import { IProductRepository } from "../../products/repositories/IProductRepository";

import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IOrderRepository } from "../repositories/IOrderRepository";

@injectable()
class CreateOrderUseCase {
    constructor(
        @inject('OrderRepository')
        private orderRepository: IOrderRepository,
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}
    
    async execute({ customerId, totalPrice, products}: ICreateOrderDTO) {
        const customerExists = await this.customerRepository.findById(customerId);

        if (!customerExists) {
            throw new AppError('Customer does not exist!');
        };

        if (products.length > 10) {
            throw new AppError('You cannot update many products');
        };

        for (const product of products) {
            const productExist = await this.productRepository.findById(product.id);
        
            if (!productExist) {
                throw new AppError('Product id does not exist');
            };

            if (productExist.quantity <= Number(product.quantity)) {
                throw new AppError(`Insufficient quantity to product id: ${product.id}`)
            }

            await this.productRepository.updateQuantity(product.id, Number(product.quantity));
        }

        const order = await this.orderRepository.create({
            customerId,
            totalPrice,
            products
        });

        return order;
    }
};

export { CreateOrderUseCase };