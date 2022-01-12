import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IFindOrdersDTO } from "../dtos/IFindOrdersDTO";
import { IOrderDocument } from "../infra/mongoose/schemas/Order";

interface IOrderRepository {
    create({ customerId, totalPrice, products }: ICreateOrderDTO ): Promise<IOrderDocument>;
    find({
        below_price,
        up_price,
        date,
        page,
        product_id
    }: IFindOrdersDTO): Promise<IOrderDocument[]>;
};

export { IOrderRepository };