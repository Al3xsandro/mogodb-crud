import { ICreateOrderDTO } from "../../../dtos/ICreateOrderDTO";
import { IOrderRepository } from "../../../repositories/IOrderRepository";
import { IOrderDocument, order } from "../schemas/Order";

class OrderRepository implements IOrderRepository {
    private repository;

    constructor() {
        this.repository = order;
    }
    
    async create({ customerId, totalPrice, products }: ICreateOrderDTO): Promise<IOrderDocument> {
        const order = await this.repository.create({
            customerId,
            totalPrice,
            products
        });

        return order;
    };
}

export { OrderRepository };