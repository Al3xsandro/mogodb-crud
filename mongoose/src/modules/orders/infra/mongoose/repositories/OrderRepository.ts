import { ICreateOrderDTO } from "../../../dtos/ICreateOrderDTO";
import { IFindOrdersDTO } from "../../../dtos/IFindOrdersDTO";
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

    async find({ 
        below_price,
        up_price,
        date,
        page,
        product_id
    }: IFindOrdersDTO): Promise<IOrderDocument[]> {        
        if(below_price || up_price) {
            const ordersByPrice = await this.repository.find({
                $and: [
                    { $or: [ { totalPrice: { $gte: up_price }} ]},
                    { $or: [ { totalPrice: { $lte: below_price }} ]},
                ]
            }).skip(Number(page) + 10).limit(10);

            return ordersByPrice;
        }

        if(date) {
            const ordersByDate = await this.repository.find({
                createdAt: { $gte: date }
            }).skip(Number(page) + 10).limit(10);

            return ordersByDate;
        }

        if(product_id) {
            const ordersByProductId = await this.repository.find({
                products: {
                    $elemMatch: {
                        id: product_id
                    }
                }
            }).skip(Number(page) + 10).limit(10);

            return ordersByProductId;
        }

        const orders = await this.repository.find();
        return orders;
    }
}

export { OrderRepository };