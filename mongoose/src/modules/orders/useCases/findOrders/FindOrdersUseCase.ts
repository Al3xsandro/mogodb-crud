import { inject, injectable } from "tsyringe";

import { IFindOrdersDTO } from "../../dtos/IFindOrdersDTO";
import { IOrderDocument } from "../../infra/mongoose/schemas/Order";
import { IOrderRepository } from "../../repositories/IOrderRepository";

@injectable()
class FindOrdersUseCase {
    constructor(
        @inject('OrderRepository')
        private orderRepository: IOrderRepository,
    ) {}

    async execute({
        below_price,
        up_price,
        date,
        page,
        product_id
    }: IFindOrdersDTO): Promise<IOrderDocument[]> {
        const orders = await this.orderRepository.find({
            below_price,
            up_price,
            date,
            page,
            product_id,
        });

        return orders;
    };
};

export { FindOrdersUseCase };