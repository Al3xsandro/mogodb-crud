interface ICreateStripeProduct {
    name: string;
    price: number;
    quantity: number;
    images?: string[];
};

export { ICreateStripeProduct };