import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { ICustomerDocument } from "../infra/mongoose/schemas/Customer";

interface ICustomerRepository {
    create({ email, password, telefone }: ICreateCustomerDTO): Promise<void>;
    find(): Promise<ICustomerDocument[]>;
    findByEmail(email: string): Promise<ICustomerDocument | null>;
    findById(id: string): Promise<ICustomerDocument | null>;
};

export { ICustomerRepository };