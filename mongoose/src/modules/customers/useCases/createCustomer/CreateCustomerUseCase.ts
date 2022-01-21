import { inject, injectable } from "tsyringe";
import { IStripeGateway } from "../../../../shared/container/providers/stripe/IStripe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustomerDTO } from "../../dtos/ICreateCustomerDTO";
import { ICustomerRepository } from "../../repositories/ICustomerRepository";

@injectable()
class CreateCustomerUseCase {
    constructor(
        @inject('CustomerRepository')
        private customerRepository: ICustomerRepository,
        @inject('StripeProvider')
        private stripeProvider: IStripeGateway,
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

        const stripeCustomer = await this.stripeProvider.createCustomer(email);

        await this.customerRepository.create({
            email,
            password,
            stripeId: stripeCustomer.id,
            telefone
        });
    };
};

export { CreateCustomerUseCase };