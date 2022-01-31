import Stripe from "stripe";
import { ICreateCheckoutDTO } from "../../../../modules/products/dtos/ICreateCheckoutDTO";
import { ICreateStripeProduct } from "./dtos/ICreateStripeProduct";

interface IStripeGateway {
    createCustomer(email: string): Promise<Stripe.Customer>;
    createProduct({ 
        name,
        price,
        images,
    }: ICreateStripeProduct): Promise<Stripe.Price>;
    checkout({
        customer_id,
        price_id,
        quantity
    }: ICreateCheckoutDTO): Promise<Stripe.Checkout.Session>;
    webhook(): Promise<void>;
};

export { IStripeGateway };