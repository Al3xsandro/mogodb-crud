import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

import { ICustomerRepository } from "../../../customers/repositories/ICustomerRepository";
import { IProductRepository } from "../../../products/repositories/IProductRepository";

import { ICreateOrderDTO } from "../../dtos/ICreateOrderDTO";
import { IOrderDocument } from "../../infra/mongoose/schemas/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";

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
    
    async execute({ customerId, totalPrice, products}: ICreateOrderDTO): Promise<IOrderDocument> {
        if (products.length > 10) {
            throw new AppError('You cannot update many products');
        };

        const customerExists = await this.customerRepository.findById(customerId);

        if (!customerExists) {
            throw new AppError('Customer does not exist!');
        };

        const validProducts = await this.productRepository.findManyByIds(
            products.map(product => product.id)
        );

        for (const productSentByUser of products) {
            const validProduct = validProducts.find((product) => product.id === productSentByUser.id);

            if(!validProduct) {
                throw new AppError(`Invalid product_id: ${productSentByUser.id}`);
            };

            if(validProduct.quantity < productSentByUser.quantity) {
                throw new AppError(`Insufficient quantity to reduce product id ${validProduct.id}`)
            }

            const newQuantity = Number(validProduct.quantity - productSentByUser.quantity);
            
            await this.productRepository.updateQuantity(validProduct.id, newQuantity);
        };

        const order = await this.orderRepository.create({
            customerId,
            totalPrice,
            products
        });

        return order;
    }
};

export { CreateOrderUseCase };