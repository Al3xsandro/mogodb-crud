import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IProductDocument } from "../infra/mongoose/schemas/Product";

interface IProductRepository {
    create({ name, price, quantity }: ICreateProductDTO): Promise<IProductDocument>;
    find(): Promise<IProductDocument[]>;
    findById(product_id: string): Promise<IProductDocument | null>;
    findManyByIds(ids: string[]): Promise<IProductDocument[]>;
    updateQuantity(id: string, quantity: number): Promise<void>;
    findTotalProducts(): Promise<IProductDocument[]>;
    findByStripeProductId(stripe_product_id: string): Promise<IProductDocument | null>;
};

export { IProductRepository };