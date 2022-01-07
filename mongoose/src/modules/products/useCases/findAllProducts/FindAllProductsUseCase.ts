import { injectable, inject } from "tsyringe";
import { IProductDocument } from "../../infra/mongoose/schemas/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class FindAllProductsUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}

    async execute(): Promise<IProductDocument[]> {
        const products = await this.productRepository.find();

        return products;
    }
}

export { FindAllProductsUseCase };