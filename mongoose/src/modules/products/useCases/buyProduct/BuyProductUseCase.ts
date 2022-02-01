import { inject, injectable } from "tsyringe";
import { IStripeGateway } from "../../../../shared/container/providers/stripe/IStripe";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCheckoutDTO } from "../../dtos/ICreateCheckoutDTO";

@injectable() 
class BuyProductUseCase {
    constructor(
        @inject('StripeProvider')
        private stripeProvider: IStripeGateway,
    ) {}

    async execute({ customer_id, product_id, quantity }: ICreateCheckoutDTO): Promise<{ checkout_url: string }> {
        const createCheckout = await this.stripeProvider.checkout({
            customer_id,
            product_id,
            quantity
        });

        if(!createCheckout.url) {
            throw new AppError('An error was occurred on get checkout url');
        };

        return {
            checkout_url: createCheckout.url
        };
    };
}

export { BuyProductUseCase };