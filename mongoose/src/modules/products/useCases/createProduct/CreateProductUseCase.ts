import { inject, injectable } from "tsyringe";
import { ICreateProductDTO } from "../../dtos/ICreateProductDTO";
import { IProductDocument } from "../../infra/mongoose/schemas/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class CreateProductUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository
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

        return product;
    };
};

export { CreateProductUseCase };