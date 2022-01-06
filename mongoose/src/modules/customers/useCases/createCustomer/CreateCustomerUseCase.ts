import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";

@injectable()
class CreateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
    ) {}

    async execute({ 
        email,
        password,
        telefone
    }: ICreateCustomerDTO): Promise<void> {
        const customerAlreadyExists = await this.customerRepository.findByEmail(email);

        if (customerAlreadyExists) {
            throw new AppError('Customer already exists!');
        }

        await this.customerRepository.create({
            email,
            password,
            telefone
        });
    };
};

export { CreateCustomerUseCase };