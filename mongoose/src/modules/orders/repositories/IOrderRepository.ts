import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { IOrderDocument } from "../infra/mongoose/schemas/Order";

interface IOrderRepository {
    create({ customerId, totalPrice, products }: ICreateOrderDTO ): Promise<IOrderDocument>;
};

export { IOrderRepository };