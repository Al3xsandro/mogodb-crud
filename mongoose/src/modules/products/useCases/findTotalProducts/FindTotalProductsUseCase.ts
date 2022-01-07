import { inject, injectable } from "tsyringe";
import { IProductDocument } from "../../infra/mongoose/schemas/Product";
import { IProductRepository } from "../../repositories/IProductRepository";

@injectable()
class FindTotalProductsUseCase {
    constructor(
        @inject('ProductRepository')
        private productRepository: IProductRepository
    ) {}

    async execute(): Promise<IProductDocument[]> {
        const products = await this.productRepository.findTotalProducts();

        return products; 
    }
}

export { FindTotalProductsUseCase };