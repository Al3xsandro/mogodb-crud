import { ICreateCustomerDTO } from "../../../dtos/ICreateCustomerDTO";
import { ICustomerRepository } from "../../../repositories/ICustomerRepository";

import { ICustomerDocument, customer } from "../schemas/Customer";

class CustomerRepository implements ICustomerRepository {
    private repository;
    
    constructor() {
        this.repository = customer;
    }

    async create({ email, stripeId, password, telefone }: ICreateCustomerDTO): Promise<void> {
        await this.repository.create({
            email,
            stripeId,
            password,
            telefone
        });
    }
    
    async find(): Promise<ICustomerDocument[]> {
        const customers = await this.repository.find();
        return customers;
    }

    async findByEmail(email: string): Promise<ICustomerDocument | null> {
        const customer = await this.repository.findOne({
            email
        }).exec();

        return customer;
    }
    
    async findById(id: string): Promise<ICustomerDocument | null> {
        const customer = await this.repository.findById(id);

        return customer;
    }
}

export { CustomerRepository };