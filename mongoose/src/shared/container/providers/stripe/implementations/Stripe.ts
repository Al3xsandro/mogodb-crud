import Stripe from "stripe";
import { inject } from "tsyringe";
import { ICreateCheckoutDTO } from "../../../../../modules/products/dtos/ICreateCheckoutDTO";
import { IProductRepository } from "../../../../../modules/products/repositories/IProductRepository";
import { AppError } from "../../../../errors/AppError";
import { ICreateStripeProduct } from "../dtos/ICreateStripeProduct";

import { IStripeGateway } from "../IStripe";

class StripeGateway implements IStripeGateway {
    private stripe: Stripe;

    constructor(
        @inject("ProductRepository")
        private productRepository: IProductRepository,
    ) {
        const privateKey = process.env.STRIPE_SECRET_KEY || '';

        this.stripe = new Stripe(privateKey, {
            apiVersion: '2020-08-27'
        });
    }

    async createCustomer(email: string): Promise<Stripe.Customer> {
        const customer = await this.stripe.customers.create({
            email
        });

        return customer;
    };

    async createProduct({
        name,
        images,
        price,
        quantity
    }: ICreateStripeProduct): Promise<Stripe.Price> {
        const product = await this.stripe.products.create({
            name,
            images,
            unit_label: String(quantity),
        });

        const productPrice = await this.stripe.prices.create({
            unit_amount: Number(price * 100),
            currency: 'BRL',
            product: product.id,
        });

        return productPrice;
    };

    async checkout({ customer_id, product_id, quantity }: ICreateCheckoutDTO): Promise<Stripe.Checkout.Session> {
        const product = await this.productRepository.findById(product_id);

        if(!product?.stripe_price_id) {
            throw new AppError('Product id does not exists');
        };

        const product_price = await this.stripe.prices.retrieve(product.stripe_price_id);

        const checkout = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                { price: product_price.id, quantity }
            ],
            customer: customer_id,
            cancel_url: `${process.env.PRODUCTION_URL}/payment/cancel`,
            success_url: `${process.env.PRODUCTION_URL}/payment/success`,
        });

        return checkout;
    };

    async webhook(): Promise<void> {
        
    };
};

export { StripeGateway };