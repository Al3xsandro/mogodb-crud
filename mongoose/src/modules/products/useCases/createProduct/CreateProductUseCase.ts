import { inject, injectable } from "tsyringe";
import { IStripeGateway } from "../../../../shared/container/providers/stripe/IStripe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IProductDocument } from "../../infra/mongoose/schemas/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class CreateProductUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository,
        @inject('StripeProvider')
        private stripeProvider: IStripeGateway
    ) {}

    async execute({
        name,
        price,
        quantity
    }: ICreateProductDTO): Promise<IProductDocument> {
        const stripeProduct = await this.stripeProvider.createProduct({
            name,
            price,
            quantity
        });

        if(!stripeProduct) {
            throw new AppError('An error was occurred');
        };
        
        const product = await this.productRepository.create({
            name,
            price,
            quantity,
            stripe_product_id: String(stripeProduct.product),
            stripe_price_id: stripeProduct.id,
        });

        return product;
    };
};

export { CreateProductUseCase };