import { ICreateProductDTO } from "../../../dtos/ICreateProductDTO";
import { IProductRepository } from "../../../repositories/IProductRepository";
import { IProductDocument, product } from "../schemas/Product";

class ProductRepository implements IProductRepository {
    private repository;

    constructor() {
        this.repository = product;
    }

    async create({ name, price, quantity, stripe_product_id, stripe_price_id }: ICreateProductDTO): Promise<IProductDocument> {
        const product = await this.repository.create({
            name,
            price,
            quantity,
            stripe_product_id,
            stripe_price_id
        });

        return product;
    }
    
    async find(): Promise<IProductDocument[]> {
        const products = await this.repository.find();
        return products;
    }
    
    async findById(product_id: string): Promise<IProductDocument | null> {
        const product = await this.repository.findById(product_id);

        return product;
    }

    async findManyByIds(ids: string[]): Promise<IProductDocument[]> {
        const products = await this.repository.find({
            _id: {
                $in: ids
            }
        });

        return products;
    };

    async updateQuantity(id: string, quantity: number): Promise<void> {
        await this.repository.updateOne({
            _id: id
        }, {
            $set: {
                quantity
            }
        });
    }

    async findTotalProducts(): Promise<IProductDocument[]> {
        const products = await this.repository.aggregate<IProductDocument>([
            {
                $group: { _id: "$name", quantity: { $sum: "$quantity" }}
            }
        ]);

        return products;
    }
};

export { ProductRepository };