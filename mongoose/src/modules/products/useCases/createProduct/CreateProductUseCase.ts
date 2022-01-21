import { inject, injectable } from "tsyringe";
import { IStripeGateway } from "../../../../shared/container/providers/stripe/IStripe";
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
        const product = await this.productRepository.create({
            name,
            price,
            quantity
        });

        await this.stripeProvider.createProduct({
            name,
            price,
            quantity
        })

        return product;
    };
};

export { CreateProductUseCase };