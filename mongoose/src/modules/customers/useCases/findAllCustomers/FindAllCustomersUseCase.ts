import { inject, injectable } from "tsyringe";
import { ICustomerDocument } from "../../infra/mongoose/schemas/Customer";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";

@injectable()
class FindAllCustomersUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository
    ) {}

    async execute(): Promise<ICustomerDocument[]> {
        const customers = await this.customerRepository.find();

        return customers;
    }
};

export { FindAllCustomersUseCase };