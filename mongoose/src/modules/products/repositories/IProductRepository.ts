import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IProductDocument } from "../infra/mongoose/schemas/Product";

interface IProductRepository {
    create({ name, price, quantity }: ICreateProductDTO): Promise<IProductDocument>;
    find(): Promise<IProductDocument[]>;
    findById(product_id: string): Promise<IProductDocument | null>;
    updateQuantity(id: string, quantity: number): Promise<void>;
    findTotalProducts(): Promise<IProductDocument[]>;
};

export { IProductRepository };